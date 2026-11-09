---
title: "Linux Foundations for DevOps"
---

# Linux Foundations for DevOps

**Level:** Beginner · **Recommended pace:** 2 weeks · **Practice environment:** Ubuntu 22.04/24.04

Linux is the operating system behind a large part of modern cloud infrastructure. DevOps engineers use it to connect to servers, deploy applications, inspect logs, manage services, troubleshoot networks, automate routine work, and secure workloads.

This lesson is designed to be used alongside the [Guided Ubuntu VM Lab](task-1-linux-practice.md). Read a topic, run the commands in your own lab environment, and record what you observe.

## Learning outcomes

By the end of this module, you should be able to:

1. Navigate the Linux filesystem and manage files safely.
2. Explain users, groups, ownership, and basic permissions.
3. Install packages and manage services with `apt` and `systemctl`.
4. Inspect processes, logs, disk, memory, CPU, and network connectivity.
5. Connect to a remote Linux server using SSH and transfer files with SCP.
6. Write and run a small Bash script and schedule a task with cron.
7. Troubleshoot a simple service that is unavailable.

## 1. Linux, the shell, and the terminal

Linux is an operating-system kernel; distributions such as Ubuntu package the kernel with system tools, libraries, and software. The **terminal** is the interface where you type commands. A **shell** such as Bash interprets those commands.

DevOps engineers use the command line because it works on remote servers, can be scripted, and produces repeatable results.

Start by identifying your environment:

```bash
whoami
hostname
uname -a
cat /etc/os-release
```

Useful shell habits:

- Use **Tab** to complete paths and command names.
- Use the **Up Arrow** to recall previous commands.
- Use `history` to inspect recent commands.
- Use `man COMMAND` or `COMMAND --help` to read help; press `q` to leave a manual page.
- Use `clear` to clear the terminal display.

## 2. Navigate the filesystem

Linux uses one directory tree beginning at `/`. Your current directory is not necessarily your home directory.

| Path | Typical purpose |
|---|---|
| `/` | Filesystem root |
| `/home/USERNAME` | Regular users' home directories |
| `/etc` | System and service configuration |
| `/var/log` | Logs |
| `/var/www` | Common web content location |
| `/usr` | Installed programs, libraries, and shared data |
| `/tmp` | Temporary files |
| `/opt` | Optional third-party software |
| `/dev` | Device files |
| `/proc`, `/sys` | Virtual filesystems exposing process and kernel information |

Try:

```bash
pwd
ls
ls -lah
cd /etc
cd ..
cd ~
```

Remember: `/` is the filesystem root; `~` is your home directory; `.` means the current directory; `..` means the parent directory.

## 3. Create, inspect, search, and edit files

```bash
mkdir -p ~/devops-lab/logs
cd ~/devops-lab
touch notes.txt
echo "Linux practice started" > notes.txt
echo "Second line" >> notes.txt
cat notes.txt
less notes.txt
head -n 5 notes.txt
tail -n 5 notes.txt
cp notes.txt notes-backup.txt
mv notes-backup.txt archive.txt
```

- `>` replaces a file's contents; `>>` appends.
- `|` sends one command's output to another command.
- `grep` searches text; `find` searches for files and directories.

```bash
grep -n "Linux" notes.txt
find ~/devops-lab -type f -name "*.txt"
```

Use `nano filename` for a beginner-friendly editor. In nano, `Ctrl+O` saves and `Ctrl+X` exits.

**Safety:** `rm` deletes files. Check your current directory with `pwd` and the target with `ls` before removing anything. Avoid practising with `rm -rf`, especially with wildcards or system paths.

## 4. Users, groups, and permissions

Linux is a multi-user system. Files have an owner, a group, and permissions for the owner, group, and others.

```bash
whoami
id
groups
ls -l notes.txt
```

Example permission string: `-rwxr-xr--`

- First character: file type (`-` regular file, `d` directory).
- Next three: owner permissions.
- Next three: group permissions.
- Last three: permissions for others.
- `r` = read, `w` = write, `x` = execute.

For numeric permissions, read = 4, write = 2, execute = 1:

