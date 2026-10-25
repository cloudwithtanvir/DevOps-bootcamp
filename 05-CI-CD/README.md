---
title: "Module 05: CI/CD and Automation (Week 8)"
---

# Module 05: CI/CD and Automation (Week 8)

## Materials

- [Guide 1: Build and push a Docker image to Docker Hub](01-build-and-push-docker-image.md)
- [Guide 2: Deploy a static site to AWS S3 and CloudFront (OIDC, no stored keys)](02-deploy-static-site-to-s3-cloudfront.md)
- *Coming soon:* Trivy image scanning, GitOps with Argo CD, Ansible basics.

## Topics

CI vs continuous delivery vs continuous deployment, pipeline stages (lint, test, build, scan, deploy), GitHub Actions in depth (with a quick look at GitLab CI and Jenkins), secrets and OIDC, GitOps with Argo CD, configuration management with Ansible.

## Labs

1. A GitHub Actions pipeline that tests, builds and pushes your sample app image on every push (Guide 1).
2. Add a Trivy scan that fails the build on critical vulnerabilities.
3. Deploy to your Kubernetes cluster with Argo CD syncing from Git.
4. Write one Ansible playbook that configures a server.

## Deliverable

A green pipeline badge on your repo's README, with Argo CD deploying from Git.
