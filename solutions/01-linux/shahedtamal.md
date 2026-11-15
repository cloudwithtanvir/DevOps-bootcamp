# Linux Fundamentals Lab — Shahed Alam

## Environment
- Ubuntu version: Ubuntu 24.04.5 LTS (kernel 6.8.0-147-generic, aarch64)
- VM type: Multipass (local Ubuntu VM on a MacBook Air with Apple Silicon).
  VirtualBox does not run well on Apple Silicon and WSL2 is Windows-only, so
  I used Multipass. It gives the same Ubuntu 24.04 server environment.
- VM resources: 1 CPU, 1 GB RAM, 5 GB disk (Multipass default)
- Date completed: 2026-11-15

## SSH connection
- Connection successful: Yes
- Problem faced and how I fixed it: see "Problems and fixes" below

I already had an ED25519 key pair on my Mac (`~/.ssh/id_ed25519`), so I did
not create a new one (I answered `n` when `ssh-keygen` asked to overwrite).
I added my public key to the VM's `authorized_keys`:

```
cat ~/.ssh/id_ed25519.pub | multipass exec devops -- tee -a /home/ubuntu/.ssh/authorized_keys
```

Then I connected from my Mac over SSH. Because `~/.ssh/id_ed25519` is the
default key, I did not need `-i` (`ssh -i ~/.ssh/id_ed25519 ...` does the
same thing):

```
ssh ubuntu@192.168.252.2
```

Host key verification: before typing `yes`, I checked the VM's host key
fingerprint through Multipass (my trusted console). Both fingerprints match:

```
SSH prompt:  SHA256:2uSD2T7tptN0bMe9epnF/XGZ0uQNCf47UyNhnb4jeRk
$ multipass exec devops -- ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
256 SHA256:2uSD2T7tptN0bMe9epnF/XGZ0uQNCf47UyNhnb4jeRk root@devops (ED25519)
```

Success check output (after logging in over SSH):

```
ubuntu@devops:~$ whoami
ubuntu
ubuntu@devops:~$ hostname
devops
ubuntu@devops:~$ hostname -I
192.168.252.2
ubuntu@devops:~$ . /etc/os-release && echo "$PRETTY_NAME"
Ubuntu 24.04.5 LTS
```

Problems and fixes:
- I took a long time (~30 min) to verify the fingerprint. After I typed
  `yes`, I got `Connection closed by 192.168.252.2 port 22`, because the SSH
  server only waits a short time for a login (LoginGraceTime). I ran `ssh`
  again and got in. This time there was no prompt, because the host key was
  already saved in `known_hosts`.
- I ran `multipass list` inside the VM and got `command not found`. I learned
  that `multipass` is a tool on my Mac, not inside the VM. I typed `exit` and
  ran it on the Mac.
- My Mac does not have `/etc/os-release`, because macOS is not Linux (its
  kernel is Darwin). So I created an Ubuntu VM with Multipass.
- I typed the wrong password while installing Multipass (`Sorry, try again`)
  and then entered the correct one.
- I got stuck in the terminal twice: once after running `cat` with no file
  name, and once after leaving a quote (`"`) open (`dquote>`). I used
  `Ctrl + C` to get out.

## Exercise A — Files and permissions
- Commands used: `pwd`, `ls -la`, `mkdir -p`, `cd`, `touch`, `echo >`, `cat`, `ls -l`, `stat`
- Evidence/output:

```
ubuntu@devops:~$ mkdir -p ~/devops-lab/logs
ubuntu@devops:~$ cd ~/devops-lab/logs
ubuntu@devops:~/devops-lab/logs$ pwd
/home/ubuntu/devops-lab/logs
ubuntu@devops:~/devops-lab/logs$ touch app.log
ubuntu@devops:~/devops-lab/logs$ echo "Bootcamp Linux lab started" > app.log
ubuntu@devops:~/devops-lab/logs$ cat app.log
Bootcamp Linux lab started
ubuntu@devops:~/devops-lab/logs$ ls -l app.log
-rw-rw-r-- 1 ubuntu ubuntu 27 Nov 14 19:08 app.log
ubuntu@devops:~/devops-lab/logs$ stat app.log
  File: app.log
  Size: 27        Blocks: 8          IO Block: 4096   regular file
Device: 8,1 Inode: 262198      Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/  ubuntu)   Gid: ( 1000/  ubuntu)
Access: 2026-11-14 19:08:24.910315552 +0900
Modify: 2026-11-14 19:08:12.440044057 +0900
Change: 2026-11-14 19:08:12.440044057 +0900
 Birth: 2026-11-14 01:49:29.894225580 +0900
```

