# Git guide for future edits

This project uses `main` for the live GitHub Pages site.

## First time only

```bash
git clone https://github.com/largerth4nlife/largerth4nlife.github.io.git
cd largerth4nlife.github.io
npm install
```

## Normal edit → commit → push

1. Get the newest version:

```bash
git pull origin main
```

2. Check what changed:

```bash
git status
```

3. Add the files you want to commit:

```bash
git add src/PayrollCheckerPage.tsx
```

Or add all changed files:

```bash
git add .
```

4. Create a commit. A commit is a saved checkpoint:

```bash
git commit -m "Update attendance checker"
```

5. Push your commit to GitHub:

```bash
git push origin main
```

GitHub Pages will then publish the updated site through the repository's deployment workflow.

## Useful commands

```bash
git status                 # see changed files
git diff                   # see your actual changes
git log --oneline -10      # see recent commits
git add .                  # stage all changes
git commit -m "message"   # save a checkpoint
git push origin main       # upload commits to GitHub
git pull origin main       # download the newest GitHub version
```

## Safer workflow for bigger changes

Use a separate branch instead of editing `main` directly:

```bash
git pull origin main
git checkout -b attendance-change
# edit files
git add .
git commit -m "Improve attendance validation"
git push -u origin attendance-change
```

Then open a Pull Request on GitHub. Review it, test the site, and merge it into `main` when ready.

## What the words mean

- **Working tree:** files currently on your computer.
- **Add / stage:** select changes that will go into the next commit.
- **Commit:** save a named checkpoint in Git history.
- **Push:** upload local commits to GitHub.
- **Pull:** download and merge newer commits from GitHub.
- **Branch:** a separate line of development.
- **Pull Request:** a request to merge a branch into another branch.

## If Git says your branch is behind

Do this before making your next commit:

```bash
git pull --rebase origin main
```

If you get a merge conflict, do not randomly delete code. Open the conflicted file, decide which version should remain, then run:

```bash
git add .
git rebase --continue
```

If you are unsure, stop and ask before using `git push --force`.

## Recommended commit style

Use short messages that describe the change:

```text
Add WFH verification
Fix date range validation
Improve employee matching
Update attendance export
Fix Ramos employee selection
```
