# GitHub Push Setup Guide

## Step 1: Configure Git Identity

Before you can commit, you need to tell Git who you are. Run these commands in PowerShell:

```powershell
# Replace with your actual name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```powershell
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"
```

---

## Step 2: Commit Your TypeScript Changes

After configuring your identity:

```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket"
git commit -m "Convert Dream Ticket app from JavaScript to TypeScript"
```

---

## Step 3: Check/Add GitHub Remote

Check if you have a GitHub remote configured:

```powershell
git remote -v
```

**If you DON'T have a remote:**

1. Create a new repository on GitHub: https://github.com/new
2. Name it: `Dream-ticket` or `dream-ticket-app`
3. DON'T initialize with README (you already have files)
4. Copy the repository URL

Then add the remote:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/dream-ticket.git
```

---

## Step 4: Push to GitHub

### First Time Push:
```powershell
git push -u origin main
```

Or if your branch is named `master`:
```powershell
git push -u origin master
```

### Check Your Branch Name:
```powershell
git branch
```

---

## All Commands Together

```powershell
# 1. Set your identity (do this once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Navigate to project
cd "C:\Users\OMO BABA\Desktop\Dream-ticket"

# 3. Commit changes
git commit -m "Convert Dream Ticket app from JavaScript to TypeScript"

# 4. Check remote
git remote -v

# 5. If no remote, add one (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/dream-ticket.git

# 6. Push to GitHub
git push -u origin main
```

---

## Troubleshooting

### "Permission denied" or Authentication Error

You may need to set up authentication:

**Option 1: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (all)
4. Generate and copy the token
5. When pushing, use token as password

**Option 2: GitHub CLI**
```powershell
winget install GitHub.cli
gh auth login
```

**Option 3: SSH Key**
Follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

### Branch Name Issues

If you get an error about branch name:

```powershell
# Check current branch
git branch

# Rename branch to main if needed
git branch -M main

# Then push
git push -u origin main
```

---

## What's Being Pushed?

Your TypeScript conversion includes:

✅ **Converted Files:**
- `App.tsx` (was App.js)
- `src/screens/HomeScreen.tsx`
- `src/screens/TicketScreen.tsx`
- `src/screens/ProfileScreen.tsx`
- `src/types/navigation.ts` (new)
- `index.js` (entry point)

✅ **Configuration Files:**
- `tsconfig.json` - TypeScript config
- `babel.config.js` - Updated for Expo
- `metro.config.js` - Updated for Expo
- `package.json` - Updated dependencies

✅ **Docker Files:**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

✅ **Documentation:**
- `INSTALLATION_GUIDE.md`
- `DOCKER_GUIDE.md`
- `RUN_ME.md`
- `FIX_AND_RUN.md`
- `.gitignore`

---

## Quick Start (After Setup)

Once everything is set up, future pushes are simple:

```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket"
git add .
git commit -m "Your commit message"
git push
```

Done! 🚀

