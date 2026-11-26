# DevOps Lab 01: Ubuntu VM Setup and SSH Connection

**Name:** Md Kamrul Islam
**Date:** 2026-11-17
**Updated at** 2026-11-26

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

# Exercise A — Files and permissions
- **Commands used:**

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

- **Evidence/output:**

  ```text
  $ pwd
  /home/vboxuser

  $ cd ~/devops-lab/logs
  $~/devops-lab/logs$ ls
    app.log
  $ cat app.log
    Bootcamp Linux lab started
  $ ~/devops-lab/logs$ cat app.log
    Bootcamp Linux lab started
  ~/devops-lab/logs$ ls -l app.log
    -rw-rw-r-- 1 vboxuser vboxuser 27 Nov 25 14:02 app.log

  $ stat app.log
    File: app.log
    Size: 27        	Blocks: 8          IO Block: 4096   regular file
    Device: 8,2	Inode: 784915      Links: 1
    Access: (0664/-rw-rw-r--)  Uid: ( 1000/vboxuser)   Gid: ( 1000/vboxuser)
    Access: 2026-11-25 14:02:23.097499207 +0000
    Modify: 2026-11-25 14:02:17.455473037 +0000
    Change: 2026-11-25 14:02:17.455473037 +0000
    Birth: 2026-11-25 14:01:50.910318082 +0000
  ```

- **What I learned about sudo and ownership:**
  - Every file has an **owner**, a **group** and **permissions** (`r` read, `w` write, `x` execute) for owner / group / others, as shown by `ls -l`.
  - Files in my home folder (`/home/vboxuser`) belong to me, so I can create and edit them **without sudo**.
  - System folders like `/var/www/html` and `/etc/ssh` belong to **root**, so changing them needs **`sudo`**, which runs one command as root after asking for my password.
  - `sudo echo "x" > /var/www/html/index.html` fails, because the `>` redirect runs as my normal user, not as root. The fix is `echo "x" | sudo tee /var/www/html/index.html`.
  - SSH refuses a private key that other users can read, which is why it needs `chmod 400` (read-only, owner only).
  - Use sudo only when needed. Running everything as root makes mistakes much more dangerous.

## Exercise B — Processes and nginx
- **nginx status before and after:**
  - **Before:** nginx was not installed. (My first attempt also had a typo, `ngnix`.)

    ```text
    $ systemctl status ngnix --no-pager
    Unit ngnix.service could not be found.
    ```

  - **After** running `sudo apt install -y nginx` and `sudo systemctl enable --now nginx`:

    ```text
    $ systemctl status nginx --no-pager
    ● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Fri 2026-11-20 13:59:24 UTC; 5 days ago
       Docs: man:nginx(8)
    Main PID: 2357 (nginx)
      Tasks: 2 (limit: 2206)
    Memory: 1.7M (peak: 3.6M)
        CPU: 27ms
    CGroup: /system.slice/nginx.service
             ├─2357 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             └─2360 "nginx: worker process"
    Nov 20 13:59:24 ubuntu-development systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
    Nov 20 13:59:24 ubuntu-development systemd[1]: Started nginx.service - A high performance web server and a reverse proxy server.
    ```

- **HTTP response:**

  ```text
  $ curl -I http://localhost
  HTTP/1.1 200 OK
  Server: nginx/1.24.0 (Ubuntu)
  Date: Fri, 20 Nov 2026 14:11:47 GMT
  Content-Type: text/html
  Content-Length: 615
  Last-Modified: Fri, 20 Nov 2026 13:59:23 GMT
  Connection: keep-alive
  ETag: "6b00523b-267"
  Accept-Ranges: bytes
  ```

  I also opened the site from Chrome on macOS. I added a second VirtualBox port-forward (host `127.0.0.1:8080` → guest `80`), opened `http://127.0.0.1:8080`, and saw "Welcome to nginx!". Then I replaced it with my own `/var/www/html/index.html`.

- **Difference between kill and kill -9:**
  - `kill <PID>` sends **SIGTERM (15)**, a polite request to stop. The process can finish its work, close files and connections, and exit cleanly.
  - `kill -9 <PID>` sends **SIGKILL (9)**, which the kernel uses to end the process at once. The process cannot catch or ignore it and gets no chance to clean up, so data can be lost or temporary files left behind.
  - Rule: try `kill` (or `sudo systemctl stop nginx` for services) first, and use `kill -9` only when a process does not respond.

