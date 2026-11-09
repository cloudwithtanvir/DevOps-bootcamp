---
title: "Student Guide"
description: "A practical guide to getting started, following the weekly rhythm, completing labs, and submitting your work."
---

# Student Guide

Welcome to the DevOps, Cloud & AI Bootcamp. This page is your starting point for navigating the repository and getting the most out of the hands-on learning path.

## 1. Start here

Follow these steps before beginning the technical modules:

1. Read the [bootcamp overview](README.md) and the [12-week roadmap](ROADMAP.md).
2. Complete [Week 0 onboarding](00-Introduction-to-DevOps/).
3. Create a public GitHub repository named `devops-journey` with a README introducing yourself and your learning goal.
4. Install VS Code, Git, a Linux terminal (Ubuntu or WSL on Windows), and Docker Desktop or Docker Engine.
5. If you create an AWS account, set a billing alarm before launching resources.
6. Join the group channel, read its rules, and share your one-sentence goal.

## 2. Follow the learning path

The program is organized as a 12-week path, beginning with Week 0 onboarding. Each module builds on the sample application and the skills from earlier weeks.

| Weeks | Module | What to focus on |
| --- | --- | --- |
| 0 | [Introduction and onboarding](00-Introduction-to-DevOps/) | Tools, GitHub workflow, DevOps foundations |
| 1–2 | [Linux and Git](01-Linux-Foundations/) | Linux, networking, Git, Bash and Python basics |
| 3–4 | [Cloud fundamentals](02-Cloud-Fundamentals/) | VMs, IAM, AWS services, cost control and cloud comparisons |
| 5 | [Docker](03-Docker/) | Images, containers, Compose and registries |
| 6–7 | [Kubernetes](04-Kubernetes/) | Workloads, services, ingress, probes and Helm |
| 8 | [CI/CD](05-CI-CD/) | Build and deployment automation, image scanning and GitOps |
| 9 | [Terraform and IaC](06-Terraform-IaC/) | Infrastructure as code, state, modules and safe changes |
| 10 | [SRE and monitoring](07-SRE-and-Monitoring/) | SLIs, SLOs, metrics, dashboards, alerting and incidents |
| 11 | [AI in Cloud and DevOps](08-AI-in-Cloud-and-DevOps/) | AI assistants, cloud AI services and MLOps foundations |
| 12 | [Capstone](09-Capstone/) | An end-to-end system and a 15-minute demonstration |

Career guidance runs alongside the technical modules. Check the [career guidance module](10-Career-Guidance/) for its materials.

## 3. Use the weekly rhythm

The roadmap describes this learning rhythm:

- **Session 1 (weekday evening):** concepts, a live demo and lab kickoff.
- **Session 2 (weekend):** lab review, troubleshooting and a career slot every other week.
- **Async:** share short “Today I learned / blocked on” updates in the group channel.
- **Friday:** one participant gives a five-minute “what I built” demo.

Each live session follows a 90-minute format: check-in, concept, live demo, guided hands-on work, then Q&A and homework.

## 4. Complete and submit your work

Every task is submitted as a pull request. The intended workflow is:

1. Fork this repository and clone your fork.
2. Add the original repository as the `upstream` remote.
3. Pull the latest material from `upstream master`.
4. Create a branch for the task.
5. Put your solution under the path specified by the task, usually `solutions/<module>/<your-github-username>`.
6. Commit with a clear message, push to your fork, and open a pull request.

Read the complete [How to Submit Your Solution](HOW-TO-SUBMIT.md) guide before your first submission.

## 5. Keep cloud costs and credentials safe

- Prefer local labs and free tiers where possible.
- Set a billing alarm before using paid cloud resources.
- Destroy cloud resources after each exercise.
- Never commit passwords, access keys, tokens or `.env` files.
- If a secret is committed accidentally, tell your mentor immediately and rotate it.

## 6. Ask for help effectively

When you get stuck, share:

- The module and task you are working on.
- What you expected to happen.
- What actually happened.
- The exact command and relevant error output (remove secrets first).
- What you have already tried.

Prefer searchable command output over screenshots when asking for technical help.

## Useful links

- [Repository README](README.md)
- [12-week roadmap](ROADMAP.md)
- [Week 0 onboarding](00-Introduction-to-DevOps/)
- [How to submit your work](HOW-TO-SUBMIT.md)
- [Browse all modules](#)
