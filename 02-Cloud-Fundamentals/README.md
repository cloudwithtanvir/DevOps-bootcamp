# Module 02: Cloud Fundamentals: AWS, Azure and GCP (Weeks 3–4)

Go deep on one cloud (AWS) and broad on the others. Concepts transfer; service names change.

## Materials

- [Virtual Machines](01-virtual-machines.md): servers, hypervisors and VMs, the foundation for cloud compute.
- *Coming soon:* AWS core services lab guide, Azure and GCP comparison notes.

## Topics

Shared responsibility model, regions and availability zones, IAM (users, roles, policies, least privilege), EC2, S3, VPC (subnets, security groups, route tables), RDS, Lambda, cost management. Then the Azure equivalents (VMs, Blob Storage, VNet, Entra ID) and GCP equivalents (Compute Engine, Cloud Storage, VPC, IAM).

## Labs

1. Build a VPC with public and private subnets.
2. Launch an EC2 instance behind an Application Load Balancer.
3. Host a static site on S3 (see also [the CI/CD S3 + CloudFront guide](../05-CI-CD/02-deploy-static-site-to-s3-cloudfront.md)).
4. Create a Lambda function triggered by an S3 upload.
5. Repeat one VM lab on Azure or GCP and compare the experience.

## Deliverable

An architecture diagram and README of your AWS setup, plus a one-page AWS vs Azure vs GCP service map.

> Cost rule: billing alarm on, and destroy everything at the end of each lab.
