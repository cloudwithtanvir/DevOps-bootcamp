---
title: "How to Submit Your Solution"
---

# How to Submit Your Solution

Every task in this bootcamp is submitted as a **pull request (PR)**. This is exactly how engineers propose changes at work, so you practise Git and code review from Week 1.

## Prerequisites

1. A GitHub account.
2. Git installed locally ([git-scm.com](https://git-scm.com/)), with your name and email configured:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

## One-time setup

1. **Fork** this repository: click **Fork** at the top right of the repository page. This creates your own copy.
2. **Clone your fork** (replace `your-username`):
   ```bash
   git clone https://github.com/your-username/DevOps-bootcamp.git
   cd DevOps-bootcamp
   ```
3. **Add the original repository as `upstream`**, so you can receive new material each week:
   ```bash
   git remote add upstream https://github.com/cloudwithtanvir/DevOps-bootcamp.git
   ```

## For every task

1. **Get the latest material** before starting:
   ```bash
   git checkout master
   git pull upstream master
   ```
2. **Create a branch** named after the task:
   ```bash
   git checkout -b 01-linux-task-1
   ```
3. **Add your solution** under `solutions/<module>/<your-github-username>`. Use the folder name given in each task, for example:
   ```bash
   mkdir -p solutions/01-linux
   # write your answer in solutions/01-linux/your-username.md
   ```
   For projects that live in their own repository (for example a dockerized app), add a short `.md` file with the link and a summary of what you built.
4. **Commit** with a meaningful message:
   ```bash
   git add solutions/
   git commit -m "Add Linux task 1 solution (your-username)"
   ```
5. **Push** the branch to your fork:
   ```bash
   git push origin 01-linux-task-1
   ```
6. **Open a pull request**: go to your fork on GitHub, click **Compare & pull request**, give it a clear title (e.g., `[01-linux] Task 1 - your-username`), describe what you did and anything you got stuck on, then click **Create pull request**.

## Review

Your mentor and peers will comment on the PR. To update it, commit to the same branch and push again; the PR updates automatically. Reviewing at least one peer's PR each week is part of the program.

## Rules

- Never commit passwords, access keys, tokens or `.env` files. If you do by mistake, tell your mentor immediately and rotate the key.
- Only add files inside your own `solutions/<module>/` path.
- Prefer copy-pasted command output over screenshots: it is searchable and easier to review.

## Checklist

- [ ] Fork and clone (once)
- [ ] Pull the latest material from `upstream`
- [ ] Create a branch per task
- [ ] Add your files under `solutions/<module>/`
- [ ] Commit and push
- [ ] Open a pull request and respond to review comments
