# Deploy a Static Site (React) to AWS S3 and CloudFront with GitHub Actions

This step-by-step guide sets up CI/CD that builds a React project and deploys it to a **private** S3 bucket served through CloudFront. GitHub Actions authenticates to AWS with **OpenID Connect (OIDC)**, so no long-lived AWS access keys are stored in GitHub.

> Updated for the 2026 batch: the bucket stays private behind CloudFront Origin Access Control (OAC), IAM uses a least-privilege role instead of `FullAccess` policies, and the workflow uses current action versions and Node.js LTS.

### Prerequisites

1. **AWS Account** with a billing alarm set (see the Cloud Fundamentals module).
2. **GitHub Repository** containing your React project.
3. **AWS CLI** installed locally (optional, useful for testing).

### Step 1: Create a Private S3 Bucket

1. Open the AWS Management Console and go to **S3**.
2. Click **Create bucket**.
   - Enter a globally unique name (e.g., `my-react-app-bucket-<your-name>`).
   - Choose a region (e.g., `us-east-1`).
   - Keep **Block all public access** turned **on**. CloudFront will read the files; the public never accesses the bucket directly.
3. Click **Create bucket**.

### Step 2: Create a CloudFront Distribution with Origin Access Control

1. Go to **CloudFront** and click **Create distribution**.
2. **Origin domain**: choose your S3 bucket from the list (use the bucket endpoint, not the "website" endpoint).
3. **Origin access**: select **Origin access control settings (recommended)** and click **Create new OAC** (keep the defaults).
4. **Viewer protocol policy**: choose **Redirect HTTP to HTTPS**.
5. **Default root object**: enter `index.html`.
6. Create the distribution. CloudFront shows a banner with a **bucket policy** to copy: click **Copy policy**, open your bucket's **Permissions** tab, and paste it under **Bucket policy**. It looks like this:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "AllowCloudFrontServicePrincipalReadOnly",
         "Effect": "Allow",
         "Principal": { "Service": "cloudfront.amazonaws.com" },
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::my-react-app-bucket-<your-name>/*",
         "Condition": {
           "StringEquals": {
             "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
           }
         }
       }
     ]
   }
   ```
7. **Single-page apps (React Router)**: in the distribution's **Error pages** tab, add custom error responses for `403` and `404` that return `/index.html` with response code `200`, so deep links work.
8. Note down the **Distribution ID** and the **distribution domain name** (e.g., `d1234abcd.cloudfront.net`).

### Step 3: Let GitHub Actions Assume an AWS Role (OIDC)

1. **Add GitHub as an identity provider** (once per AWS account):
   - Go to **IAM > Identity providers > Add provider**.
   - Provider type: **OpenID Connect**.
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
2. **Create a role** for the workflow:
   - Go to **IAM > Roles > Create role > Web identity**.
   - Identity provider: `token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.
   - GitHub organization: your username; repository: your repo name; branch: `main`. This limits the role to your repo's main branch.
   - Name it `github-actions-deploy-<repo>`.
3. **Attach a least-privilege inline policy** to the role (replace the placeholders):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "SyncSiteFiles",
         "Effect": "Allow",
         "Action": ["s3:ListBucket"],
         "Resource": "arn:aws:s3:::my-react-app-bucket-<your-name>"
       },
       {
         "Sid": "WriteSiteObjects",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
         "Resource": "arn:aws:s3:::my-react-app-bucket-<your-name>/*"
       },
       {
         "Sid": "InvalidateCache",
         "Effect": "Allow",
         "Action": ["cloudfront:CreateInvalidation"],
         "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
       }
     ]
   }
   ```
4. Copy the role's **ARN** (e.g., `arn:aws:iam::<ACCOUNT_ID>:role/github-actions-deploy-<repo>`).

> Why not an IAM user with access keys? Long-lived keys stored in GitHub can leak and never expire. OIDC gives the workflow short-lived credentials that only work for this repo and branch. `AmazonS3FullAccess` and `CloudFrontFullAccess` would let a leaked workflow delete every bucket and distribution in the account.

### Step 4: Add GitHub Variables

Go to your repository's **Settings > Secrets and variables > Actions > Variables** and add:

| Name | Value |
| --- | --- |
| `AWS_ROLE_ARN` | The role ARN from Step 3 |
| `AWS_REGION` | Your bucket region, e.g. `us-east-1` |
| `AWS_S3_BUCKET` | Your bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your distribution ID |

None of these are secret, so they are stored as variables. No AWS keys are needed.

### Step 5: Create the GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy React App to AWS S3 and CloudFront

on:
  push:
    branches:
      - main  # Change this if your default branch is different
  workflow_dispatch:  # Allows a manual run from the Actions tab

permissions:
  id-token: write   # Required for OIDC
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'   # Current Node.js LTS; match your project
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test --if-present

      - name: Build project
        run: npm run build   # Create React App outputs to build/, Vite to dist/

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_ARN }}
          aws-region: ${{ vars.AWS_REGION }}

      - name: Deploy to S3
        run: aws s3 sync build s3://${{ vars.AWS_S3_BUCKET }} --delete   # use dist for Vite

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

> Action versions: these were current majors at the time of writing. Check each action's GitHub page for a newer major version before the session, and update all of them together.

### Step 6: Test the Workflow

1. Commit and push to `main`. The workflow starts automatically (or run it manually from the **Actions** tab).
2. Open the **Actions** tab and confirm every step is green.
3. Visit `https://<distribution-domain>.cloudfront.net` to see your app.
4. Check that the bucket itself is **not** public: opening an S3 object URL directly should return `AccessDenied`.

### Troubleshooting

| Error | Likely cause |
| --- | --- |
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | Role trust policy doesn't match your repo/branch, or `permissions: id-token: write` is missing |
| `AccessDenied` from CloudFront | Bucket policy from Step 2 not added, or OAC not attached to the origin |
| Blank page on refresh of a sub-route | Custom error responses (Step 2.7) not configured |
| `npm ci` fails | `package-lock.json` missing; run `npm install` locally and commit the lock file |

### Clean up (stay in the free tier)

When you finish the lab, disable and delete the CloudFront distribution, empty and delete the bucket, and delete the IAM role.

### Conclusion

You now have a pipeline where every push to `main` is tested, built and deployed automatically, using short-lived credentials and a private bucket. This is the same pattern companies use in production.
