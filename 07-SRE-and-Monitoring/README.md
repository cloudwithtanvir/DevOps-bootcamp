---
title: "Module 07: SRE, Monitoring and Observability (Week 10)"
---

# Module 07: SRE, Monitoring and Observability (Week 10)

*Status: coming soon. The 2024 outline's detailed monitoring module is in [archive/batch-2024/original-outline.md](../archive/batch-2024/original-outline.md) (Module 11).*

## Topics

SRE principles, SLIs, SLOs and error budgets, the three pillars (metrics, logs, traces), Prometheus and Grafana, log aggregation (Loki or the ELK stack), distributed tracing (Jaeger), alerting and on-call, incident response and blameless postmortems, and the cloud-native tools (CloudWatch, Azure Monitor, Google Cloud Monitoring).

## Labs

1. Install Prometheus and Grafana on your cluster with Helm.
2. Build a dashboard for the sample app.
3. Define one SLO and an alert for it.
4. Run a simulated incident (kill pods, add latency) and write a postmortem.

## Deliverable

A dashboard screenshot, an alert rule and a one-page postmortem in your repo.
