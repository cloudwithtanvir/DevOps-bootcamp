---
title: "Interactive Lab: Linux Fundamentals on Ubuntu"
---

# Linux Fundamentals: Guided VM Lab

**Level:** Beginner · **Estimated time:** 90–120 minutes · **Environment:** Ubuntu 22.04/24.04

In this lab, you will connect to a real Ubuntu machine, operate it through SSH, complete practical Linux tasks, verify each result, and submit evidence just as you would in a real DevOps team.

> **Important:** This website does not run commands on your behalf. You connect to and control your own VM. Never paste private SSH keys, passwords, cloud credentials, or access tokens into this page or a public GitHub repository.

## What you will build

By the end, you will have:
- Connected to an Ubuntu VM over SSH.
- Created and inspected files and directories.
- Managed a Linux service with systemd.
- Inspected processes, network interfaces, routes and DNS.
- Installed and removed a package.
- Collected terminal output as evidence in a GitHub submission.

## 1. Prepare your Ubuntu VM

Choose one environment:

| Option | Good for | Notes |
|---|---|---|
| Ubuntu VM in VirtualBox | Local practice without cloud charges | Requires a computer with enough memory and disk |
| Ubuntu on WSL2 | Windows users | Good for most command-line exercises; systemd availability depends on WSL setup |
| Ubuntu cloud VM (AWS EC2, Azure VM, or Google Compute Engine) | Real remote-server experience | May incur charges; use the smallest suitable instance and stop/delete it after the lab |

For this exercise, use **Ubuntu 22.04 or 24.04**. A small VM with 1–2 vCPU and 1–2 GB RAM is sufficient for these basic tasks.

### Cloud VM safety checklist

Before creating a cloud instance:
- Choose a low-cost/free-tier eligible size in your region and check the provider's current pricing.
- Restrict SSH (TCP port 22) inbound access to **your own public IP address**, not `0.0.0.0/0`.
- Use an SSH key pair. Do not enable password login for this beginner lab.
- Do not put cloud access keys or private SSH keys in GitHub.
- Set a billing budget/alert where available. A budget alert is not a hard spending cap.
- Delete the VM and any unattached disks or public IP resources when you finish.

## 2. Connect to the VM

You need these values from your VM's details page:
- **Public IP address** (or private IP if you are on the same private network).
- **SSH username**. For many Ubuntu cloud images this is `ubuntu`, but confirm with your provider's image documentation.
- **Private key file** that matches the public key configured on the VM.

On your own laptop, open Terminal (macOS/Linux) or PowerShell (Windows), then restrict the key file permissions where applicable:

```bash
chmod 400 ~/Downloads/your-key.pem
```

Connect (replace the placeholders):

```bash
ssh -i ~/Downloads/your-key.pem ubuntu@YOUR_VM_PUBLIC_IP
```

For a default key already loaded into your SSH agent:

```bash
ssh ubuntu@YOUR_VM_PUBLIC_IP
```

On first connection, SSH may ask you to confirm the server host key. Verify the fingerprint using your cloud provider's trusted console or documentation before accepting it.

**Success check:** Your terminal prompt should change to a prompt on the Ubuntu VM. Run:

```bash
whoami
hostname
hostname -I
. /etc/os-release && echo "$PRETTY_NAME"
```

Expected: the username, VM hostname, its private IP address, and an Ubuntu version are displayed.

**Troubleshooting**
- `Permission denied (publickey)`: check the username, key pair, and key file.
- `Connection timed out`: check the VM is running, the IP is correct, and the security group/firewall allows TCP 22 from your IP.
- `UNPROTECTED PRIVATE KEY FILE`: run `chmod 400 your-key.pem` on macOS/Linux.
- Never solve an SSH problem by opening port 22 to the entire internet.

## 3. Exercise A — File system and permissions

### Mission

Create a small log directory under your home directory, create a log file, write a line into it, and inspect its permissions.

We use your home directory for the first exercise so you do not need unnecessary root privileges.

Run one command at a time:

```bash
pwd
ls -la
mkdir -p ~/devops-lab/logs
cd ~/devops-lab/logs
touch app.log
echo "Bootcamp Linux lab started" > app.log
cat app.log
ls -l app.log
stat app.log
```

**Check your understanding:** Why did these commands not need `sudo`? What is the difference between `ls -l` and `stat`?

### Optional root-permission challenge

Inspect `/var/log`, then create a dedicated lab directory there. Use `sudo` only for the operations that need elevated permissions:

```bash
cd /var/log
ls -la
sudo mkdir -p /var/log/devops-bootcamp-lab
sudo touch /var/log/devops-bootcamp-lab/task.log
sudo sh -c 'echo "Created during the DevOps bootcamp" > /var/log/devops-bootcamp-lab/task.log'
sudo ls -l /var/log/devops-bootcamp-lab/task.log
sudo cat /var/log/devops-bootcamp-lab/task.log
```

