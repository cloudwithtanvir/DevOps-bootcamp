---
title: "Cloud Computing Fundamentals"
---

# Cloud Computing Fundamentals

## Learning objectives

Explain cloud computing, service models, deployment models, global infrastructure, scalability, shared responsibility and cost basics.

## 1. What is cloud computing?

Cloud computing is the on-demand delivery of computing resources—servers, storage, databases, networking and software—over a network. Instead of purchasing and operating every physical server, an organization consumes services from a cloud provider and pays according to the service's pricing model.

Cloud does not automatically mean cheaper, more secure or highly available. Those outcomes depend on architecture, configuration, operations and cost management.

### Traditional data center vs cloud

| Traditional/on-premises | Cloud |
| --- | --- |
| Organization purchases hardware | Provider owns and operates underlying infrastructure |
| Procurement can take time | Resources can often be provisioned quickly |
| Organization maintains facilities and hardware | Provider maintains physical facilities and hardware |
| Capacity may be fixed | Capacity can be changed, subject to limits and design |
| Upfront capital expenditure may be high | Consumption-based and committed pricing options |

## 2. Cloud service models

### IaaS — Infrastructure as a Service

The provider offers fundamental infrastructure such as virtual machines, disks and networks. The customer manages the operating system, runtime, applications, data and much of the configuration.

Examples: Amazon EC2, Azure Virtual Machines, Google Compute Engine.

Use when you need control over the operating system or software stack.

### PaaS — Platform as a Service

The provider manages more of the platform, such as operating-system maintenance, runtime or application hosting. The customer focuses more on application code and data.

Examples: Azure App Service, Google App Engine, AWS Elastic Beanstalk.

Use when you want to deploy applications without managing every server detail.

### SaaS — Software as a Service

The provider delivers a complete application. Customers mainly manage application settings, users, access and their data.

Examples: Google Workspace, Microsoft 365, Salesforce.

Use when you need a ready-to-use application rather than infrastructure to build it.

| Model | Provider generally manages | Customer generally manages |
| --- | --- | --- |
| IaaS | Physical data center, hardware, virtualization | Guest OS, patches, runtime, application, data and access configuration |
| PaaS | Infrastructure and much of the platform | Application code, data and configuration |
| SaaS | Application and underlying stack | Users, access settings, usage and data governance |

The exact responsibility boundary varies by service and provider. Always consult the service documentation.

## 3. Cloud deployment models

- **Public cloud:** services are delivered over provider-operated infrastructure and shared across customers with logical isolation.
- **Private cloud:** cloud infrastructure is dedicated to one organization; it may be operated internally or by a third party.
- **Hybrid cloud:** integrates private/on-premises environments with public cloud services.
- **Multi-cloud:** uses services from more than one public cloud provider. This is an architecture choice, not automatically a hybrid cloud.

## 4. Global cloud infrastructure

### Region

A geographic area where a provider operates cloud infrastructure. Choose a Region based on latency, service availability, data residency, resilience requirements and cost.

### Availability Zone (AZ)

An isolated location or group of data centers within a Region, designed to reduce the impact of failures in another AZ. Provider terminology and implementation differ.

### Edge location / point of presence

A location used to bring services such as content delivery, DNS or edge processing closer to users. It is not the same as a general-purpose Region or AZ.

### High availability

Designing a service to remain usable despite expected component failures. Deploying application instances across multiple AZs can reduce dependence on one location. Multi-AZ design does not remove the need for backups, monitoring or recovery testing.

## 5. Scalability and elasticity

- **Vertical scaling (scale up/down):** increase or decrease the capacity of one machine, such as CPU or memory.
- **Horizontal scaling (scale out/in):** add or remove instances.
- **Elasticity:** capacity adjusts in response to demand, automatically or manually.
- **Fault tolerance:** the system continues operating when some components fail.

Example: an online shop may add application instances during a sale and remove them when traffic drops. The design should also consider database capacity, session handling, queues and downstream limits.

## 6. Shared Responsibility Model

Cloud security is shared between the provider and customer.

The provider is responsible for security **of** the cloud, such as physical facilities, hardware and underlying managed infrastructure.

The customer is responsible for security **in** the cloud, such as identity permissions, data classification, network rules and application configuration. The exact split depends on whether the service is IaaS, PaaS or SaaS.

For an EC2 virtual machine, the provider manages the physical host and virtualization layer; the customer manages the guest operating system, patches, installed software, credentials, data and security-group configuration.

### Basic security checklist

- Enable MFA for privileged and root accounts.
- Use individual identities; do not share accounts.
- Grant only the permissions needed (least privilege).
- Protect access keys and private SSH keys; never commit them to Git.
- Encrypt sensitive data in transit and at rest where appropriate.
- Restrict inbound network access.
- Patch and monitor systems.
- Keep backups and test recovery.
- Review audit logs and access regularly.

## 7. Cloud cost fundamentals

Cloud costs may include compute time, storage capacity, requests, data transfer, public IPv4 addresses, load balancers, snapshots and managed services.

Good habits:

1. Check the pricing page and estimate before creating a resource.
2. Choose a small, suitable instance type for learning.
3. Set budgets and billing alerts where available.
4. Tag resources with owner, project and environment.
5. Stop or terminate resources when no longer needed.
6. Delete unattached disks, snapshots, load balancers and other billable resources when appropriate.
7. Review the billing console after the lab.

**Important:** stopping a VM does not necessarily stop all charges. Attached storage, snapshots, public IP resources and other services may continue to incur costs. A budget alert does not cap spending.

## 8. Provider service mapping

| Capability | AWS | Microsoft Azure | Google Cloud |
| --- | --- | --- | --- |
| Virtual machines | EC2 | Virtual Machines | Compute Engine |
| Object storage | S3 | Blob Storage | Cloud Storage |
| Virtual network | VPC | Virtual Network (VNet) | VPC network |
| Identity and access | IAM | Microsoft Entra ID and Azure RBAC | Cloud IAM |
| Managed relational database | RDS | Azure SQL Database / Azure Database services | Cloud SQL |
| Serverless functions | Lambda | Azure Functions | Cloud Run functions |

These services are comparable by capability, not identical in features, pricing or operational model.

## 9. Knowledge check

1. What is one key difference between IaaS and SaaS?
2. Give an example of a PaaS service.
3. What is the difference between a Region and an Availability Zone?
4. Why might an application use more than one AZ?
5. Who patches the guest OS on an EC2 instance?
6. Explain vertical vs horizontal scaling.
7. Why is a billing alert not a spending limit?
8. Name the Azure and Google Cloud equivalents of AWS EC2 and S3.

## Further reading

- [AWS: What is cloud computing?](https://aws.amazon.com/what-is-cloud-computing/)
- [AWS: Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [AWS: Global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [Microsoft Azure: What is cloud computing?](https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-cloud-computing/)
- [Google Cloud: Cloud overview](https://cloud.google.com/docs/overview)
