Here's a complete step-by-step guide on how to set up CI/CD for deploying a React project to AWS S3 and CloudFront using GitHub Actions. This guide will cover creating the necessary AWS resources and configuring the GitHub Actions workflow.

### Prerequisites

1. **AWS Account**: Make sure you have an AWS account.
2. **GitHub Repository**: Ensure your React project is hosted in a GitHub repository.
3. **AWS CLI**: Install the AWS CLI on your local machine for initial setup.

### Step 1: Create S3 Bucket

1. **Login to AWS Management Console**.
2. **Navigate to S3 Service**:
   - Open the AWS Management Console.
   - Search for "S3" and select it.

3. **Create a Bucket**:
   - Click on "Create bucket".
   - Enter a unique bucket name (e.g., `my-react-app-bucket`).
   - Choose a region.
   - Uncheck "Block all public access".
   - Click "Create bucket".

4. **Bucket Policy**:
   - Go to the "Permissions" tab of your bucket.
   - Add the following bucket policy to allow public read access:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::my-react-app-bucket/*"
         }
       ]
     }
     ```
   - Replace `my-react-app-bucket` with your bucket name.

### Step 2: Create CloudFront Distribution

1. **Navigate to CloudFront Service**:
   - In the AWS Management Console, search for "CloudFront" and select it.

2. **Create a Distribution**:
   - Click on "Create Distribution".
   - Under "Origin Domain", enter your S3 bucket endpoint (e.g., `my-react-app-bucket.s3.amazonaws.com`).
   - Leave other settings as default or adjust as needed.
   - Click "Create Distribution".

3. **Get Distribution ID**:
   - Once created, note down the CloudFront Distribution ID from the distribution list.

### Step 3: Configure AWS IAM User for GitHub Actions

1. **Navigate to IAM Service**:
   - In the AWS Management Console, search for "IAM" and select it.

2. **Create a User**:
   - Click on "Users" and then "Add user".
   - Enter a username (e.g., `github-actions-user`).
   - Select "Programmatic access".
   - Click "Next: Permissions".

3. **Attach Policies**:
   - Attach the following policies:
     - `AmazonS3FullAccess`
     - `CloudFrontFullAccess`
   - Click "Next: Tags", then "Next: Review", and finally "Create user".

4. **Save Credentials**:
   - Save the `Access Key ID` and `Secret Access Key`. You will need these for GitHub secrets.

### Step 4: Add GitHub Secrets

1. **Navigate to Your GitHub Repository**.
2. **Add Secrets**:
   - Go to "Settings" > "Secrets and variables" > "Actions".
   - Add the following secrets:
     - `AWS_ACCESS_KEY_ID`: Your IAM user Access Key ID.
     - `AWS_SECRET_ACCESS_KEY`: Your IAM user Secret Access Key.
     - `AWS_S3_BUCKET`: Your S3 bucket name.
     - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID.

### Step 5: Create GitHub Actions Workflow

1. **Create Workflow File**:
   - In your repository, create a `.github/workflows/deploy.yml` file.

2. **Add the Following Workflow Configuration**:

```yaml
name: Deploy React App to AWS S3 and CloudFront

on:
  push:
    branches:
      - main  # Change this to your main branch if different

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'  # Use the Node.js version required by your project

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build project
        run: npm run build

      - name: Deploy to S3
        run: |
          aws s3 sync build s3://${{ secrets.AWS_S3_BUCKET }} --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1  # Change this to your S3 bucket region

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1  # Change this to your CloudFront distribution region


```

### Step 6: Test the Workflow

1. **Push Changes**:
   - Commit and push the changes to your GitHub repository.
   - The workflow will trigger on push to the `main` branch.

2. **Verify Deployment**:
   - Check the GitHub Actions tab to ensure the workflow completes successfully.
   - Visit your CloudFront URL to see your deployed React application.

### Conclusion

By following these steps, you have set up a CI/CD pipeline that deploys your React application to AWS S3 and CloudFront using GitHub Actions. This ensures that every time you push changes to your main branch, your application is automatically built and deployed, providing a seamless and automated deployment process.
