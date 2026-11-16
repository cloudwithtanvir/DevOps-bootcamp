---
title: "Week 3 Assignment: Cloud Foundations and EC2"
---

# Week 3 Assignment: Cloud Foundations and EC2

**Estimated effort:** 90–120 minutes  
**Submission:** GitHub repository or pull request to your personal learning repository.

## Scenario

A small business is moving its first internal web application from a physical server to the cloud. The engineering team wants to understand cloud fundamentals and test a Linux virtual machine before designing a production architecture.

You are the junior cloud engineer assigned to prepare the learning environment and document your findings.

## Task 1 — Explain the concepts

Write short answers in your own words:

1. What is cloud computing, and what problem does it solve?
2. Explain IaaS, PaaS and SaaS with one example each.
3. Compare public, private and hybrid cloud.
4. Explain Region and Availability Zone.
5. What is the shared responsibility model?
6. Explain vertical scaling, horizontal scaling and elasticity.
7. Give two reasons why cloud resources can create unexpected costs.

## Task 2 — Draw a basic architecture

Create a simple diagram with:

- User/laptop.
- AWS Region.
- VPC.
- One subnet.
- EC2 Linux instance.
- Security group allowing SSH only from the administrator's IP.

Label traffic direction and identify which component provides compute and which controls network access. Use draw.io, Excalidraw, Mermaid or another diagram tool. Keep the diagram conceptual; do not publish real credentials or sensitive network information.

## Task 3 — Complete the EC2 lab

Follow [the AWS EC2 guided lab](02-aws-ec2-lab.md).

Record:

- AMI name and operating-system version.
- Instance type.
- Region and Availability Zone.
- Private IP (you may redact it in a public repository).
- How you connected.
- Output from whoami, uname -a, free -h and df -h.
- The SSH access restriction you configured.
- Confirmation that the instance was terminated and remaining resources checked.

If you do not have an approved AWS account or sandbox, use the instructor's live demo and submit a clearly labelled simulated walkthrough. Do not claim to have created resources you did not create.

## Task 4 — Compare cloud providers

Complete this table:

| Capability | AWS | Azure | Google Cloud |
| --- | --- | --- | --- |
| Virtual machine service | | | |
| Object storage | | | |
| Virtual network | | | |
| Identity and access service | | | |

Add two or three sentences explaining why service names alone do not make services identical.

## Task 5 — Reflection

1. What was the most confusing part of the lab?
2. What security decision did you make?
3. What could still generate a cost after an instance is terminated?
4. What would you improve before using this design for a real business application?

## Suggested submission structure

    week-3-cloud-foundations/
    ├── README.md
    ├── architecture/
    │   └── week3-cloud-architecture.png
    ├── evidence/
    │   ├── ec2-instance.png
    │   ├── ssh-terminal.png
    │   └── cleanup.png
    └── notes/
        └── provider-comparison.md

Use your own structure if you prefer. Ensure screenshots are safe to publish.

## Submission checklist

- [ ] All concept questions answered.
- [ ] Architecture diagram included.
- [ ] EC2 lab completed or simulated work clearly labelled.
- [ ] Evidence contains no secrets.
- [ ] AWS/Azure/GCP comparison completed.
- [ ] Cleanup confirmed.
- [ ] README explains how to review the submission.

## Assessment rubric (100 points)

| Area | Points |
| --- | ---: |
| Cloud concepts and service models | 20 |
| Region, AZ, scalability and responsibility | 15 |
| Architecture diagram and explanation | 15 |
| EC2 practical work and Linux inspection | 25 |
| Security and cleanup | 15 |
| Provider comparison and reflection | 10 |
| **Total** | **100** |

## Academic integrity and safety

Explain what you did and what you learned. Do not copy another learner's screenshots or claim a simulated lab was performed in AWS. Never commit private keys, access keys, passwords, tokens or other secrets. If you accidentally expose a credential, revoke or rotate it immediately and notify the instructor.