**Expected result:** the file exists and contains the line you wrote. Its owner should normally be `root`, because it was created with `sudo`.

Cleanup when you are done:

```bash
sudo rm -r /var/log/devops-bootcamp-lab
```

Double-check the path before running any `rm -r` command.

## 4. Exercise B — Processes and services

### Mission

Install nginx, inspect its service and processes, stop it, start it again, and test its local HTTP response.

```bash
sudo apt update
sudo apt install -y nginx
systemctl status nginx --no-pager
pgrep -a nginx
ps aux | grep '[n]ginx'
```

Stop and verify:

```bash
sudo systemctl stop nginx
systemctl is-active nginx
pgrep -a nginx || echo "No nginx processes found"
```

Start it again and test:

```bash
sudo systemctl start nginx
systemctl is-active nginx
curl -I http://localhost
```

**Expected result:** the service is active after starting, and `curl` returns an HTTP response (normally `200 OK` for the default nginx page).

### Bonus — Background process

```bash
sleep 600 &
jobs -l
pgrep -a sleep
```

Find the PID and stop only the process you started:

```bash
kill YOUR_SLEEP_PID
```

Explain in your submission why `kill` (SIGTERM) is preferred before `kill -9` (SIGKILL).

## 5. Exercise C — Network troubleshooting

Run:

```bash
ip addr
ip route
ss -tulpn
ping -c 4 1.1.1.1
getent hosts example.com
```

If `dig` is not installed, install the DNS utilities package:

```bash
sudo apt install -y dnsutils
dig example.com
```

**Questions**
1. Which interface has the VM's private IP address?
2. What is the default gateway shown by `ip route`?
3. Does `ping` to the IP work?
4. Does DNS resolution for `example.com` work?
5. What is the difference between a listening socket and an established connection?

### Optional SSH file transfer

From your laptop (not inside the VM), create a small file and copy it to the VM:

```bash
echo "Transferred from my laptop" > transfer-test.txt
scp -i ~/Downloads/your-key.pem transfer-test.txt ubuntu@YOUR_VM_PUBLIC_IP:~/devops-lab/
```

Back in your VM SSH session:

```bash
cat ~/devops-lab/transfer-test.txt
```

## 6. Exercise D — Package management

```bash
sudo apt update
sudo apt install -y htop
htop
```

Exit htop with `q`, then remove it:

```bash
sudo apt remove -y htop
```

**Question:** What is the difference between `apt update` and `apt upgrade`?

## 7. Verify your work

Run this final evidence collection:

```bash
echo "=== HOST ==="
hostname
whoami
echo "=== OS ==="
. /etc/os-release && echo "$PRETTY_NAME"
echo "=== LAB FILE ==="
cat ~/devops-lab/logs/app.log
ls -l ~/devops-lab/logs/app.log
echo "=== NGINX ==="
systemctl is-active nginx
curl -I --max-time 5 http://localhost
echo "=== NETWORK ==="
ip route
getent hosts example.com
echo "=== PACKAGE ==="
dpkg -l htop 2>/dev/null | tail -n +6
```

Copy the useful output into your report. Remove public IPs, usernames or hostnames you do not want to share, and **never include private keys, passwords, tokens or cloud credentials**.

## 8. Submit your lab report

Create:

```text
solutions/01-linux/YOUR_GITHUB_USERNAME.md
```

Use this structure:

```markdown
# Linux Fundamentals Lab — YOUR NAME

## Environment
- Ubuntu version:
- VM type: VirtualBox / WSL2 / AWS / Azure / GCP
- Date completed:

## SSH connection
- Connection successful: Yes/No
- Problem faced and how I fixed it:

## Exercise A — Files and permissions
- Commands used:
- Evidence/output:
- What I learned about sudo and ownership:

## Exercise B — Processes and nginx
- nginx status before and after:
- HTTP response:
- Difference between kill and kill -9:

## Exercise C — Networking
- Private interface:
- Default gateway:
- Ping and DNS result:
- What I learned:

## Exercise D — Packages
- Install/remove result:
- Difference between apt update and apt upgrade:

## Reflection
- Most difficult part:
- One thing I can now do independently:
- One question I still have:
```

Follow the [How to Submit Your Solution](../HOW-TO-SUBMIT.md) guide and open a pull request from your fork.

## 9. Clean up your environment

After you have collected your evidence:
- Remove the optional lab directory under `/var/log` if you created it.
- Stop or delete your cloud VM when you no longer need it.
- Delete any cloud disks or public IP resources that continue to incur charges.
- Keep your private SSH key safely on your own device.

**Completion criteria:** SSH connection demonstrated, file created and inspected, nginx stopped and restarted, network and DNS checks completed, htop installed and removed, report submitted.
