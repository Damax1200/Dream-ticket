# 🚀 How to Run Dream Ticket App

## Quick Start Guide - Copy & Paste Commands

---

## ✅ PRE-CHECK: Is Docker Running?

Open PowerShell and run:
```powershell
docker --version
```

- **If you see a version number** → Continue to METHOD 1 (Docker)
- **If you get an error** → Go to METHOD 2 (Direct Installation)

---

## METHOD 1: Using Docker (Recommended) 🐳

### Step 1: Navigate to Project
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
```

### Step 2: Start the App
```powershell
docker-compose up --build
```

**What happens:**
- Downloads Node.js 22 image
- Installs all TypeScript dependencies
- Starts development server
- Takes 2-5 minutes first time (much faster after)

### Step 3: Open Your App

**Option A - On Your Phone (Easiest):**
1. Install **Expo Go** app (App Store or Google Play)
2. Open browser: http://localhost:19000
3. Scan the QR code with Expo Go app
4. Your TypeScript app loads! 🎉

**Option B - In Browser:**
- Go to: http://localhost:19000
- Click "Run in web browser"

### Step 4: Making Changes
- Edit any `.tsx` file in VSCode
- Save the file
- App automatically reloads! ⚡

### Step 5: Stop the App
Press `Ctrl + C` in PowerShell, then:
```powershell
docker-compose down
```

---

## METHOD 2: Without Docker (Direct Installation) 💻

### Step 1: Install Node.js (One-Time Setup)

**Download and Install:**
1. Go to: https://nodejs.org/
2. Click the green **"LTS"** button (recommended version)
3. Run the installer
4. Keep clicking "Next" with default settings
5. **IMPORTANT:** Restart your computer after installation

### Step 2: Verify Installation
Open **NEW** PowerShell after restart:
```powershell
node --version
npm --version
```

You should see version numbers. If not, restart computer again.

### Step 3: Navigate to Project
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
```

### Step 4: Install Dependencies (One-Time, takes 5-10 mins)
```powershell
npm install
```

### Step 5: Start the App
```powershell
npm start
```

Or for Expo:
```powershell
npm run expo
```

### Step 6: Open Your App

**Option A - On Your Phone:**
1. Install **Expo Go** app
2. Scan QR code shown in terminal
3. App loads on your phone! 📱

**Option B - In Browser:**
- Press `w` in terminal
- Or go to: http://localhost:19000

### Step 7: Stop the App
Press `Ctrl + C` in PowerShell

---

## 🎯 What You'll See

### In Terminal:
```
Metro waiting on exp://192.168.x.x:19000
› Press a │ open Android
› Press w │ open web
› Press r │ reload app
› Press m │ toggle menu
```

### In Browser (http://localhost:19000):
- QR Code to scan
- Buttons to run on different platforms
- Development menu

---

## 📱 Install Expo Go App

**On iPhone:**
1. Open App Store
2. Search "Expo Go"
3. Install
4. Open and scan QR code

**On Android:**
1. Open Google Play Store
2. Search "Expo Go"
3. Install
4. Open and scan QR code

**Important:** Your phone and computer must be on the **same WiFi network**!

---

## 🆘 Troubleshooting

### "npm is not recognized"
❌ Problem: Node.js not installed or not in PATH
✅ Solution:
1. Install Node.js from https://nodejs.org/
2. Restart computer
3. Open NEW PowerShell and try again

### "docker is not recognized"
❌ Problem: Docker not installed or not running
✅ Solution:
1. Install Docker Desktop from https://docker.com/get-started
2. Start Docker Desktop (wait for whale icon to be green)
3. Try again

### "Port 8081 already in use"
❌ Problem: Another app using the port
✅ Solution:
```powershell
# Kill the port
npx kill-port 8081 19000
# Or restart computer
```

### "Cannot connect to Metro bundler"
✅ Solution:
```powershell
# Clear cache and restart
npm start -- --reset-cache
```

### App won't load on phone
✅ Check:
- Phone and computer on same WiFi? ✓
- Firewall blocking? Check Windows Firewall
- Try scanning QR code again
- Try pressing `r` to reload in terminal

### Docker container won't start
✅ Solution:
```powershell
# Stop everything
docker-compose down -v

# Rebuild from scratch
docker-compose up --build
```

---

## 🔥 Quick Reference

### Docker Commands:
```powershell
# Start app
docker-compose up

# Start in background
docker-compose up -d

# Stop app
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build

# Shell access
docker-compose exec dreamticket sh
```

### NPM Commands:
```powershell
# Start app
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run with Expo
npm run expo

# Check TypeScript
npx tsc --noEmit

# Clear cache
npm start -- --reset-cache
```

### Inside App (Press Keys in Terminal):
- `r` - Reload app
- `m` - Toggle menu
- `d` - Open developer menu
- `w` - Open in web browser
- `a` - Open on Android
- `i` - Open on iOS
- `c` - Clear cache
- `?` - Show all commands

---

## 📂 Project Structure (TypeScript)

```
DreamTicket/
├── App.tsx                    ← Main app (TypeScript)
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx     ← Home page
│   │   ├── TicketScreen.tsx   ← Tickets page
│   │   └── ProfileScreen.tsx  ← Profile page
│   └── types/
│       └── navigation.ts      ← Type definitions
├── package.json
├── tsconfig.json              ← TypeScript config
├── Dockerfile                 ← Docker setup
└── docker-compose.yml         ← Docker compose
```

---

## 🎨 Making Your First Change

1. **Open** `src/screens/HomeScreen.tsx`
2. **Find** line 19:
   ```typescript
   <Text style={styles.title}>Dream Ticket</Text>
   ```
3. **Change** to:
   ```typescript
   <Text style={styles.title}>My Dream Ticket</Text>
   ```
4. **Save** the file (Ctrl+S)
5. **Watch** the app reload automatically! ⚡

---

## ✨ You're All Set!

Your app is now running with TypeScript! 🎉

**Next Steps:**
- Edit `.tsx` files in `src/screens/`
- Add new screens
- Install packages: `npm install <package>`
- Learn TypeScript: https://www.typescriptlang.org/docs/

**Need Help?**
- Check `DOCKER_GUIDE.md` for Docker details
- Check `INSTALLATION_GUIDE.md` for setup help
- React Native docs: https://reactnative.dev/

Happy Coding! 🚀🎫

