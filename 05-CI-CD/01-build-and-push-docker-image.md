# Streamlining Development with CI/CD: Automating Docker Image Build and Push to Docker Hub

In modern software development, speed, efficiency, and reliability are paramount. Continuous Integration and Continuous Deployment (CI/CD) practices have emerged as essential methodologies to meet these demands. By automating the integration, testing, and deployment of code, CI/CD pipelines help developers catch bugs early, deploy faster, and ensure consistent quality. This article explores the benefits of CI/CD, introduces popular CI/CD platforms, explains GitHub Actions, and provides a step-by-step guide on using GitHub Actions to build and push Docker images to Docker Hub.

## What is CI/CD?

**Continuous Integration (CI)** is the practice of automatically integrating code changes from multiple contributors into a shared repository. CI involves automated building and testing to ensure that code changes do not introduce new bugs.

**Continuous Deployment (CD)** extends CI by automating the deployment of code changes to production environments. CD ensures that validated changes are automatically deployed to users, enabling rapid iteration and feedback.

### Benefits of CI/CD

1. **Faster Development Cycles**: Automating the build, test, and deployment process speeds up the development cycle, allowing for more frequent releases.
2. **Improved Code Quality**: Automated testing catches bugs early in the development process, reducing the likelihood of issues in production.
3. **Reduced Manual Errors**: Automation minimizes the risk of human error during the build and deployment process.
4. **Consistent Releases**: Automated pipelines ensure that every deployment follows the same steps, resulting in consistent and reliable releases.
5. **Enhanced Collaboration**: CI/CD facilitates collaboration among team members by providing real-time feedback on code changes and reducing integration conflicts.

## Popular CI/CD Platforms

Several CI/CD platforms are widely used in the industry, each offering unique features and integrations. Here are some of the most popular ones:

### 1. GitHub Actions
- **Integration**: Seamlessly integrates with GitHub repositories.
- **Customization**: Supports custom workflows using YAML configuration.
- **Marketplace**: Access to pre-built actions and workflows.
- **Example Use Case**: Automating tests and deployments for a web application.

### 2. Jenkins
- **Open Source**: Widely used open-source automation server.
- **Plugins**: Extensive plugin ecosystem for various integrations.
- **Pipeline as Code**: Define build pipelines using Jenkinsfile.
- **Example Use Case**: Complex build pipelines for large-scale enterprise applications.

### 3. GitLab CI/CD
- **Integration**: Native CI/CD solution within GitLab.
- **Pipeline as Code**: Define CI/CD pipelines using `.gitlab-ci.yml`.
- **Built-in Features**: Includes code review, issue tracking, and CI/CD in a single platform.
- **Example Use Case**: End-to-end DevOps lifecycle management.

### 4. CircleCI
- **Cloud and On-Premises**: Offers both cloud-hosted and on-premises solutions.
- **Customization**: Highly configurable build environments.
- **Performance**: Optimized for fast builds and parallelism.
- **Example Use Case**: Rapidly iterating on mobile application development.

### 5. Travis CI
- **Ease of Use**: Simple setup with `.travis.yml` configuration.
- **Integration**: Supports GitHub, Bitbucket, and more.
- **Free for Open Source**: Popular among open-source projects.
- **Example Use Case**: Automating tests and deployments for open-source libraries.

### 6. Azure Pipelines
- **Integration**: Part of Azure DevOps services.
- **Multi-Platform**: Supports Windows, Linux, and macOS.
- **Scalability**: Highly scalable for large enterprise projects.
- **Example Use Case**: CI/CD for applications deployed on Azure.

### 7. Bitbucket Pipelines
- **Integration**: Native CI/CD for Bitbucket repositories.
- **Ease of Use**: Simple YAML configuration.
- **Built-in Features**: Integrated with Bitbucket’s code review and issue tracking.
- **Example Use Case**: CI/CD for small to medium-sized teams using Bitbucket.

### 8. AWS CodePipeline
- **Integration**: Part of AWS suite of DevOps tools.
- **Automation**: Automates build, test, and deploy phases.
- **Scalability**: Seamlessly scales with AWS infrastructure.
- **Example Use Case**: Automating deployments for AWS-hosted applications.