- What I learned about sudo and ownership:

**Why didn't these commands need `sudo`?**
I did everything inside my own home directory, `/home/ubuntu`. The owner of
this directory is the `ubuntu` user (me), so I do not need admin permission
to create, write or read files there. `sudo` is only needed when I touch
files owned by another user, such as `root`, for example in `/var/log` or
`/etc`.

**What is the difference between `ls -l` and `stat`?**
- `ls -l` gives a short one-line summary: permissions (`-rw-rw-r--`), owner,
  group, size (27 bytes) and the last modification time.
- `stat` gives full details: permissions as a number (`0664`), user and group
  IDs (`1000`), the inode number, and four different timestamps:
  - **Birth:** when the file was created (`touch`, 01:49)
  - **Modify:** when the content last changed (`echo`, 19:08:12)
  - **Change:** when the content or metadata (permissions, owner) last
    changed (19:08:12)
  - **Access:** when the file was last read (`cat`, 19:08:24)

What I learned about ownership: the user who creates a file becomes its
owner (`ubuntu ubuntu`). Permission `664` means the owner and the group can
read and write, and everyone else can only read. The size is 27 bytes
because the text has 26 characters plus a newline at the end.

## Exercise B — Processes and nginx
- nginx status before and after: `active (running)` → `inactive` after `stop` → active again after `start`
- HTTP response: `curl: (7) Couldn't connect` while stopped, `HTTP/1.1 200 OK` after starting
- Difference between kill and kill -9: see the end of this section

**Install and status (before stopping):**

```
ubuntu@devops:~$ sudo apt update
ubuntu@devops:~$ sudo apt install -y nginx
ubuntu@devops:~$ systemctl status nginx --no-pager
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Sat 2026-11-14 23:00:45 JST; 16h ago
   Main PID: 21392 (nginx)
      Tasks: 2 (limit: 1055)
     Memory: 1.7M (peak: 3.6M)
     CGroup: /system.slice/nginx.service
             ├─21392 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             └─21393 "nginx: worker process"

ubuntu@devops:~$ pgrep -a nginx
21392 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
21393 nginx: worker process

ubuntu@devops:~$ ps aux | grep '[n]ginx'
root       21392  0.0  0.6  10504  6656 ?  S  Nov14  0:00 nginx: master process ...
www-data   21393  0.0  0.4  12068  4244 ?  S  Nov14  0:00 nginx: worker process
```

The master process runs as `root` (so it can open port 80), and the worker
runs as `www-data`, a user with fewer permissions. If the worker is ever
attacked, the damage is limited.

**After stopping:**

```
ubuntu@devops:~$ sudo systemctl stop nginx
ubuntu@devops:~$ systemctl is-active nginx
inactive
ubuntu@devops:~$ curl -I http://localhost
curl: (7) Failed to connect to localhost port 80 after 0 ms: Couldn't connect to server
```

With the service stopped, nothing was listening on port 80, so `curl` could
not connect. When a website is down, the first thing to check is whether the
service is running, with `systemctl is-active`.

**After starting again:**

```
ubuntu@devops:~$ sudo systemctl start nginx
ubuntu@devops:~$ curl -I http://localhost
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Date: Sun, 15 Nov 2026 08:29:53 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
```

`200 OK` means nginx is running again and serving the page correctly.

**Why is `kill` (SIGTERM) preferred over `kill -9` (SIGKILL)?**
`kill` politely asks a process to stop. The process gets a chance to finish
its work, save files and close connections before it exits. `kill -9` ends
the process immediately without any chance to clean up, which can lose data
or corrupt files. So I should try `kill` first and use `kill -9` only if the
process does not respond.

**Bonus: stopping my own process with `kill`:**

```
ubuntu@devops:~/devops-lab/logs$ sleep 600 &
ubuntu@devops:~/devops-lab/logs$ jobs -l
[1]+ 23850 Running                 sleep 600 &
ubuntu@devops:~/devops-lab/logs$ kill 23850
[1]+  Terminated              sleep 600
ubuntu@devops:~/devops-lab/logs$ pgrep -a sleep || echo "No sleep process found"
No sleep process found
```

