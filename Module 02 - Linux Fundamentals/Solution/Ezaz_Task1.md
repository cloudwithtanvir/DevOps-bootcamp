# Solution 1: File System Navigation and File Management

1. **Navigate to the /var/log directory:**

   ```
   cd /var/log
   ```

2. **List all files and directories in the /var/log directory:**

   ```
   ls -ls
   ```

3. **Create a new directory named `test_logs` within /var/log:**

   ```
   sudo mkdir test_logs
   ```

4. **Navigate into the `test_logs` directory:**

   ```
   cd test_logs
   ```

5. **Create an empty file named `test.log`:**

   ```
   sudo touch test.log
   ```

6. **Display the contents of the `test.log` file:**

   ```
   cat test.log
   ```

7. **Edit the `test.log` file and add a new line of text:**
   ```
   sudo vi test.log
   ```
   Screenshot:

![Screenshot of Solution 1](https://i.ibb.co/JtP3x8y/Screenshot-2024-05-26-170509.png)

# Solution 2: Process Management

1. **Display a list of currently running processes:**

   ```
   ps aux
   ```

2. **Identify the PID of the process named nginx:**

   ```
   pgrep nginx
   ```

3. **Terminate the nginx process using its PID:**

   ```
   sudo pkill nginx
   ```

4. **Start the nginx process again:**
   ```
   sudo systemctl start nginx
   ```
   Screenshot:

![Screenshot of Solution 2](https://i.ibb.co/xs3Sp87/process.png)

# Solution 3: Networking

1.  **To Check Network configuration:**

    ```
    ifconfig
    ```

2.  **To test connectivity:**
    ```
    ping 8.8.8.8
    ```
    Screenshot:

![Screenshot of Solution 3](https://i.ibb.co/zNXQXyG/network-1.png)

# Solution 4: Package Management

1.  **To Update package list of system:**

    ```
    sudo apt update
    ```

2.  **To Install htop package:**

    ```
    sudo apt install htop
    ```

3.  **To Uninstall htop package:**
    ```
    sudo apt remove htop
    ```
    Screenshot:

![Screenshot of Solution 4](https://i.ibb.co/PCDmXGP/package-management.png)
