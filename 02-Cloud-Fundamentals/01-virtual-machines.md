---
title: "Virtual Machines and Virtualization"
---

# Virtual Machines and Virtualization

## Learning objectives

- Explain what a server, virtual machine and hypervisor are.
- Distinguish Type 1 and Type 2 hypervisors.
- Describe how CPU, memory, storage and networking are presented to a VM.
- Explain common VM use cases and operational considerations.
- Compare virtual machines with containers.

## 1. What is a server?

A server is a physical or virtual system that provides resources, data or services to clients over a network. Examples include web servers, application servers, database servers and file servers. A server is defined by the role it performs—not simply by its physical size.

## 2. What is virtualization?

Virtualization abstracts physical computing resources so that multiple isolated virtual environments can share one physical host. A physical host may provide CPU, memory, storage and network capacity to multiple virtual machines. Each VM receives virtual hardware and can run its own guest operating system.

## 3. What is a virtual machine?

A virtual machine (VM) is a software-defined computer with virtual CPU, memory, storage and network interfaces. It runs a guest operating system and applications as though it were a physical computer.

- **vCPU:** virtual processor capacity scheduled onto physical CPU resources.
- **Memory:** RAM allocated or made available to the VM.
- **Virtual disk:** storage presented to the guest operating system.
- **Virtual NIC:** network interface connected to a virtual network.
- **Guest OS:** operating system installed inside the VM.

A VM is isolated from other VMs, but it is not a perfect security boundary. Hypervisor vulnerabilities, misconfiguration and shared infrastructure risks still matter.

## 4. What is a hypervisor?

A hypervisor, also called a Virtual Machine Monitor (VMM), creates and manages VMs and allocates access to the host's resources.

### Type 1 — bare-metal

Runs directly on physical server hardware. Examples include VMware ESXi, Microsoft Hyper-V (commonly deployed as a bare-metal hypervisor) and Xen-based platforms.

### Type 2 — hosted

Runs as an application on a conventional host operating system. Examples include Oracle VirtualBox, VMware Workstation and Parallels Desktop.

| Type 1 | Type 2 |
| --- | --- |
| Runs on host hardware | Runs on a host operating system |
| Common in data centers and server virtualization | Common on developer and desktop machines |
| Directly manages hardware resources | Uses resources through the host OS |
| Example: ESXi | Example: VirtualBox |

## 5. Physical machine vs virtual machine

| Area | Physical machine | Virtual machine |
| --- | --- | --- |
| Hardware | Dedicated physical computer | Virtual hardware backed by a host |
| Operating system | Installed on physical hardware | Guest OS runs in the VM |
| Provisioning | May require hardware procurement | Often created from an image or template |
| Scaling | Hardware upgrade or new server | Adjust VM size or add instances, subject to capacity |
| Isolation | Physical separation is possible | Logical isolation through virtualization |
| Cost | Hardware, facilities and maintenance | Compute, storage, licensing and platform costs |

## 6. VM lifecycle

1. Select an image or operating-system installation source.
2. Choose CPU, memory, storage and network settings.
3. Create the VM.
4. Start it and connect through a console or remote protocol.
5. Install and configure software; patch and monitor it.
6. Stop, restart, resize or snapshot it as needed.
7. Back up important data.
8. Terminate/delete it when it is no longer required.

A snapshot is useful for certain recovery and testing scenarios, but it is not automatically a complete backup strategy. Keep independent backups for important data and test restoration.

## 7. Common use cases

- **Server consolidation:** run several workloads on fewer physical hosts.
- **Development and testing:** create isolated environments.
- **Legacy applications:** run software that requires a particular OS.
- **Disaster recovery:** replicate or restore VM workloads.
- **Cloud compute:** provision virtual servers on demand.
- **Training labs:** practise Linux and Windows administration safely.

## 8. Performance and operational considerations

Virtualization introduces scheduling and resource-management overhead. Performance also depends on host capacity, storage latency, network design, workload patterns and resource contention. Monitor CPU utilization, memory pressure, disk latency, network throughput and application health.

## 9. VM vs container

A virtual machine virtualizes hardware and normally includes its own guest operating system. A container isolates an application process and its dependencies while sharing the host operating-system kernel.

| Virtual machine | Container |
| --- | --- |
| Includes a guest OS | Shares host kernel |
| Usually larger footprint | Usually lighter-weight |
| OS-level separation between guests | Process and namespace isolation; not a VM-equivalent boundary |
| Can run a different guest OS supported by the hypervisor | Container must be compatible with host kernel/platform |
| Common for full OS workloads | Common for packaging and running applications |

Containers are not simply "faster VMs"; they solve a different packaging and isolation problem. Both technologies are widely used together—for example, containers running on VMs in a cloud environment.

## 10. Cloud connection: EC2

Amazon EC2 provides resizable compute capacity as virtual server instances. When launching an instance, you select an Amazon Machine Image (AMI), instance type, network settings, storage and access configuration.

Continue with [the AWS EC2 guided lab](02-aws-ec2-lab.md).

## Discussion

1. When would you choose a VM instead of a container?
2. What risks remain even when workloads run in separate VMs?
3. Why is a snapshot not a substitute for tested backups?
4. What metrics would you monitor on a production VM?

## Further reading

- [AWS EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
- [Microsoft: Hyper-V overview](https://learn.microsoft.com/windows-server/virtualization/hyper-v/hyper-v-technology-overview)
- [Docker: What is a container?](https://www.docker.com/resources/what-container/)
