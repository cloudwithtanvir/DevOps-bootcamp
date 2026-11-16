---
title: "Instructor Guide: Week 3 Cloud Fundamentals"
---

# Instructor Guide: Week 3 Cloud Fundamentals

**Audience:** beginner DevOps / Cloud learners  
**Duration:** 90 minutes  
**Format:** concept → explanation → demonstration → guided practice → assessment  
**Primary platform:** AWS  
**Outcome:** learners understand cloud foundations and can explain the lifecycle and safe use of a basic cloud VM.

## Preparation checklist

- [ ] Confirm learners can access the course repository.
- [ ] Prepare a cloud architecture diagram.
- [ ] Prepare AWS console access or an approved training sandbox.
- [ ] Confirm the selected Region supports the demonstration AMI and instance type.
- [ ] Check current pricing and account restrictions.
- [ ] Enable MFA on the demonstration account.
- [ ] Prepare a disposable EC2 instance plan and cleanup checklist.
- [ ] Never display credentials, private keys, billing details or sensitive account information.

If learners do not have individual AWS accounts, use a screen-shared instructor demonstration. Do not ask learners to share payment details or credentials.

## 90-minute agenda

| Time | Topic | Teaching approach |
| --- | --- | --- |
| 0–10 min | Welcome and Linux homework review | Share one command and one challenge |
| 10–25 min | What is cloud computing? | Traditional data center vs cloud; IaaS/PaaS/SaaS |
| 25–35 min | Deployment models and global infrastructure | Public/private/hybrid; Region and AZ diagram |
| 35–45 min | Shared responsibility and cost safety | Discuss EC2 customer/provider responsibilities |
| 45–55 min | Virtualization and VMs | Hypervisor types; VM vs container |
| 55–70 min | AWS EC2 console demonstration | Select AMI, type, key, network and security group |
| 70–82 min | Guided inspection and troubleshooting | Linux commands and instance metadata |
| 82–90 min | Knowledge check and assignment | Recap, questions and cleanup reminder |

## Teaching notes

### Start with a relatable example

Ask: "If an online store receives ten times more traffic during a sale, what happens if it owns only one physical server?"

Guide learners toward capacity planning, provisioning delays, scaling, availability and cost.

### Explain service models using responsibility

Avoid teaching IaaS/PaaS/SaaS as only definitions. Ask what the customer still needs to manage in each model. Emphasize that exact responsibility boundaries vary by service.

### Teach Regions and AZs visually

Draw one Region containing multiple isolated AZs. Explain that placing resources in multiple AZs can improve resilience, but does not automatically make an application highly available. The application, data layer, routing and recovery process must also be designed.

### Shared responsibility example: EC2

Provider: physical facilities, hardware and underlying virtualization infrastructure.

Customer: guest OS updates, installed software, identity and access configuration, data, security group rules and application security.

### EC2 demo sequence

1. Confirm the account and Region.
2. Review pricing and resource size.
3. Select a current Amazon Linux AMI.
4. Choose a small suitable instance type.
5. Create a key pair and explain private-key handling.
6. Configure SSH inbound access from My IP only.
7. Launch and wait for status checks.
8. Connect using Instance Connect or SSH.
9. Run whoami, uname -a, free -h and df -h.
10. Identify the instance's VPC, subnet and security group.
11. Terminate the instance and inspect remaining resources.

Never use SSH from 0.0.0.0/0 as a shortcut in the demonstration.

## Questions to ask learners

- What is the difference between a server and a VM?
- What does a hypervisor do?
- What is the difference between a Region and an AZ?
- Which responsibilities remain with a customer using EC2?
- Why is a public IP not the same as a secure connection?
- Why can a stopped VM still cost money?
- When might a container be a better choice than a VM?

## Quick assessment

Ask learners to answer without looking at the notes:

1. Name the three main cloud service models.
2. Give one example of horizontal scaling.
3. What is the purpose of a security group?
4. Who patches the guest OS on an EC2 instance?
5. What must you check after terminating a lab instance?

## Common misconceptions to correct

- "Cloud is always cheaper." Cost depends on usage, architecture and operations.
- "The provider secures everything." Customers retain responsibilities, especially around identity, data and configuration.
- "A Region and an AZ are the same." An AZ is a distinct location within a Region.
- "Containers are just small VMs." They use a different isolation and packaging model.
- "Stopping an instance means no more charges." Storage and other resources may continue to incur charges.
- "A billing alarm prevents overspending." Alerts notify; they do not automatically cap costs.

## Homework

Assign [Week 3 Cloud Foundations and EC2](task-1-cloud-foundations.md). Ask learners to submit their own diagram, concept answers, lab evidence and reflection.

## Instructor follow-up

At the start of Week 4:

- Review the assignment and common mistakes.
- Revisit least privilege and network exposure.
- Introduce IAM and VPC in more depth.
- Continue with S3, RDS and Lambda.
- Use the same sample application and architecture as the course progresses.
