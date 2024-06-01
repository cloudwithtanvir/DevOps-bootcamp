### Task Description:
You are tasked with containerizing a simple Node.js web application using Docker. The application should serve a static HTML page with some basic CSS styling.

### Requirements:
1. Create a simple Node.js web application that serves a static HTML page.
2. The HTML page should contain a welcome message and some basic CSS styling.
3. Use Docker to containerize the Node.js application.
4. Ensure the Docker container exposes the application on port 8080.
5. Write a README.md file with instructions on how to build and run the Docker container.

### Deliverables:
1. Node.js application code (`app/index.js`, `app/index.html`, `app/style.css`).
2. Dockerfile.
3. README.md file with instructions.

### Evaluation Criteria:
1. Completion of the task based on requirements.
2. Clarity and correctness of instructions in the README.md file.
3. Proper usage of Docker best practices.

### Bonus Points (Optional):
- Use a multi-stage Docker build to optimize the Docker image size.
- Include screenshots of the application running in the README.md file.

### Submission:
- Submit a zip file containing all necessary files (Node.js application code, Dockerfile, and README.md) or a link to a GitHub repository with the code.

### Example README.md File:
```
# Docker Beginner Demo Task

This repository contains a simple Node.js web application that serves a static HTML page with some basic CSS styling, containerized using Docker.

### Prerequisites:
- Docker installed on your machine

### How to Build and Run the Docker Container:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Build the Docker image using the following command:
    ```
    docker build -t my-node-app .
    ```
4. Once the image is built, run the Docker container with the following command:
    ```
    docker run -d -p 8080:8080 my-node-app
    ```
5. Access the application by opening a web browser and navigating to http://localhost:8080.

### Screenshots:
[Insert screenshots here if available]

### Additional Notes:
- The Dockerfile uses a multi-stage build to optimize the Docker image size.
```

This task provides a hands-on experience with Docker basics while also integrating it with a simple Node.js application. It's suitable for beginners and offers opportunities for further exploration and optimization.