# DevOps Lab 01: Ubuntu VM Setup and SSH Connection

**Name:** Md Kamrul Islam
**Date:** 2026-11-17

---

## 1. Objective

Set up an Ubuntu Server virtual machine on a MacBook Pro and connect to it from the host machine over SSH.

## 2. Environment

| Item | Details |
|---|---|
| Host machine | MacBook Pro (Apple M2, Apple Silicon / ARM64) |
| Host OS | macOS |
| Virtualization software | Oracle VirtualBox 7.x (macOS / Apple Silicon build) |
| Guest OS | Ubuntu Server 24.04.4 LTS (ARM64) |
| ISO file | `ubuntu-24.04.4-live-server-arm64.iso` |
| VM name / hostname | `ubuntu-development` |
| VM user | `vboxuser` |
| VM resources | 2 vCPU, 2048 MB RAM, 20 GB disk |
| Network | NAT with port forwarding (host `2222` → guest `22`) |

## 3. Choosing the Environment

Three options were given: VirtualBox, WSL2, or a cloud VM.

- **WSL2** was not an option, because it runs only on Windows.
- **A cloud VM** works, but it can cost money and isn't needed for basic exercises.
- **VirtualBox** was chosen because it is free, runs locally, and supports Apple Silicon Macs from version 7.1.

**Important:** The M2 chip uses the ARM64 architecture. VirtualBox on Apple Silicon can only run ARM64 guests, so the **ARM64** Ubuntu ISO was needed. The standard `amd64` ISO does not boot.

## 4. Steps Performed

### 4.1 Install VirtualBox
1. Downloaded VirtualBox for **macOS / Apple Silicon hosts** from https://www.virtualbox.org.
2. Installed it and opened **Oracle VirtualBox Manager**.
3. Selected **Expert Mode** on the welcome screen so that all settings were visible.

### 4.2 Download the Ubuntu ISO
Downloaded the Ubuntu Server ARM64 image from Canonical's image server:

```
https://cdimage.ubuntu.com/releases/24.04/release/ubuntu-24.04.4-live-server-arm64.iso
```

### 4.3 Create the Virtual Machine
In VirtualBox Manager, clicked **New** and configured:

- **Name:** `ubuntu-development`
- **ISO Image:** `ubuntu-24.04.4-live-server-arm64.iso`
- **Type / Version:** Linux / Ubuntu (64-bit, ARM)
- **Username / Password:** `vboxuser` / _(set during creation)_
- **Base Memory:** 2048 MB
- **Processors:** 2
- **Hard Disk:** 20 GB (new virtual disk)

Clicked **Finish**, then **Start** to boot the VM and install Ubuntu Server.

### 4.4 First Login and System Update
After installation, logged in on the VM console as `vboxuser` and updated the system:

```bash
sudo apt update && sudo apt upgrade -y
lsb_release -a     # verify Ubuntu version
uname -m           # shows aarch64 (ARM64)
```

### 4.5 Install and Enable the SSH Server (inside the VM)

```bash
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
sudo systemctl status ssh      # shows: active (running)
```

### 4.6 Configure Port Forwarding (VirtualBox)
The VM uses **NAT** networking, which hides it behind the host. To reach it from macOS, a port-forwarding rule was added:

**VM Settings → Network → Adapter 1 (Attached to: NAT) → Port Forwarding → ➕**

| Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
|---|---|---|---|---|---|
| ssh | TCP | 127.0.0.1 | 2222 | _(empty)_ | 22 |

This forwards connections sent to `127.0.0.1:2222` on the Mac to port `22` (SSH) inside the VM.

### 4.7 Connect via SSH from macOS
From the macOS **Terminal**:

```bash
ssh -p 2222 vboxuser@127.0.0.1
```

On the first connection, typed `yes` to accept the host key fingerprint, then entered the VM password.

## 5. Result: Successful SSH Connection

```text
Expanded Security Maintenance for Applications is not enabled.

62 updates can be applied immediately.
1 of these updates is a standard security update.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status

New release '26.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


vboxuser@ubuntu-development:~$ pwd
/home/vboxuser
vboxuser@ubuntu-development:~$ ls
vboxuser@ubuntu-development:~$ exit
logout
Connection to 127.0.0.1 closed.
user@USERnoMacBook-Pro ~ % ls
Applications	Documents	Library		Music		Public
Desktop		Downloads	Movies		Pictures	VirtualBox VMs
user@USERnoMacBook-Pro ~ %
```

**Verification:**
- The prompt changed to `vboxuser@ubuntu-development:~$`, which confirms the session was running inside the VM.
- `pwd` returned `/home/vboxuser`, the VM user's home directory.
- After `exit`, the prompt returned to the Mac (`user@USERnoMacBook-Pro`), and `ls` listed the macOS home folders, including `VirtualBox VMs`.

## 6. Issues Encountered and Solutions

| Issue | Cause | Solution |
|---|---|---|
| Needed the right ISO for the M2 Mac | Apple Silicon is ARM64. The standard Ubuntu ISO is amd64 (x86) | Downloaded the `live-server-arm64.iso` image |
| Login showed "incorrect" | The password isn't shown while typing, and keyboard layout or symbols can differ in the VM | Typed the password carefully with Caps Lock off; VirtualBox's default unattended password is `changeme` |
| Console text was very small | Retina display scaling | Used **View → Virtual Screen 1 → Scale to 200%**, then switched to SSH from macOS Terminal (⌘ + to zoom) |
| Could not reach the VM directly | NAT networking hides the VM from the host | Added the NAT port-forwarding rule `2222 → 22` |

## 7. Commands Summary

| Where | Command | Purpose |
|---|---|---|
| VM | `sudo apt update && sudo apt upgrade -y` | Update package lists and upgrade packages |
| VM | `sudo apt install -y openssh-server` | Install the SSH server |
| VM | `sudo systemctl enable --now ssh` | Start SSH now and on every boot |
| VM | `sudo systemctl status ssh` | Check that the SSH service is running |
| Mac | `ssh -p 2222 vboxuser@127.0.0.1` | Connect to the VM through the forwarded port |
| VM | `pwd` / `ls` | Show the current directory / list files |
| VM | `exit` | Close the SSH session |

## 8. Conclusion

An Ubuntu Server 24.04 LTS (ARM64) virtual machine was installed in VirtualBox on an Apple M2 MacBook Pro. The OpenSSH server was installed and enabled in the VM, and a NAT port-forwarding rule mapped host port 2222 to guest port 22. A remote SSH session was then opened from macOS Terminal and verified with `pwd` and `ls`. The VM is ready for the following DevOps exercises.
