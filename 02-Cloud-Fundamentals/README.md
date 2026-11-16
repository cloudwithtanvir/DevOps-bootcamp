---
title: "Module 02: Cloud Fundamentals — AWS, Azure and GCP (Weeks 3–4)"
---

# Module 02: Cloud Fundamentals — AWS, Azure and GCP

**Week 3 focus:** cloud concepts, virtualization, Regions and Availability Zones, shared responsibility, cost safety, and launching a secure Linux virtual machine on AWS.

**Week 4 focus:** IAM in depth, VPC design, S3, RDS, Lambda, load balancing, cost controls, and provider comparison.

We go deep on AWS for hands-on practice and broad on Azure and Google Cloud. Concepts transfer; service names and implementation details differ.

## Learning outcomes

By the end of Week 3, learners should be able to:

1. Explain cloud computing and distinguish IaaS, PaaS and SaaS.
2. Compare public, private and hybrid cloud.
3. Explain Regions, Availability Zones, scalability and elasticity.
4. Describe the shared responsibility model and basic security practices.
5. Explain physical servers, virtualization, hypervisors and virtual machines.
6. Compare virtual machines and containers.
7. Launch, connect to, inspect and safely terminate a small AWS EC2 instance.
8. Identify common cloud costs and clean up lab resources.

## Materials

- [Cloud computing fundamentals](00-cloud-computing-fundamentals.md)
- [Virtual machines and virtualization](01-virtual-machines.md)
- [AWS EC2 guided lab](02-aws-ec2-lab.md)
- [Week 3 assignment](task-1-cloud-foundations.md)
- [Instructor guide](instructor-guide.md)

## Week 3 session plan

1. Why organizations use cloud computing.
2. Service and deployment models.
3. Regions, Availability Zones and resilience.
4. Shared responsibility, identity awareness and cost safety.
5. Virtualization and virtual machines.
6. AWS console tour and EC2 demonstration.
7. Guided lab, cleanup and Q&A.

## Week 3 practical deliverable

Submit a GitHub repository folder containing:

- Short explanations of cloud service and deployment models.
- A diagram showing a user, AWS Region, VPC, subnet and EC2 instance.
- EC2 configuration and connection evidence. Never include private keys, passwords, account IDs or secrets.
- Assignment answers and provider comparison.
- Confirmation that lab resources were terminated.

## Week 4 preview

- IAM users, roles, policies and least privilege.
- VPC, CIDR, public/private subnets, route tables and security groups.
- S3 object storage.
- RDS managed databases.
- Lambda and event-driven compute.
- Load balancers, high availability and cost management.
- AWS vs Azure vs Google Cloud mapping.

> Cost and security rule: enable MFA, never share credentials, use the smallest suitable resources, avoid exposing SSH to the entire internet, check pricing before creating resources, and terminate lab resources. A billing alert is a notification—not a hard spending limit.
