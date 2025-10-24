# DreamTicket Splash Screen Image Setup

## 📸 Adding Your Splash Screen Image

### Step 1: Save the Image

1. Save your DreamTicket splash screen image (the one with the bed and "Visualize your winning moment")
2. Name it: `splash-bg.png` (or `splash-bg.jpg`)
3. Place it in: `DreamTicket/assets/images/splash-bg.png`

**Full path should be:**
```
C:\Users\user\Dream-ticket\DreamTicket\assets\images\splash-bg.png
```

### Step 2: Update SplashScreen.tsx

Open: `src/screens/SplashScreen.tsx`

**Find this section (around line 48):**
```typescript
{/* Uncomment this when image is added: */}
{/* <ImageBackground
  source={require('../../assets/images/splash-bg.png')}
  style={styles.backgroundImage}
  resizeMode="cover"
/> */}

{/* Temporary placeholder - Remove when using image */}
<View style={styles.placeholderBackground}>
  <View style={styles.placeholderContent}>
    {/* This mimics the image colors until you add the actual image */}
  </View>
</View>
```

**Replace with:**
```typescript
<ImageBackground
  source={require('../../assets/images/splash-bg.png')}
  style={styles.backgroundImage}
  resizeMode="cover"
/>
```

### Step 3: Test

```powershell
cd C:\Users\user\Dream-ticket\DreamTicket
npm run expo
```

The splash screen will now show your beautiful DreamTicket branding image!

---

## 🎨 Alternative: Using JPG

If your image is JPG format:

1. Save as: `splash-bg.jpg`
2. Update the require path:
```typescript
source={require('../../assets/images/splash-bg.jpg')}
```

---

## 📱 Image Specifications

**Recommended:**
- Format: PNG or JPG
- Resolution: 1080x1920 (portrait) or higher
- Aspect ratio: 9:16 (mobile portrait)
- File size: Under 2MB for faster loading

**Your current image is perfect!** It has:
- ✅ Deep blue background (#003d5c)
- ✅ DreamTicket logo in cloud
- ✅ "Visualize your winning moment" text
- ✅ Dreaming emoji character
- ✅ Perfect for splash screen

---

## 🚀 Quick Setup (Copy-Paste)

**Windows PowerShell:**
```powershell
# 1. Navigate to project
cd C:\Users\user\Dream-ticket\DreamTicket

# 2. Ensure images folder exists
mkdir -p assets/images

# 3. Copy your image to the folder
# (Manually copy splash-bg.png to assets/images/)

# 4. Restart app
npm run expo
```

---

## 🎯 What Happens

1. **App starts** → Splash screen appears
2. **Shows your image** → Full screen with fade-in animation
3. **3 seconds** → Smooth fade out
4. **Login screen** → User can start using the app

---

## 🔧 Troubleshooting

### Image not showing?

**Check:**
1. ✅ Image is in correct folder: `assets/images/splash-bg.png`
2. ✅ File name matches exactly (case-sensitive)
3. ✅ Code is uncommented in SplashScreen.tsx
4. ✅ App was restarted after adding image

**Clear cache and restart:**
```powershell
npx expo start --clear
```

### Image looks stretched?

Change `resizeMode`:
- `"cover"` - Fills screen (may crop edges)
- `"contain"` - Shows full image (may have bars)
- `"stretch"` - Stretches to fit (may distort)

**Recommended:** `"cover"` (current setting)

---

## 📝 Current Status

✅ Splash screen component updated
✅ Image placeholder ready
✅ Animations configured (fade in/out)
✅ 3-second display time
⏳ **Waiting for image file to be added**

**Once you add the image file, the splash screen will be complete!**

---

*DreamTicket - Where Dreams Meet Luck! 🎫✨*