I used the PID (`23850`) so that only my `sleep` process was stopped.
`kill` sent SIGTERM and the process exited cleanly (`Terminated`).

## Exercise C — Networking
- Private interface: `enp0s1` (`192.168.252.2/24`)
- Default gateway: `192.168.252.1`
- Ping and DNS result: ping to `1.1.1.1` works (0% loss); DNS for `example.com` works
- What I learned: see the end of this section

```
ubuntu@devops:~$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
2: enp0s1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:ad:27:06 brd ff:ff:ff:ff:ff:ff
    inet 192.168.252.2/24 metric 100 brd 192.168.252.255 scope global dynamic enp0s1

ubuntu@devops:~$ ip route
default via 192.168.252.1 dev enp0s1 proto dhcp src 192.168.252.2 metric 100
192.168.252.0/24 dev enp0s1 proto kernel scope link src 192.168.252.2 metric 100
192.168.252.1 dev enp0s1 proto dhcp scope link src 192.168.252.2 metric 100

ubuntu@devops:~$ ss -tulpn
Netid  State   Local Address:Port        Peer Address:Port
udp    UNCONN  127.0.0.54:53             0.0.0.0:*
udp    UNCONN  127.0.0.53%lo:53          0.0.0.0:*
udp    UNCONN  192.168.252.2%enp0s1:68   0.0.0.0:*
tcp    LISTEN  127.0.0.54:53             0.0.0.0:*
tcp    LISTEN  0.0.0.0:22                0.0.0.0:*
tcp    LISTEN  0.0.0.0:80                0.0.0.0:*
tcp    LISTEN  127.0.0.53%lo:53          0.0.0.0:*
tcp    LISTEN  [::]:22                   [::]:*
tcp    LISTEN  [::]:80                   [::]:*

ubuntu@devops:~$ ss -tn
State  Local Address:Port    Peer Address:Port
ESTAB  192.168.252.2:22      192.168.252.1:54784
ESTAB  192.168.252.2:22      192.168.252.1:49929

ubuntu@devops:~$ ping -c 4 1.1.1.1
64 bytes from 1.1.1.1: icmp_seq=1 ttl=54 time=16.1 ms
64 bytes from 1.1.1.1: icmp_seq=2 ttl=54 time=17.3 ms
64 bytes from 1.1.1.1: icmp_seq=3 ttl=54 time=14.1 ms
64 bytes from 1.1.1.1: icmp_seq=4 ttl=54 time=17.7 ms
--- 1.1.1.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms

ubuntu@devops:~$ getent hosts example.com
2606:4700:10::6814:179a example.com
2606:4700:10::ac42:93f3 example.com

ubuntu@devops:~$ sudo apt install -y dnsutils
ubuntu@devops:~$ dig example.com
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 60645
;; QUESTION SECTION:
;example.com.                   IN      A
;; ANSWER SECTION:
example.com.            120     IN      A       104.20.23.154
example.com.            120     IN      A       172.66.147.243
;; Query time: 18 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
```

**1. Which interface has the VM's private IP?**
`enp0s1`, with the private IP `192.168.252.2/24`. (`lo` is the loopback
interface, `127.0.0.1`, which the VM uses to talk to itself.)

**2. What is the default gateway?**
`192.168.252.1` (from `default via 192.168.252.1` in `ip route`). In my
setup this is my Mac, which Multipass uses as the router for the VM.

**3. Does ping to the IP work?**
Yes. 4 packets sent, 4 received, 0% packet loss, average about 16 ms. So
the VM can reach the internet (connectivity is OK).

**4. Does DNS resolution for example.com work?**
Yes. `getent hosts` returned two IPv6 addresses and `dig` returned two IPv4
addresses (`104.20.23.154`, `172.66.147.243`) with `status: NOERROR`. The
answer came from the local resolver `127.0.0.53`, which is the same port 53
listener shown in `ss -tulpn`.

**5. What is the difference between a listening socket and an established connection?**
A listening socket (`LISTEN`) is a port that is open and waiting for
someone to connect, like nginx on port 80 and SSH on port 22. Its peer
address is `0.0.0.0:*` because anyone may connect. An established
connection (`ESTAB`) is an active conversation with one specific client.
In `ss -tn` I saw two established SSH connections from my Mac
(`192.168.252.1`), one for each terminal tab, both on the same listening
port 22.

