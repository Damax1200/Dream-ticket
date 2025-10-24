# 🔧 Fix Dependencies and Run App

## Step-by-Step Fix (Copy These Commands)

### Step 1: Clean Everything
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
```

### Step 2: Install with Legacy Peer Dependencies
```powershell
npm install --legacy-peer-deps
```

### Step 3: Start the App
```powershell
npm start
```

---

## 🆘 If Network Errors Continue

### Option A: Retry Installation
```powershell
npm cache clean --force
npm install --legacy-peer-deps
```

### Option B: Use Different Registry (If Behind Firewall)
```powershell
npm config set registry https://registry.npmjs.org/
npm install --legacy-peer-deps
```

### Option C: Install Offline (If Internet Issues)
If you keep getting network errors:
1. Check your internet connection
2. Disable VPN if you're using one
3. Try again later
4. Or ask someone to share their node_modules folder

---

## ✅ What Fixed

- Changed `react` and `react-dom` to matching version 18.3.1
- Added `--legacy-peer-deps` flag to avoid version conflicts
- Cleaned old installations

---

## 🚀 After Installation Works

You'll see:
```
Metro waiting on exp://192.168.x.x:19000
› Press w │ open web
```

Then:
1. Press `w` to open in browser
2. Or scan QR code with Expo Go app on phone

Done! 🎉