## Introduction to GitHub Actions

GitHub Actions is a powerful CI/CD tool that integrates seamlessly with GitHub repositories. It allows you to automate workflows, including building and pushing Docker images.

### Key Features of GitHub Actions

1. **Integration**: Directly integrated with GitHub repositories, making it easy to trigger workflows based on GitHub events such as pushes and pull requests.
2. **Customization**: Supports custom workflows defined using YAML configuration files, enabling flexible and powerful CI/CD pipelines.
3. **Marketplace**: Provides access to a marketplace of pre-built actions and workflows, allowing you to easily incorporate common tasks and integrations into your pipelines.
4. **Scalability**: Capable of scaling with your projects, handling everything from small scripts to complex multi-step workflows.

## Automating Docker Image Build and Push with GitHub Actions

This section provides a step-by-step guide to creating a GitHub Actions workflow for building and pushing Docker images to a private Docker Hub repository using Docker Compose.

### Prerequisites

- A GitHub repository with a `Dockerfile` (for example, the app you dockerized in the Docker module).
- A Docker Hub account and a repository on Docker Hub (e.g., `your-username/my-app`).
- A Docker Hub **access token**: Docker Hub > Account settings > Personal access tokens > Generate (Read & Write). Never use your Docker Hub password in CI.

> Updated for the 2026 batch: the workflow now uses `docker/build-push-action` (the standard way to build and push in GitHub Actions) instead of installing the deprecated `docker-compose` v1 on the runner, and all actions are on current major versions.

### Step 1: (Optional) Compose File for Local Development

Docker Compose is great for running the app locally, but CI only needs the `Dockerfile`. If you use Compose locally, name the file `compose.yaml`. The top-level `version:` key is obsolete and can be removed:

```yaml
services:
  server:
    build:
      context: .
    ports:
      - "8000:8000"
```

Run it locally with `docker compose up --build` (note: `docker compose` with a space).

### Step 2: Configure Secrets

Add these to your repository under **Settings > Secrets and variables > Actions**:

1. **Variable** `DOCKERHUB_USERNAME`: your Docker Hub username (not secret, so a variable).
2. **Secret** `DOCKERHUB_TOKEN`: the access token from the prerequisites.

### Step 3: Create a GitHub Actions Workflow

Create `.github/workflows/docker-publish.yml`:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main
    tags:
      - 'v*'          # also publish version tags like v1.0.0
  pull_request:       # build (but don't push) on pull requests to catch errors early

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Generate image tags
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ vars.DOCKERHUB_USERNAME }}/my-app
          tags: |
            type=raw,value=latest,enable={{is_default_branch}}
            type=sha
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Replace `my-app` with your Docker Hub repository name.

> Action versions: these were current majors at the time of writing. Check each action's GitHub page for a newer major version before the session.

### Step 4: Push Changes and Trigger the Workflow

Push to `main`. The workflow will:

1. **Check out the code** with `actions/checkout`.
2. **Set up Docker Buildx**, the modern Docker builder with caching.
3. **Log in to Docker Hub** using the token (skipped on pull requests).
4. **Generate tags**: `latest` for the default branch, a short commit SHA for every build (so you can always trace an image back to its commit), and a version number for `v*` tags.
5. **Build and push** the image, reusing cached layers from previous runs to make builds faster.

Verify on Docker Hub that new tags appear, then pull and run the image anywhere:

```bash
docker run -p 8000:8000 your-username/my-app:latest
```

### Next Steps (covered later in this module)

- Add an image vulnerability scan with Trivy before pushing.
- Push to Amazon ECR instead of Docker Hub using OIDC (see the S3/CloudFront guide for the OIDC setup).
- Deploy the new image to Kubernetes automatically with Argo CD.

## Conclusion

CI/CD practices are essential for modern software development, providing faster development cycles, improved code quality, and reduced manual errors. By using GitHub Actions to automate the build and push of Docker images to Docker Hub, you can streamline your development workflow and ensure consistent, reliable deployments.

Implementing CI/CD with GitHub Actions not only enhances productivity but also fosters a culture of collaboration and continuous improvement. Embrace CI/CD to accelerate your development process and deliver high-quality software with confidence.