| Mode | Owner | Group | Others | Common use |
|---|---|---|---|---|
| `755` | rwx | r-x | r-x | Directories and executable files |
| `644` | rw- | r-- | r-- | Typical non-secret text/config files |
| `600` | rw- | --- | --- | Private files, such as SSH private keys |

Practise only inside your lab directory:

```bash
cd ~/devops-lab
touch deploy.sh
chmod 600 notes.txt
chmod 700 deploy.sh
ls -l
```

Change ownership with `chown` when needed (usually with `sudo`):

```bash
sudo chown USER:GROUP filename
```

Use `sudo` only for commands that need administrative privileges. Do not use `chmod 777` as a shortcut for permission problems. Be especially careful with recursive `chmod -R` and `chown -R`.

## 5. Packages and software installation

Ubuntu uses APT to manage packages.

```bash
sudo apt update
apt list --upgradable
sudo apt install -y nginx
nginx -v
sudo apt remove -y nginx
```

- `apt update` refreshes the local package index; it does not upgrade installed applications.
- `apt upgrade` upgrades installed packages.
- `apt install` installs a package and its dependencies.
- `apt remove` removes a package but normally leaves configuration files.
- `apt purge` also removes package configuration; use it only when you intend to remove that configuration.

Different Linux distributions use different package managers: for example, DNF on modern Fedora/RHEL-family systems and APT on Debian/Ubuntu.

## 6. Processes and services

A **process** is a running program. A **service** is a program managed by the service manager, commonly systemd on Ubuntu.

Inspect processes:

```bash
ps aux
pgrep -a nginx
top
```

Manage an Nginx service:

```bash
sudo systemctl status nginx --no-pager
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
sudo systemctl is-active nginx
```

- `start` starts it now; `enable` configures it to start at boot. They are different actions.
- Check status and logs before restarting a failing service.
- Prefer a normal `kill PID` (SIGTERM) to request graceful shutdown. Use `kill -9 PID` (SIGKILL) only when a process will not stop normally and you understand the consequences.

## 7. Logs and troubleshooting

Logs are one of the first places to investigate when an application or service fails.

```bash
journalctl -u nginx --since "1 hour ago"
journalctl -u nginx -f
sudo tail -n 50 /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

Useful investigation sequence:

1. Check whether the service is active: `systemctl status nginx`.
2. Read recent service logs: `journalctl -u nginx -n 50 --no-pager`.
3. Check whether the expected port is listening: `sudo ss -tulpn`.
4. Test locally: `curl -I http://localhost`.
5. Check disk and memory before making changes: `df -h`, `free -h`.

Do not delete log files just because a disk is full. Identify what is consuming space and use the service's log rotation or a planned cleanup process.

## 8. Networking essentials

| Concept | Command | What to inspect |
|---|---|---|
| Interfaces and IP addresses | `ip addr` | Interface names and assigned addresses |
| Routes and default gateway | `ip route` | Where traffic is sent |
| Listening sockets | `ss -tulpn` | Services listening on TCP/UDP ports |
| DNS lookup | `getent hosts example.com`, `dig example.com` | Name resolution |
| Connectivity | `ping -c 4 1.1.1.1` | Basic IP reachability |
| HTTP response | `curl -I https://example.com` | HTTP status and headers |

`ip` and `ss` are preferred in modern Linux over older `ifconfig` and `netstat` examples. Some minimal systems may not include `dig`; on Ubuntu it is available in the `dnsutils` package.

A useful troubleshooting distinction:
- If an IP address is reachable but a hostname is not, investigate DNS.
- If a service responds on localhost but not from another machine, check its bind address, host firewall, cloud firewall/security group, and routing.
- A listening port does not guarantee that the application is healthy.

## 9. SSH and secure file transfer

SSH gives you encrypted remote terminal access. Use a key pair and keep the private key on your own device.

```bash
chmod 400 ~/Downloads/your-key.pem
ssh -i ~/Downloads/your-key.pem ubuntu@YOUR_VM_PUBLIC_IP
```

Copy a file from your laptop to the VM with SCP:

```bash
scp -i ~/Downloads/your-key.pem report.txt ubuntu@YOUR_VM_PUBLIC_IP:~/devops-lab/
```

