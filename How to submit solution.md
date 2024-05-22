# How to submit solution

Here's the process for submitting your solution to a GitHub repository. Follow these steps:

### Step-by-Step Submission Process

### Prerequisites:

1. Ensure you have a GitHub account.
2. Install Git on your local machine if it's not already installed. You can download it from [git-scm.com](https://git-scm.com/).

### Fork the Repository:

1. Go to the GitHub repository where you need to submit your solution.
2. Click on the `Fork` button at the top right corner of the repository page. This creates a copy of the repository under your GitHub account.

### Clone the Forked Repository:

1. Open a terminal on your local machine.
2. Clone the forked repository to your local machine using the following command (replace `your-username` with your GitHub username):
    
    ```bash
    git clone <https://github.com/your-username/repository-name.git>
    
    ```
    
3. Navigate into the cloned repository directory:
    
    ```bash
    cd repository-name
    
    ```
    

### Create a New Branch:

1. Create a new branch for your solution:
    
    ```bash
    git checkout -b solution-branch
    
    ```
    

### Add Your Solution:

1. Create a directory named `solution` if it doesn't already exist:
    
    ```bash
    mkdir solution
    
    ```
    
2. Copy your solution files into the `solution` directory.

### Commit Your Changes:

1. Add the new files to the staging area:
    
    ```bash
    git add solution/*
    
    ```
    
2. Commit the changes with a meaningful message:
    
    ```bash
    git commit -m "Add Linux Fundamentals practice solutions"
    
    ```
    

### Push Your Changes:

1. Push your changes to the new branch on your forked repository:
    
    ```bash
    git push origin solution-branch
    
    ```
    

### Create a Pull Request:

1. Go to your forked repository on GitHub.
2. You should see a notification suggesting you create a pull request for the branch you just pushed. Click on the `Compare & pull request` button.
3. Fill in the pull request form with a meaningful title and description of the changes.
4. Click on the `Create pull request` button to submit your pull request.

### Example Commands

Here's a summary of the Git commands you will use:

```bash
# Clone the forked repository
git clone <https://github.com/your-username/repository-name.git>

# Navigate into the repository directory
cd repository-name

# Create a new branch for the solution
git checkout -b solution-branch

# Create a solution directory if not exist
mkdir solution

# Add your solution files to the solution directory
cp /path/to/your/solution/* solution/

# Stage the new files
git add solution/*

# Commit the changes
git commit -m "Add Linux Fundamentals practice solutions"

# Push the changes to the solution branch
git push origin solution-branch

```

### Submission Checklist

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch for your solution.
4. Add your solution files to the `solution` directory.
5. Commit and push your changes.
6. Create a pull request on GitHub.

This process ensures that your solution is submitted correctly via GitHub, allowing the instructor to review your work efficiently.