**What I learned:**
- `0.0.0.0:80` means nginx accepts connections from any interface, so I can
  open it from my Mac. `127.0.0.53:53` only accepts connections from inside
  the VM.
- How to tell problems apart: if ping to an IP works but a name does not
  resolve, it is a DNS problem. If ping to an IP fails, it is a
  connectivity problem. If both work but the site still does not load, it is
  a service or firewall problem.

## Exercise D — Packages
- Install/remove result: `htop` was already installed in the Ubuntu server
  image. `apt remove` removed it (and the `ubuntu-server` metapackage), and
  afterwards `htop` was `not found`.
- Difference between apt update and apt upgrade: see below

```
ubuntu@devops:~$ sudo apt update
Hit:1 http://ports.ubuntu.com/ubuntu-ports noble InRelease
Hit:2 http://ports.ubuntu.com/ubuntu-ports noble-updates InRelease
Hit:3 http://ports.ubuntu.com/ubuntu-ports noble-backports InRelease
Hit:4 http://ports.ubuntu.com/ubuntu-ports noble-security InRelease
Reading package lists... Done
12 packages can be upgraded. Run 'apt list --upgradable' to see them.

ubuntu@devops:~$ sudo apt install -y htop
htop is already the newest version (3.3.0-4build1).
htop set to manually installed.
0 upgraded, 0 newly installed, 0 to remove and 12 not upgraded.

ubuntu@devops:~$ sudo apt remove -y htop
The following package was automatically installed and is no longer required:
  libnl-genl-3-200
Use 'sudo apt autoremove' to remove it.
The following packages will be REMOVED:
  htop ubuntu-server
0 upgraded, 0 newly installed, 2 to remove and 12 not upgraded.
Removing ubuntu-server (1.539.2) ...
Removing htop (3.3.0-4build1) ...

ubuntu@devops:~$ htop
Command 'htop' not found, but can be installed with:
sudo apt install htop
```

**What is the difference between `apt update` and `apt upgrade`?**
`apt update` only downloads the latest list of available packages from the
Ubuntu repositories. It does not install or change any software. In my
output it told me that 12 packages can be upgraded. `apt upgrade` actually
installs the newer versions of the packages that are already installed. So
`update` refreshes the list, and `upgrade` uses that list to update the
software.

**What I learned:**
- `htop` was already part of the Ubuntu server image, so `apt install` did
  nothing except mark it as "manually installed".
- Removing one package can remove others. `ubuntu-server` is a
  metapackage that depends on `htop`, so apt removed it too. I should read
  the "will be REMOVED" list before using `-y` on a real server.
- `libnl-genl-3-200` was left behind as an unused dependency. `apt autoremove`
  would clean it up.

## Final evidence (Step 7)

Output of the verification block from the lab:

```
=== HOST ===
devops
ubuntu
=== OS ===
Ubuntu 24.04.5 LTS
=== LAB FILE ===
Bootcamp Linux lab started
-rw-rw-r-- 1 ubuntu ubuntu 27 Nov 14 19:08 /home/ubuntu/devops-lab/logs/app.log
=== NGINX ===
active
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Date: Sun, 15 Nov 2026 10:05:42 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
=== NETWORK ===
default via 192.168.252.1 dev enp0s1 proto dhcp src 192.168.252.2 metric 100
192.168.252.0/24 dev enp0s1 proto kernel scope link src 192.168.252.2 metric 100
192.168.252.1 dev enp0s1 proto dhcp scope link src 192.168.252.2 metric 100
2606:4700:10::6814:179a example.com
2606:4700:10::ac42:93f3 example.com
=== PACKAGE ===
```

The `=== PACKAGE ===` section is empty because `htop` has been removed, so
`dpkg -l htop` has nothing to show.

## Reflection
- **Hardest part:** Understanding the difference between macOS and Linux. At
  first I thought the Mac Terminal was Linux. When `uname -a` showed
  `Darwin`, I understood they use different kernels.
- **One skill I can now do on my own:** Create an Ubuntu VM with Multipass,
  connect to it over SSH with my key, and check which machine and user I am
  on with `whoami`, `hostname`, `os-release` and `uname -a`.
- **One open question:** When I connect to a real cloud server with a `.pem`
  key, what else should I do to keep it secure?
