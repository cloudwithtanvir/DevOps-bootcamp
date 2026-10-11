### Exercise 1: File System Navigation and File Management

1. Navigate to the `/var/log` directory.
    ```bash
    cd /var/log
    ```
2. List all files and directories in the `/var/log` directory.
    ```bash
    ls -la
    ```
3. Create a new directory named `test_logs` within `/var/log`.
    ```bash
    sudo mkdir test_logs
    ```
4. Navigate into the `test_logs` directory.
    ```bash
    cd test_logs
    ```
5. Create an empty file named `test.log`.
    ```bash
    sudo touch test.log
    ```
6. Display the contents of the `test.log` file.
    ```bash
    cat test.log
    ```
7. Edit the `test.log` file and add a new line of text.
    ```bash
    sudo nano test.log
    ```
    *(Add a new line of text in the nano editor)*
8. Save and exit the text editor.
    ```bash
    # In nano, press Ctrl+O to save, then Ctrl+X to exit.
    ```
[![Solution GIF](https://i.ibb.co/dcJnjWY/output1.gif)](https://ibb.co/LPh4Yk7)

### Exercise 2: Process Management

1. Display a list of currently running processes.
    ```bash
    ps aux
    ```
2. Identify the PID of the process named `nginx` (assuming it's installed and running).
    ```bash
    ps aux | grep nginx
    ```
3. Terminate the `nginx` process using its PID.
    ```bash
    sudo kill <nginx_pid>
    ```
4. Start the `nginx` process again.
    ```bash
    sudo systemctl start nginx
    ```
[![Solution GIF](https://i.ibb.co/pPhfRx6/output2.gif)](https://ibb.co/vBX3QHC)

### Exercise 3: Networking

1. Check the network configuration of your system.
    ```bash
    ifconfig
    ```
2. Test the connectivity to a remote server by pinging its IP address.
    ```bash
    ping <remote_ip_address>
    ```
3. Use `ssh` to securely connect to a remote machine (replace `remote_user` and `remote_host` with appropriate values).
    ```bash
    ssh remote_user@remote_host
    ```
4. Transfer a file from your local machine to the remote machine using `scp`.
    ```bash
    scp /path/to/local/file remote_user@remote_host:/path/to/destination
    ```
[![Solution GIF](https://i.ibb.co/rdYCFPW/output3.gif)](https://ibb.co/2ZxDW2b)

### Exercise 4: Package Management

1. Update the package lists on your system.
    ```bash
    sudo apt update
    ```
2. Install the `htop` package using the appropriate package manager for your Linux distribution.
    ```bash
    sudo apt install htop
    ```
3. Remove the `htop` package from your system.
    ```bash
    sudo apt remove htop
    ```
[![Solution GIF](https://i.ibb.co/Fww1X9v/output4.gif)](https://ibb.co/7WWDQHc)