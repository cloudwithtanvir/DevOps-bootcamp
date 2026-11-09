---
title: "Module Overview:"
---

### Module Overview:

This module covers essential Linux skills for DevOps beginners, including basic commands, file system navigation, text editing, process management, networking, and package management.

---

### 1. Basic Commands

### Introduction to Commonly Used Commands:

- **Navigation and Directory Management:**
    - `pwd`: Print working directory.
    - `ls`: List directory contents.
    - `cd`: Change directory.
    - `mkdir`: Create a new directory.
    - `rmdir`: Remove a directory.
    - `cp`: Copy files or directories.
    - `mv`: Move or rename files or directories.
    - `rm`: Remove files or directories.
- **File Management:**
    - `touch`: Create an empty file or update the timestamp of a file.
    - `cat`: Concatenate and display file content.
    - `more`, `less`: View file content one page at a time.
    - `head`, `tail`: Display the beginning or end of a file.
    - `nano`, `vim`: Text editors for editing file content.
- **File Search and Permissions:**
    - `find`: Search for files in a directory hierarchy.
    - `grep`: Search for patterns within files.
    - `chmod`: Change file modes or access permissions.
    - `chown`: Change file owner and group.

---

### 2. File System

### Understanding Linux File System Hierarchy:

- **Root Directory (`/`):** The base of the Linux file system.
- **Common Directories:**
    - `/bin`: Essential command binaries.
    - `/sbin`: System binaries.
    - `/etc`: Configuration files.
    - `/home`: User home directories.
    - `/var`: Variable files like logs.
    - `/usr`: User binaries and program data.
    - `/tmp`: Temporary files.

### Permissions Management:

Linux permissions control how the file's owner, members of its group, and other users can access files and directories.

- **View permissions:** Run `ls -l`. For example, `-rw-r--r--` describes a regular file; the first character is the file type, followed by three permission triplets for owner, group, and others. A `d` in the first position indicates a directory.
- **Permission types:** Read (`r`), write (`w`), and execute (`x`). A hyphen (`-`) means that permission is not granted. For a regular file, these allow reading its contents, changing its contents, and running it as a program or script, respectively.
- **User classes:** `u` is the owner, `g` is the owning group, `o` is others, and `a` means all classes. Permission checks use the applicable class: owner permissions take precedence, then group permissions, then others.
- **Directory permissions:** Read allows listing directory entries; write allows creating and removing entries (normally in combination with execute); execute allows searching/traversing the directory, such as accessing entries by name or using `cd`. Directory permissions also depend on permissions on parent directories.
- **Numeric (octal) mode:** `r=4`, `w=2`, and `x=1`; add the values in each triplet. For example, `755` means owner `rwx` (4+2+1), group `r-x` (4+0+1), and others `r-x` (4+0+1). `644` means owner `rw-`, group `r--`, and others `r--`.
- **Change permissions:** `chmod 755 script.sh` sets numeric permissions. Symbolic examples: `chmod ug+rwx example.txt` grants read, write, and execute to owner and group; `chmod o+r example.txt` grants read to others. Use `+` to add, `-` to remove, and `=` to set permissions.
- **Change ownership:** `chown user file` changes the owner; `chgrp group file` changes the group. These operations may require elevated privileges.
- **Special permissions:** Setuid (SUID) can make an executable run with the file owner's effective user ID; setgid (SGID) can make an executable run with the file's group ID and causes new entries in a directory to inherit its group; the sticky bit on a directory limits removal of entries, typically allowing only the entry's owner, directory owner, or a privileged user to remove them. Use special bits carefully and only when needed.
- **Further reading:** [Linux file permissions explained](https://www.redhat.com/en/blog/linux-file-permissions-explained)

### Special Files (/dev, /proc, /sys):

- **/dev:** Device files representing hardware devices.
- **/proc:** Virtual filesystem providing process and system information.
- **/sys:** Interface to kernel data structures.

---

### 3. Text Editors

### Proficiency with Command-Line Text Editors:

- **Nano:**
    - Easy-to-use text editor.
    - Basic commands: `Ctrl+O` (write out/save), `Ctrl+X` (exit).
- **Vim:**
    - More powerful but complex editor.
    - Modes: Normal, Insert, Visual, Command-line.
    - Basic commands: `i` (insert mode), `:w` (write/save), `:q` (quit).

---

### 4. Processes

### Managing Processes and System Resources:

- **Process Commands:**
    - `ps`: Display current processes.
    - `top`: Display live system processes.
    - `htop`: Enhanced version of `top`.
    - `kill`: Terminate a process by PID.
    - `pkill`: Terminate processes by name.
    - `nice`/`renice`: Change process priority.
- **Background and Foreground Processes:**
    - `&`: Run a command in the background.
    - `fg`: Bring a background process to the foreground.
    - `bg`: Resume a stopped background process.

---

### 5. Networking

### Basic Networking Commands and Configuration:

- **Network Configuration:**
    - `ip addr`, `ip route`: Show interfaces, IP addresses and routes (the modern replacement for `ifconfig`).
    - `ifconfig`: Older tool, still seen in tutorials; part of the deprecated `net-tools` package.
    - `ping`: Test network connectivity.
    - `ss -tulpn`: Show listening ports and the processes using them (the modern replacement for `netstat`).
    - `dig`, `nslookup`: Query DNS records.
    - `curl -I <url>`: Check that a web server responds and inspect its HTTP headers.
- **Network Management:**
    - `scp`: Secure copy files between hosts.
    - `ssh`: Securely connect to remote machines.
    - `ftp`, `sftp`: Transfer files over network.

---

### 6. Package Management

### Introduction to Package Managers:

- **Debian-based Systems (e.g., Ubuntu):**
    - `apt-get`, `apt`: Install, update, and remove packages (e.g., `apt-get update`, `apt-get install package_name`).
    - `dpkg`: Install, remove, and provide information about .deb packages.
- **Red Hat-based Systems (e.g., CentOS, Fedora):**
    - `yum`, `dnf`: Install, update, and remove packages (e.g., `yum install package_name`).
    - `rpm`: Install, remove, and provide information about .rpm packages.
- **Common Commands:**
    - `install`: Install a package.
    - `update`: Update package lists or upgrade installed packages.
    - `remove` or `uninstall`: Remove a package.
    - `search`: Search for a package.

---

This detailed content should provide a comprehensive foundation for beginners to understand and start using Linux in a DevOps context. Each section can be supplemented with hands-on exercises and practice.
