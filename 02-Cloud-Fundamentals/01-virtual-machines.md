# Module 3 Virtual Machines

Owner: Tanvir Ahmed

### What is a Server?

A server is a computer or system that provides resources, data, services, or programs to other computers, known as clients, over a network. There are different types of servers, such as web servers, database servers, application servers, and file servers. Servers are designed to handle and manage network resources efficiently and are often more powerful and robust than typical client computers.

### What is a VM?

A Virtual Machine (VM) is a software-based emulation of a physical computer. It runs an operating system and applications just like a physical computer. VMs are created using virtualization software and can be run on physical hardware (host machine) alongside other VMs. Each VM has its own virtualized hardware, including CPUs, memory, disk storage, and network interfaces.

### What is a Hypervisor?

A hypervisor, also known as a virtual machine manager (VMM), is software that creates and manages virtual machines. It allows multiple VMs to run on a single physical host by abstracting the hardware resources and allocating them to the VMs. There are two main types of hypervisors:

1. **Type 1 (Bare-Metal) Hypervisors**: These run directly on the host's hardware and manage guest operating systems, such as VMware ESXi, Microsoft Hyper-V, and Xen.
2. **Type 2 (Hosted) Hypervisors**: These run on a conventional operating system and then manage guest operating systems, such as VMware Workstation, Oracle VirtualBox, and Parallels Desktop.

### Difference Between Physical and Virtual Machines

- **Physical Machines**:
    - **Definition**: Actual hardware devices.
    - **Resource Allocation**: Direct and static allocation of resources like CPU, memory, and storage.
    - **Isolation**: Limited; processes can interfere with each other if not managed properly.
    - **Flexibility**: Less flexible, as hardware upgrades or changes are needed for scaling.
    - **Cost**: Higher upfront cost for purchasing and maintaining hardware.
- **Virtual Machines**:
    - **Definition**: Software-based emulations of physical computers.
    - **Resource Allocation**: Dynamic and managed by the hypervisor, allowing for efficient use of resources.
    - **Isolation**: High; each VM operates independently with its own OS and applications.
    - **Flexibility**: Highly flexible; easy to create, modify, clone, and migrate.
    - **Cost**: Lower cost due to shared hardware resources and reduced need for physical infrastructure.

### Advantages of Virtual Machines

1. **Efficient Resource Utilization**:
    - VMs can share the physical resources of a single host, maximizing the use of CPU, memory, and storage.
2. **Isolation and Security**:
    - Each VM is isolated from others, reducing the risk of one VM affecting another and improving security.
3. **Scalability**:
    - VMs can be easily scaled up or down by adjusting allocated resources or adding more VMs.
4. **Flexibility and Portability**:
    - VMs can be moved between different physical machines, allowing for easier maintenance and disaster recovery.
5. **Cost Savings**:
    - Reduced need for physical hardware leads to lower capital and operational expenses.
6. **Environment Consistency**:
    - VMs provide consistent environments for development, testing, and production, minimizing discrepancies.
7. **Snapshot and Backup**:
    - VMs support snapshots and backups, allowing for easy rollback and data recovery.

### Detailed Overview of Virtual Machines

### 1. **Creation and Management**

Virtual machines are created through a process called virtualization, which is managed by a hypervisor. The hypervisor allocates resources like CPU, memory, and storage to each VM, which operates as if it were running on a physical machine. Users can create multiple VMs on a single physical host, each with its own operating system and applications.

### 2. **Types of Virtual Machines**

- **System VMs**: These VMs provide a complete system platform that supports the execution of a complete operating system (e.g., Windows, Linux).
- **Process VMs**: These VMs run a single application or process, providing an environment that abstracts the underlying hardware (e.g., Java Virtual Machine).

### 3. **Use Cases**

- **Server Consolidation**: Running multiple server instances on a single physical machine to reduce hardware costs.
- **Development and Testing**: Developers use VMs to create isolated environments for testing software without affecting the main system.
- **Disaster Recovery**: VMs can be backed up and replicated, making it easier to recover from hardware failures.
- **Cloud Computing**: Cloud providers offer VMs as a service, allowing users to deploy applications without worrying about underlying hardware.

### 4. **Performance Considerations**

While VMs offer many benefits, there are performance considerations due to the overhead of virtualization. Hypervisors manage this overhead by optimizing resource allocation and using techniques like paravirtualization, which allows the guest OS to be aware of the hypervisor, improving efficiency.

### 5. **Future Trends**

- **Containerization**: Containers provide an alternative to VMs by offering a lighter-weight form of virtualization, sharing the host OS kernel while isolating applications.
- **Edge Computing**: VMs are increasingly used in edge computing to provide processing power closer to data sources, reducing latency.
- **Hybrid Cloud**: Combining on-premises and cloud resources using VMs to provide flexible and scalable computing environments.

In summary, virtual machines play a crucial role in modern IT infrastructure by providing flexible, efficient, and cost-effective solutions for resource management, application deployment, and disaster recovery.

What are the differences between Virtualization (VMware) and Containerization (Docker)?

The diagram below illustrates the layered architecture of virtualization and containerization.

“Virtualization is a technology that allows you to create multiple simulated environments or dedicated resources from a single, physical hardware system” [1].

“Containerization is the packaging together of software code with all its necessary components like libraries, frameworks, and other dependencies so that they are isolated in their own "container" [2].

The major differences are:

🔹 In virtualization, the hypervisor creates an abstraction layer over hardware, so that multiple operating systems can run alongside each other. This technique is considered to be the first generation of cloud computing.

![https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F14409324-6525-49f9-85b5-ea416d4efffb_2556x1383.jpeg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F14409324-6525-49f9-85b5-ea416d4efffb_2556x1383.jpeg)

🔹Containerization is considered to be a lightweight version of virtualization, which virtualizes the operating system instead of hardware. Without the hypervisor, the containers enjoy faster resource provisioning. All the resources (including code, dependencies) that are needed to run the application or microservice are packaged together, so that the applications can run anywhere.

Question: how much performance differences have you observed in production between virtualization, containerization, and bare-metal?