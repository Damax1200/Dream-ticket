# Dream Ticket - Installation Guide

## Prerequisites Installation

### Step 1: Install Node.js and npm

#### Option A: Direct Download (Recommended)
1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support) - currently 18.x or 20.x
3. Run the installer (`.msi` file)
4. During installation:
   - Click "Next" through the wizard
   - Accept the license agreement
   - Keep default installation path
   - **Important:** Make sure "Add to PATH" is checked
   - Install additional tools if prompted (including Python and Visual Studio Build Tools)
5. Click "Install" and wait for completion
6. Restart your computer (or at least close all terminals)

#### Option B: Using Winget (Windows Package Manager)
If you have Windows 11 or Windows 10 with winget installed:
```powershell
winget install OpenJS.NodeJS.LTS
```

### Step 2: Verify Node.js Installation
After installation, open a **NEW** PowerShell window and run:
```powershell
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

If you still get "command not found", restart your computer.

---

## Project Setup

### Step 3: Navigate to Project Directory
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
```

### Step 4: Install Project Dependencies
```powershell
npm install
```

This will install all required packages including:
- React Native
- TypeScript
- Navigation libraries
- All other dependencies

**Note:** This may take 5-10 minutes depending on your internet speed.

### Step 5: Install Expo CLI (if using Expo)
```powershell
npm install -g expo-cli
```

Or if you prefer npx (no global install):
```powershell
npx expo start
```

---

## Running the Project

### Option 1: Using Expo (Easiest)
```powershell
npm run expo
# or
npx expo start
```

This will open Expo Dev Tools in your browser. You can then:
- Scan the QR code with Expo Go app on your phone (iOS/Android)
- Press 'a' to open Android emulator
- Press 'i' to open iOS simulator (Mac only)

### Option 2: Using React Native CLI
For Android:
```powershell
npm run android
```

For iOS (Mac only):
```powershell
npm run ios
```

---

## Additional Setup (Optional but Recommended)

### For Android Development:
1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install with default settings
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Install Android SDK, SDK Platform, and Android Virtual Device (AVD)

2. **Set Environment Variables**
   Add to your System Environment Variables:
   ```
   ANDROID_HOME = C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
   ```
   Add to PATH:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   ```

### For iOS Development (Mac Only):
1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

---

## Troubleshooting

### "npm is not recognized"
- Make sure you've restarted your terminal after installing Node.js
- Verify Node.js is in your PATH: `echo $env:PATH` (PowerShell)
- Try restarting your computer

### "Cannot find module"
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Port Already in Use
```powershell
# Kill process on port 8081
npx kill-port 8081
```

### TypeScript Errors
```powershell
# Clear TypeScript cache
npm run tsc --build --clean
```

### Metro Bundler Issues
```powershell
# Clear Metro cache
npx react-native start --reset-cache
```

---

## Quick Start Commands

Once everything is installed:

```powershell
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run with Expo
npm run expo

# Type checking
npx tsc --noEmit

# Lint code
npm run lint
```

---

## Project Structure

```
DreamTicket/
├── App.tsx                 # Main application entry (TypeScript)
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── TicketScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── types/             # TypeScript type definitions
│       └── navigation.ts
├── assets/                # Images and static files
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── babel.config.js       # Babel configuration
```

---

## Need More Help?

- **React Native Docs:** https://reactnative.dev/docs/getting-started
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Expo Docs:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/docs/getting-started

---

## Next Steps After Installation

1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Open the app on your device or emulator
4. Start coding! All files are now TypeScript (.tsx)

Good luck with your Dream Ticket app! 🎫✨

