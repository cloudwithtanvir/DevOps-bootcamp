**Task: Dockerize an Application**

**Objective:** Dockerize an application based on your preferred stack to demonstrate containerization and deployment using Docker.

**Steps:**

1. **Choose Your Stack:** Select the programming language, framework, and any additional tools or libraries you prefer for your application.

2. **Develop Your Application:** Create a simple application using your chosen stack. It could be a web application, a REST API, or any other type of application you're comfortable with.

3. **Write a Dockerfile:** Create a Dockerfile to define the environment and dependencies needed to run your application within a Docker container. Ensure that you include all necessary configurations and instructions for building the image.

4. **Build the Docker Image:** Use the Dockerfile to build a Docker image for your application. Test the image locally to ensure it runs as expected within a container.

5. **Containerize Your Application:** Run your application as a Docker container using the Docker image you built. Verify that the containerized application behaves as expected and can be accessed from a web browser or any other client if applicable.

6. **Optimize Docker Configuration (Optional):** Fine-tune your Docker configuration for better performance, security, or scalability if needed. This could involve adjusting container resource limits, optimizing Dockerfile instructions, or implementing best practices for Docker deployment.

7. **Push to a Git Repository:** Once you're satisfied with your Dockerized application, push the Dockerfile and any other necessary files to a Git repository of your choice. Make sure to include clear instructions for building and running the Docker image in the repository's README file.

8. **Share the Repository Link:** Share the link to your Git repository containing the Dockerized application under the "solution" folder in a Markdown (.md) file named "repo_link.md".

**Deliverables:**

- Dockerfile: Defines the Docker image for your application.
- Source Code: Includes all the files and code necessary to build and run your application.
- README.md: Provides instructions for building and running the Docker image, as well as any other relevant information about your application.
- `.dockerignore`: Keeps `node_modules`, `.git`, `.env` and other unneeded files out of the image.
- Submission file: `solutions/03-docker/<your-github-username>.md` in this repository, containing the link to your project repository, the final image size, and one thing you changed to make the image smaller or more secure. Follow [HOW-TO-SUBMIT.md](../HOW-TO-SUBMIT.md).

**Bonus challenges:**

- Use a multi-stage build and reduce the image size by at least 50%.
- Run the container as a non-root user.
- Add a `compose.yaml` that runs your app together with a database, and start it with `docker compose up`.

Feel free to reach out if you have any questions or need further assistance!
