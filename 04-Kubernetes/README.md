---
title: "Module 04: Kubernetes (Weeks 6–7)"
---

# Module 04: Kubernetes (Weeks 6–7)

*Status: coming soon. Topics and labs below are the plan.*

## Topics

Kubernetes architecture (control plane, nodes, kubelet), Pods, Deployments, Services, Ingress, ConfigMaps and Secrets, resource requests and limits, liveness and readiness probes, namespaces and RBAC basics, Helm, managed Kubernetes (EKS, AKS, GKE).

## Labs

1. Run a local cluster with kind or minikube (free).
2. Deploy the sample app with Kubernetes manifests.
3. Add an Ingress and health probes.
4. Package the app as a Helm chart.
5. Scale it and watch a rolling update.
6. Break it on purpose (bad image tag, failing probe) and debug with `kubectl describe` and `kubectl logs`.

## Deliverable

Manifests and a Helm chart in your repo, plus a "debugging diary" describing three issues you fixed.
