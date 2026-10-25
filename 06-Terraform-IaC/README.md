---
title: "Module 06: Terraform and Infrastructure as Code (Week 9)"
---

# Module 06: Terraform and Infrastructure as Code (Week 9)

*Status: coming soon. Topics and labs below are the plan.*

## Topics

Why infrastructure as code, Terraform providers, resources, variables and outputs, state and remote state (S3 backend with locking), modules, the plan/apply workflow, environments (dev/prod), drift, and a brief comparison with CloudFormation, Bicep and Pulumi.

## Labs

1. Rebuild the Module 02 VPC and EC2 setup in Terraform.
2. Move state to a remote S3 backend with locking.
3. Write a reusable module.
4. Run `terraform plan` automatically on every pull request in GitHub Actions.

## Deliverable

An `infra/` folder with Terraform code and a README showing how to create and destroy everything.

> Habit: end every lab with `terraform destroy`.
