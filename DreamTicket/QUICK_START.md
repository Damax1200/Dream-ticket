# DreamTicket - Quick Start Guide

## 🚀 Running the App

### Prerequisites
- Node.js 16+ installed
- Expo Go app on your phone (iOS/Android)

### Start the App

**Option 1: From project directory**
```powershell
cd C:\Users\user\Dream-ticket\DreamTicket
npm run expo
```

**Option 2: One-liner**
```powershell
cd C:\Users\user\Dream-ticket\DreamTicket && npm run expo
```

### Access the App

1. **Mobile Device:**
   - Open Expo Go app
   - Scan the QR code from terminal
   - App will load automatically

2. **Web Browser:**
   - Open `http://localhost:8081`
   - Test in browser

3. **Android Emulator:**
   - Press `a` in terminal

4. **iOS Simulator (Mac only):**
   - Press `i` in terminal

## 📱 Testing the App

### Create Your First Ticket

1. **Register/Login:**
   - Enter any email (with @)
   - Enter any password
   - Click Login

2. **Navigate to AI Generator:**
   - Tap "AI Ticket" tab at bottom
   - Or tap "Create Lucky Ticket" on home

3. **Upload Media:**
   - Tap "Upload Photo" or "Take Photo"
   - Select/capture your image
   - Preview appears

4. **Generate Ticket:**
   - Tap "✨ Generate Lucky Ticket"
   - Wait 3 seconds (AI simulation)
   - Your DreamTicket appears!

5. **View/Share:**
   - See your lucky number
   - Tap "📤 Share" to share
   - Tap "✨ Create New" for another

6. **Check Gallery:**
   - Tap "My Tickets" tab
   - See all your tickets
   - Share or delete as needed

### Test Premium Features

To test premium features:

1. Open `AsyncStorage` in dev tools
2. Set `isPremium` to `"true"`
3. Reload app
4. Now you can upload videos!

Or in code, add this temporarily:
```typescript
await AsyncStorage.setItem('isPremium', 'true');
```

## 🎨 Customizing Brand Colors

When you have your brand colors, update these files:

### 1. AI Generator Screen
File: `src/screens/AITicketGeneratorScreen.tsx`

```typescript
// Replace these colors:
backgroundColor: '#0f0f23',  // Main background
backgroundColor: '#1a1a2e',  // Card background
borderColor: '#8b5cf6',      // Purple accent
color: '#fbbf24',            // Gold accent
```

### 2. Home Screen
File: `src/screens/HomeScreen.tsx`
(Same color replacements)

### 3. My Tickets Screen
File: `src/screens/TicketScreen.tsx`
(Same color replacements)

### 4. App Navigation
File: `App.tsx`

```typescript
headerStyle: {
  backgroundColor: '#1a1a2e',  // Header color
},
tabBarActiveTintColor: '#8b5cf6',  // Active tab color
```

## 🔧 Common Issues

### "Cannot read property 'includes' of undefined"
**Fixed!** ✅ All null checks added.

### "Port already in use"
```powershell
# App will automatically ask to use another port
# Or kill the process:
npx kill-port 8081
```

### "package.json not found"
**Solution:** Always navigate to project directory first!
```powershell
cd C:\Users\user\Dream-ticket\DreamTicket
```

### Images not uploading
**Solution:** Grant permissions when prompted
- Camera permission
- Photo library permission

## 📊 Daily Limits

**Free Users:**
- 1 image ticket per day
- Resets at midnight

**Premium Users:**
- 3 video tickets per day
- Unlimited images

**Reset Daily Limit (for testing):**
```typescript
await AsyncStorage.setItem('dailyTicketCount', '0');
await AsyncStorage.setItem('lastTicketDate', new Date().toDateString());
```

## 🎯 Next Steps

1. **Add Your Logo:**
   - Replace 🎫 emoji with your logo image
   - Update in all screens

2. **Customize Colors:**
   - Use your brand colors
   - Update theme consistently

3. **Connect AI:**
   - Sign up for Replicate/OpenAI
   - Add API keys
   - Implement real generation

4. **Add Payments:**
   - Set up Stripe account
   - Implement subscription
   - Test payment flow

5. **Deploy:**
   - Build for iOS (TestFlight)
   - Build for Android (Play Store)
   - Submit for review

## 📞 Support

**Issues?**
- Check terminal for errors
- Verify you're in correct directory
- Clear cache: `npx expo start --clear`
- Reinstall: `npm install --legacy-peer-deps`

**Features Working:**
- ✅ Photo/video upload
- ✅ Lucky number generation
- ✅ Ticket gallery
- ✅ Share functionality
- ✅ Daily limits
- ✅ Free/Premium tiers
- ✅ Dark theme UI

**Ready for:**
- 🔄 AI integration
- 🔄 Payment integration
- 🔄 Custom branding

---

## 🎉 Enjoy Your DreamTicket App!

Your AI lottery visualization app is ready to use!

**Current Status:** ✅ MVP Complete
**Next:** Add your branding and AI integration

🎫✨ Where Dreams Meet Luck! ✨🎫

