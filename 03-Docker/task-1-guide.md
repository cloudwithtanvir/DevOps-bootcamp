---
title: "Task: Create and Dockerize Your Favorite Tech Stack Project"
---

### Task: Create and Dockerize Your Favorite Tech Stack Project

#### Prerequisites:
1. Ensure Docker is installed on your machine.
2. Ensure you have any other necessary prerequisites installed for your chosen stack (e.g., Node.js, Python, etc.).
3. Ensure you have a GitHub account.

#### Steps:

1. **Install Docker**:
   - **For Windows**:
     1. Download Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop).
     2. Run the installer and follow the installation instructions.
   - **For macOS**:
     1. Download Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop).
     2. Drag Docker to your Applications folder and launch it.
   - **For Linux**:
     1. Follow the official installation guide for your specific distribution from the [Docker documentation](https://docs.docker.com/engine/install/).

2. **Choose Your Stack**:
   - Decide on the tech stack you want to use (e.g., Node.js, Django, Flask, Ruby on Rails, etc.).

3. **Set Up Your Project**:
   - Follow the setup instructions for your chosen stack. Here are examples for two popular stacks:

   **Example 1: Node.js with Express**
   - Create a project directory and navigate into it:
     ```bash
     mkdir my-nodejs-app
     cd my-nodejs-app
     ```
   - Initialize a new Node.js project:
     ```bash
     npm init -y
     ```
   - Install Express.js:
     ```bash
     npm install express
     ```
   - Create an `index.js` file and add the following code:
     ```javascript
     const express = require('express');
     const app = express();
     const PORT = 3000;

     app.get('/', (req, res) => {
       res.send('Hello World!');
     });

     app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```
   - Update `package.json` to include a start script:
     ```json
     "scripts": {
       "start": "node index.js"
     }
     ```

   **Example 2: Django**
   - Create a project directory and navigate into it:
     ```bash
     mkdir my-django-app
     cd my-django-app
     ```
   - Create a virtual environment and activate it:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install Django:
     ```bash
     pip install django
     ```
   - Start a new Django project:
     ```bash
     django-admin startproject myproject .
     ```
   - Run the development server to ensure it's working:
     ```bash
     python manage.py runserver
     ```

4. **Create a Dockerfile**:
   - In the root of your project directory, create a `Dockerfile` and add the appropriate content based on your stack.

   **Example Dockerfile for Node.js**:
   ```dockerfile
   # Use a current LTS Node.js image (small Alpine variant)
   FROM node:24-alpine

   # Create and change to the app directory
   WORKDIR /usr/src/app

   # Copy dependency manifests first so this layer is cached
   COPY package*.json ./

   # Install only production dependencies, exactly as locked
   RUN npm ci --omit=dev

   # Copy the local code to the container image
   COPY . .

   # Run as the built-in non-root user instead of root
   USER node

   # Expose the port the app runs on
   EXPOSE 3000

   # Run the web service on container startup
   CMD [ "node", "index.js" ]
   ```

   **Example Dockerfile for Django**:
   ```dockerfile
   # Use a current, slim Python image
   FROM python:3.13-slim

   # Set environment variables (KEY=value form; the old "KEY value" form is deprecated)
   ENV PYTHONDONTWRITEBYTECODE=1 \
       PYTHONUNBUFFERED=1

   # Create and change to the app directory
   WORKDIR /usr/src/app

   # Install dependencies (no pip cache keeps the image small)
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   # Copy the local code to the container image
   COPY . .

   # Create and switch to a non-root user
   RUN useradd --create-home appuser
   USER appuser

   # Expose the port the app runs on
   EXPOSE 8000

   # Development server for this task; in production use gunicorn, e.g.
   # CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
   CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
   ```

5. **Create a `.dockerignore` File**:
   - In the root of your project directory, create a `.dockerignore` file and add the appropriate content.

   **Example `.dockerignore` for Node.js**:
   ```plaintext
   node_modules
   npm-debug.log
   .git
   .env
   ```

   **Example `.dockerignore` for Django**:
   ```plaintext
   __pycache__
   *.pyc
   .env
   venv
   ```

6. **Add a README.md File**:
   - In the root of your project directory, create a `README.md` file and add the following content:
     ```markdown
     # Project Name

     This is a simple application running inside a Docker container.

     ## Prerequisites

     - Docker installed on your machine.

     ## Running the application

     1. Build the Docker image:
        ```bash
        docker build -t my-app .
        ```

     2. Run the Docker container:
        ```bash
        docker run -p 3000:3000 my-app
        ```

     3. Open your browser and go to `http://localhost:3000` (or the appropriate port) to see the application running.
     ```

7. **Push the Project to GitHub**:
   - Create a new repository on GitHub named appropriately for your project.
   - Initialize a git repository, add files, commit, and push to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/your-username/my-project.git
     git push -u origin main
     ```

8. **Build and Run the Docker Container**:
   - Build the Docker image:
     ```bash
     docker build -t my-app .
     ```
   - Run the Docker container:
     ```bash
     docker run -p 3000:3000 my-app
     ```
   - Open your browser and navigate to `http://localhost:3000` (or the appropriate port) to see the application running.

### Example:
To provide a complete example, here's a summary of the steps with a Node.js application.

1. **Create a Node.js Project**:
   ```bash
   mkdir my-nodejs-app
   cd my-nodejs-app
   npm init -y
   npm install express
   ```

2. **Create `index.js`**:
   ```javascript
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.get('/', (req, res) => {
     res.send('Hello World!');
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

3. **Update `package.json`**:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```

4. **Create Dockerfile**:
   ```dockerfile
   FROM node:24-alpine
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm ci --omit=dev
   COPY . .
   USER node
   EXPOSE 3000
   CMD [ "node", "index.js" ]
   ```

5. **Create `.dockerignore`**:
   ```plaintext
   node_modules
   npm-debug.log
   .git
   .env
   ```

6. **Create `README.md`**:
   ```markdown
   # My Node.js App

   This is a simple Node.js application running inside a Docker container.

   ## Prerequisites

   - Docker installed on your machine.

   ## Running the application

   1. Build the Docker image:
      ```bash
      docker build -t my-nodejs-app .
      ```

   2. Run the Docker container:
      ```bash
      docker run -p 3000:3000 my-nodejs-app
      ```

   3. Open your browser and go to `http://localhost:3000` to see the application running.
   ```

7. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/my-nodejs-app.git
   git push -u origin main
   ```

8. **Build and Run Docker Container**:
   ```bash
   docker build -t my-nodejs-app .
   docker run -p 3000:3000 my-nodejs-app
   ```

By following these instructions, you can pick any stack you love, Dockerize it, and push the project to GitHub. The provided Node.js example illustrates the general steps you would follow for any tech stack.