## Exercise C — Networking
- **Private interface:** `enp0s8`, IP address `10.0.2.15/24` (VirtualBox NAT network `10.0.2.0/24`)

  ```text
  $ ip -brief addr
  lo               UNKNOWN        127.0.0.1/8 ::1/128
  enp0s8           UP             10.0.2.15/24 metric 100 fd17:625c:f037:2:a00:27ff:fe33:877e/64 fe80::a00:27ff:fe33:877e/64
  ```

  - `lo`: the **loopback** interface (`127.0.0.1`), which the machine uses to talk to itself, e.g. `curl http://localhost`.
  - `enp0s8`: the **real network interface**, state `UP`, with private IPv4 `10.0.2.15/24`. It also has IPv6 addresses: `fd17:...` (private, unique-local) and `fe80::...` (link-local, only valid on this network segment).

- **Default gateway:** `10.0.2.2` (VirtualBox's virtual NAT router)

  ```text
  $ ip route
  default via 10.0.2.2 dev enp0s8 proto dhcp src 10.0.2.15 metric 100
  0.192.249.101 via 10.0.2.2 dev enp0s8 proto dhcp src 10.0.2.15 metric 100
  10.0.2.0/24 dev enp0s8 proto kernel scope link src 10.0.2.15 metric 100
  10.0.2.2 dev enp0s8 proto dhcp scope link src 10.0.2.15 metric 100
  192.168.0.1 via 10.0.2.2 dev enp0s8 proto dhcp src 10.0.2.15 metric 100
  ```

  - `default via 10.0.2.2`: all traffic to the internet goes through the gateway `10.0.2.2`.
  - `10.0.2.0/24 ... scope link`: addresses in the local NAT network are reached directly, without the gateway.
  - `src 10.0.2.15`: my VM's own private IP, assigned by DHCP.
  - The `192.168.0.1` and `0.192.249.101` lines are single-host routes that DHCP added, most likely for the DNS servers VirtualBox passed in from my Mac's network.
- **Ping and DNS result:**

  ```text
  $ ping -c 4 8.8.8.8
  PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
  64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=14.8 ms
  64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=22.6 ms
  64 bytes from 8.8.8.8: icmp_seq=3 ttl=116 time=19.6 ms
  64 bytes from 8.8.8.8: icmp_seq=4 ttl=116 time=19.8 ms

  --- 8.8.8.8 ping statistics ---
  4 packets transmitted, 4 received, 0% packet loss, time 3006ms
  rtt min/avg/max/mdev = 14.758/19.180/22.617/2.823 ms

  $ ping -c 4 google.com
  PING google.com (142.250.23.100) 56(84) bytes of data.
  64 bytes from zj-in-f100.1e100.net (142.250.23.100): icmp_seq=1 ttl=113 time=18.0 ms
  64 bytes from zj-in-f100.1e100.net (142.250.23.100): icmp_seq=2 ttl=113 time=45.5 ms
  64 bytes from zj-in-f100.1e100.net (142.250.23.100): icmp_seq=3 ttl=113 time=92.7 ms
  64 bytes from zj-in-f100.1e100.net (142.250.23.100): icmp_seq=4 ttl=113 time=20.1 ms

  --- google.com ping statistics ---
  4 packets transmitted, 4 received, 0% packet loss, time 3007ms
  rtt min/avg/max/mdev = 17.984/44.067/92.658/30.074 ms

  $ resolvectl query google.com
  google.com: 2404:6800:400b:c005::66            -- link: enp0s8
              2404:6800:400b:c005::64            -- link: enp0s8
              2404:6800:400b:c005::71            -- link: enp0s8
              2404:6800:400b:c005::8a            -- link: enp0s8
              142.250.23.101                     -- link: enp0s8
              142.250.23.100                     -- link: enp0s8
              142.250.23.138                     -- link: enp0s8
              142.250.23.102                     -- link: enp0s8
              142.250.23.113                     -- link: enp0s8
              142.250.23.139                     -- link: enp0s8

  -- Information acquired via protocol DNS in 9.6ms.
  -- Data is authenticated: no; Data was acquired via local or encrypted transport: no
  -- Data from: cache
  ```

  **Result:**
  - `ping 8.8.8.8`: 4/4 packets received, **0% packet loss**, average 19.2 ms. The VM has working internet connectivity.
  - `ping google.com`: the name resolved to `142.250.23.100` and 4/4 packets came back with **0% packet loss**, so **DNS works**. Times varied more (18–93 ms, average 44 ms), which is normal over Wi-Fi.
  - `resolvectl query google.com`: DNS returned 6 IPv4 and 4 IPv6 addresses for google.com. Large sites use many servers for load balancing and redundancy. The answer came from the local **cache** because the earlier ping had already looked the name up.

- **What I learned:**
  - My VM has a **private IP** on VirtualBox's internal NAT network. It is not directly reachable from my Mac or the internet.
  - The **default gateway** is the router the VM sends all non-local traffic through. Here that is VirtualBox's virtual router.
  - `ping 8.8.8.8` tests raw internet connectivity, and `ping google.com` also tests **DNS** (name → IP). If the IP works but the name does not, the problem is DNS.
  - To reach a service inside a NAT VM from the host, you need **port forwarding** (2222 → 22 for SSH, 8080 → 80 for nginx). Cloud VMs use security groups and public IPs for the same purpose.

## Exercise D — Packages
- **Install/remove result:**

  ```text
  $ sudo apt install -y tree
  [sudo] password for vboxuser:
  Reading package lists... Done
  Building dependency tree... Done
  Reading state information... Done
  The following NEW packages will be installed:
    tree
  0 upgraded, 1 newly installed, 0 to remove and 69 not upgraded.
  Need to get 46.2 kB of archives.
  After this operation, 160 kB of additional disk space will be used.
  Get:1 http://ports.ubuntu.com/ubuntu-ports noble-updates/universe arm64 tree arm64 2.1.1-2ubuntu3.24.04.2 [46.2 kB]
  Fetched 46.2 kB in 1s (42.1 kB/s)
  Selecting previously unselected package tree.
  (Reading database ... 134521 files and directories currently installed.)
  Preparing to unpack .../tree_2.1.1-2ubuntu3.24.04.2_arm64.deb ...
  Unpacking tree (2.1.1-2ubuntu3.24.04.2) ...
  Setting up tree (2.1.1-2ubuntu3.24.04.2) ...
  Processing triggers for man-db (2.12.0-4build2) ...
  Scanning processes...
  Scanning candidates...
  Scanning processor microcode...
  Scanning linux images...

  Pending kernel upgrade!
  Running kernel version:
    6.8.0-149-generic
  Diagnostics:
    The currently running kernel version is not the expected kernel version 6.8.0-151-generic.

  Restarting the system to load the new kernel will not be handled automatically, so you should consider rebooting.

  The processor microcode seems to be up-to-date.

  Restarting services...

  Service restarts being deferred:
   /etc/needrestart/restart.d/dbus.service
   systemctl restart unattended-upgrades.service

  No containers need to be restarted.

  User sessions running outdated binaries:
   vboxuser @ session #5: sshd[1130]

  No VM guests are running outdated hypervisor (qemu) binaries on this host.

  $ sudo apt remove -y tree
  Reading package lists... Done
  Building dependency tree... Done
  Reading state information... Done
  The following packages will be REMOVED:
    tree
  0 upgraded, 0 newly installed, 1 to remove and 69 not upgraded.
  After this operation, 160 kB disk space will be freed.
  (Reading database ... 134528 files and directories currently installed.)
  Removing tree (2.1.1-2ubuntu3.24.04.2) ...
  Processing triggers for man-db (2.12.0-4build2) ...

  $ tree --version
  Command 'tree' not found, but can be installed with:
  sudo apt install tree
  ```

  **Result:**
  - **Install:** `tree` version `2.1.1-2ubuntu3.24.04.2` was downloaded as an **arm64** package from `ports.ubuntu.com`, Ubuntu's repository for non-x86 architectures like my M2 VM. It used 160 kB of disk space.
  - **Remove:** `apt remove` deleted the package and freed the same 160 kB. Running `tree --version` afterwards gives `Command 'tree' not found`, which proves it was removed.
  - **Extra observation:** after the install, `needrestart` warned about a **pending kernel upgrade**. The VM is running kernel `6.8.0-149` but `6.8.0-151` is installed, so a reboot (`sudo reboot`) is needed to load it. It also reported `69 not upgraded` packages, which `sudo apt upgrade` would install.

- **Difference between apt update and apt upgrade:**
  - `sudo apt update` only **refreshes the package list**: it downloads the latest catalogue of available packages and versions from the repositories. Nothing is installed or changed.
  - `sudo apt upgrade` **installs the newer versions** of packages that are already installed, based on that list.
  - So you run `update` first, then `upgrade`: `sudo apt update && sudo apt upgrade -y`.

## Reflection
- **Most difficult part:** Networking between my Mac and the VM. I first had to learn that the M2 needs the ARM64 Ubuntu ISO. Later, Chrome showed "site can't be reached" even though nginx was running. Using `VBoxManage showvminfo` showed that my port-forward rule for port 8080 had never been saved. I added it with `VBoxManage controlvm ... natpf1` and the page loaded.
- **One thing I can now do independently:** Set up secure SSH access to a Linux server: generate an ed25519 key pair, install the public key, set key permissions, connect with `ssh -i`, and disable password login.
- **One question I still have:** How is this setup done on a real cloud VM? For example, how do security groups and a public IP replace VirtualBox port forwarding, and how do teams manage SSH keys for many servers and users?