For cloud VMs, restrict inbound SSH (TCP 22) to your own IP where possible. Never publish private keys, passwords, access tokens, or cloud credentials. Verify a server's host-key fingerprint through a trusted channel when connecting for the first time.

## 10. Bash scripting fundamentals

A Bash script is a repeatable sequence of shell commands. Create a simple system information script:

```bash
mkdir -p ~/devops-lab/scripts
nano ~/devops-lab/scripts/system-report.sh
```

Add:

```bash
#!/usr/bin/env bash
set -u

echo "Host: $(hostname)"
echo "Date: $(date)"
echo "Disk usage:"
df -h /
echo "Memory:"
free -h
```

Run it:

```bash
chmod +x ~/devops-lab/scripts/system-report.sh
~/devops-lab/scripts/system-report.sh
```

Core Bash concepts to practise next:

```bash
name="bootcamp"
echo "Hello, $name"

if [ -f /etc/os-release ]; then
  echo "OS information file exists"
fi

for item in logs scripts; do
  echo "Found lab directory: $item"
done
```

When scripts become important, add argument validation, clear error messages, logging, and careful handling of failures. Do not assume that `set -e` alone is complete error handling.

## 11. Scheduling tasks with cron

Cron runs commands on a schedule. Edit and inspect your own user's crontab:

```bash
crontab -e
crontab -l
```

A cron entry has five time fields followed by a command:

```text
* * * * * command
│ │ │ │ └─ day of week (0–7; Sunday is 0 or 7)
│ │ │ └─── month (1–12)
│ │ └───── day of month (1–31)
│ └─────── hour (0–23)
└───────── minute (0–59)
```

Examples:

| Schedule | Expression |
|---|---|
| Every 5 minutes | `*/5 * * * *` |
| Every day at 02:00 | `0 2 * * *` |
| Every Monday at 09:30 | `30 9 * * 1` |

Cron has a limited environment. Use absolute paths to scripts and commands, and redirect output to a log while testing. Avoid scheduling destructive cleanup commands until you have tested the exact target and retention rule.

## 12. Basic system monitoring

These commands provide a first view of server health:

```bash
uptime
free -h
df -h
du -sh ~/devops-lab
top
ss -s
```

- `uptime`: uptime and load averages.
- `free -h`: memory and swap.
- `df -h`: filesystem capacity.
- `du -sh PATH`: size of a directory.
- `top`: live process and resource view.
- `ss -s`: socket summary.

A high CPU load, low available memory, full disk, or unexpected listening port is a clue to investigate—not automatically proof of the root cause. Later in the bootcamp, connect these operating-system signals to Prometheus, Grafana, and cloud monitoring.

## 13. Mini project — Diagnose a web server

Use your Ubuntu VM and Nginx from the guided lab.

1. Install Nginx and confirm the service is active.
2. Use `curl -I http://localhost` to test the local response.
3. Find the listening port with `ss -tulpn`.
4. Read recent Nginx logs with `journalctl` or the files under `/var/log/nginx/`.
5. Stop Nginx and observe the result of the curl request.
6. Start Nginx again and verify the response.
7. Write a short Bash script that prints hostname, disk usage, and memory.
8. Explain how you would check whether a remote access problem is caused by DNS, the service, or a firewall.

## Knowledge check

Before moving on, make sure you can explain:

- [ ] The difference between `/`, `~`, `.`, and `..`.
- [ ] The difference between `>` and `>>`, and what a pipe does.
- [ ] What `rwx`, `755`, and `644` mean.
- [ ] Why `sudo` should be used carefully.
- [ ] The difference between a process and a systemd service.
- [ ] How to inspect service logs and listening ports.
- [ ] How to distinguish basic IP connectivity from DNS resolution.
- [ ] How to connect to a VM securely with SSH.
- [ ] How to run a Bash script and read a cron schedule.
- [ ] How to check CPU, memory, and disk usage.

## Further practice

- [Guided Ubuntu VM Lab](task-1-linux-practice.md)
- [Linux VM setup and safety guide](VM-LAB-GUIDE.md)
- [How to submit your solution](../HOW-TO-SUBMIT.md)

**Next step:** Complete the VM lab, submit your evidence in a pull request, and be ready to explain not only which command you used but why you used it.
