---
title: "Module 09: Capstone Project (Week 12)"
---

# Module 09: Capstone Project (Week 12)

Ship one production-style system end to end and present it in a 15-minute demo. This is the strongest item on your resume and the project you will talk about in interviews.

## Brief

Deploy a containerized web application (the sample app or your own idea) to the cloud with fully automated infrastructure, delivery and monitoring.

## Required components

1. Application in Docker, with a multi-stage Dockerfile
2. Cloud infrastructure created entirely with Terraform, using remote state
3. Kubernetes deployment (a managed cluster briefly, or k3s on a free-tier VM), packaged with Helm
4. CI/CD pipeline that tests, builds, scans and deploys on every merge to `main`
5. Monitoring: a Grafana dashboard, one SLO and one working alert
6. One AI component or AI-assisted workflow, documented
7. README with an architecture diagram, setup steps, cost estimate and a teardown command

## Evaluation rubric (100 points)

| Area | Points | Full marks when |
| --- | --- | --- |
| Working deployment | 25 | Live demo works; the app recovers from a pod failure |
| Automation | 20 | No manual steps from `git push` to deployment |
| Infrastructure as Code | 15 | Everything in Terraform; can destroy and rebuild |
| Observability | 15 | Meaningful dashboard, SLO and a tested alert |
| Security and cost | 10 | No secrets in Git, least-privilege IAM, cost within free tier or a few dollars |
| Documentation and demo | 15 | Clear README and diagram; you can explain every design choice |

## Stretch goals

Blue-green or canary deployments, separate dev and prod environments, policy as code (OPA), or a multi-cloud variant.

## Submission

Add `solutions/09-capstone/<your-github-username>.md` with your repo link, live URL (if running) and a link to your demo recording.
