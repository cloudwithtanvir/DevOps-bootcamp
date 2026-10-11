### Task: Linux Fundamentals Practice

### Objective:

The objective of this task is to reinforce the understanding of essential Linux commands, file system navigation, text editing, process management, networking, and package management covered in Module 2: Linux Fundamentals.

### Task Description:

You will be given a series of practical exercises to complete. These exercises are designed to simulate real-world scenarios encountered in a DevOps environment. Follow the instructions provided for each exercise and use the Linux commands and concepts learned in the module to complete the tasks.

### Before you start

- Use Ubuntu 22.04/24.04 (a VM, WSL on Windows, or a free-tier cloud VM).
- `/var/log` is owned by `root`, so steps that create or edit files there need `sudo` (for example `sudo mkdir`, `sudo touch`, `sudo nano`). Notice which commands need it and why.
- Install nginx first so Exercise 2 has something to manage: `sudo apt update && sudo apt install -y nginx`.

### Exercise 1: File System Navigation and File Management

1. Navigate to the `/var/log` directory.
2. List all files and directories in the `/var/log` directory.
3. Create a new directory named `test_logs` within `/var/log` (you will need `sudo`).
4. Navigate into the `test_logs` directory.
5. Create an empty file named `test.log` (again with `sudo`), then check its owner and permissions with `ls -l`.
6. Display the contents of the `test.log` file.
7. Edit the `test.log` file and add a new line of text.
8. Save and exit the text editor.

### Exercise 2: Process Management

1. Display a list of currently running processes (`ps aux`, `top` or `htop`).
2. Identify the PID of the `nginx` master process (`pgrep -a nginx` or `ps aux | grep nginx`).
3. Check the service status with `systemctl status nginx`.
4. Stop nginx the way you would on a real server: `sudo systemctl stop nginx`. Confirm the processes are gone.
5. Start it again with `sudo systemctl start nginx` and confirm it is serving with `curl -I http://localhost`.
6. Bonus: start a background process (`sleep 600 &`), find its PID, and terminate it with `kill <PID>`. Explain the difference between `kill` and `kill -9`.

### Exercise 3: Networking

1. Check the network configuration of your system (`ip addr` and `ip route`; `ifconfig` is deprecated on modern distributions).
2. Test the connectivity to a remote server by pinging its IP address, then resolve a domain name with `dig` or `nslookup`.
3. Use `ssh` to securely connect to a remote machine (replace `remote_user` and `remote_host` with appropriate values).
    
    ```
    ssh remote_user@remote_host
    
    ```
    
4. Transfer a file from your local machine to the remote machine using `scp`.
    
    ```
    scp /path/to/local/file remote_user@remote_host:/path/to/destination
    
    ```
    

### Exercise 4: Package Management

1. Update the package lists on your system (`sudo apt update`).
2. Install the `htop` package using the appropriate package manager for your Linux distribution.
3. Remove the `htop` package from your system.

### Submission:

Once you have completed all the exercises, write a summary of your experience and any challenges you encountered during the task. Include the commands you ran and their output (copy-pasted text is preferred over screenshots, as it is searchable).

Submit your file as `solutions/01-linux/<your-github-username>.md` by following [HOW-TO-SUBMIT.md](../HOW-TO-SUBMIT.md).

