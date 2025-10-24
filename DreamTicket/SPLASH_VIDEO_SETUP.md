# DreamTicket Splash Screen Video Setup

## 🎥 Adding Your Splash Screen Video

### Step 1: Save the Video

1. Save your DreamTicket splash screen video
2. Name it: `splash.mp4`
3. Place it in: `DreamTicket/assets/videos/splash.mp4`

**Full path should be:**
```
C:\Users\user\Dream-ticket\DreamTicket\assets\videos\splash.mp4
```

### Step 2: Update SplashScreen.tsx

Open: `src/screens/SplashScreen.tsx`

**Find this section (around line 52):**
```typescript
{/* Uncomment this when video is added: */}
{/* <Video
  ref={videoRef}
  source={require('../../assets/videos/splash.mp4')}
  style={styles.video}
  resizeMode={ResizeMode.COVER}
  shouldPlay
  isLooping={false}
  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
  volume={1.0}
  isMuted={false}
/> */}

{/* Temporary placeholder - Remove when using video */}
<View style={styles.placeholderBackground}>
  <View style={styles.placeholderContent}>
    {/* This will be replaced by your video */}
  </View>
</View>
```

**Replace with:**
```typescript
<Video
  ref={videoRef}
  source={require('../../assets/videos/splash.mp4')}
  style={styles.video}
  resizeMode={ResizeMode.COVER}
  shouldPlay
  isLooping={false}
  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
  volume={1.0}
  isMuted={false}
/>
```

### Step 3: Test

```powershell
cd C:\Users\user\Dream-ticket\DreamTicket
npm run expo
```

Your splash video will play automatically when the app starts!

---

## 🎬 Video Specifications

### Recommended Settings:

**Format:**
- Container: MP4
- Video Codec: H.264 (most compatible)
- Audio Codec: AAC (optional)

**Resolution:**
- **Portrait (Recommended):** 1080x1920 (9:16 ratio)
- Landscape: 1920x1080 (16:9 ratio)
- Square: 1080x1080 (1:1 ratio)

**Duration:**
- **Ideal:** 3-5 seconds
- Maximum: 10 seconds (for good UX)
- Minimum: 2 seconds

**File Size:**
- **Recommended:** Under 5MB
- Maximum: 10MB (for faster loading)

**Frame Rate:**
- 30 FPS (standard)
- 60 FPS (smoother, but larger file)

**Bitrate:**
- Video: 5-10 Mbps
- Audio: 128-192 kbps (if using audio)

---

## 🎨 Video Content Ideas

Based on your DreamTicket branding:

### Option 1: Animated Logo
- Start with DreamTicket logo
- Add glowing/shimmering effects
- Show "Visualize your winning moment" text
- Fade to app

### Option 2: Dream Sequence
- Show the sleeping emoji character
- Dream cloud appears with DreamTicket logo
- Lucky numbers floating around
- Transition to app

### Option 3: Ticket Animation
- Animated ticket appearing
- Numbers rolling/changing
- Golden glow effect
- "Your luck awaits" message

### Option 4: Full Branding Video
- Use your existing splash image
- Add subtle animations (floating elements, glow)
- Background music (optional)
- Smooth transition

---

## ⚙️ Video Settings Explained

### In SplashScreen.tsx:

```typescript
<Video
  ref={videoRef}                              // Reference for control
  source={require('../../assets/videos/splash.mp4')}  // Video file
  style={styles.video}                        // Full screen styling
  resizeMode={ResizeMode.COVER}              // How video fits screen
  shouldPlay                                  // Auto-play on load
  isLooping={false}                          // Play once, don't loop
  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}  // Track progress
  volume={1.0}                               // Full volume (0.0 - 1.0)
  isMuted={false}                            // Audio on/off
/>
```

### Customization Options:

**Resize Modes:**
- `ResizeMode.COVER` - Fills screen (may crop) ✅ **Recommended**
- `ResizeMode.CONTAIN` - Shows full video (may have bars)
- `ResizeMode.STRETCH` - Stretches to fit (may distort)

**Audio:**
- `isMuted={false}` - Play with sound
- `isMuted={true}` - Silent video
- `volume={0.5}` - 50% volume

**Looping:**
- `isLooping={false}` - Play once ✅ **Recommended**
- `isLooping={true}` - Repeat until app loads

---

## 🎯 How It Works

### Video Playback Flow:

1. **App starts** → SplashScreen loads
2. **Video begins** → Plays automatically
3. **User sees** → Your branded splash video
4. **Video ends** → Automatically transitions to login
5. **Fallback** → If video takes too long, auto-advances after 5 seconds

### Timing:

```typescript
// Video plays until it ends OR 5 seconds max
const timer = setTimeout(() => {
  if (!videoEnded) {
    onFinish();  // Move to next screen
  }
}, 5000);
```

**You can adjust this timing:**
- Change `5000` to `3000` for 3 seconds
- Change to `8000` for 8 seconds
- Remove timer to wait for video to finish

---

## 🔧 Troubleshooting

### Video not playing?

**Check:**
1. ✅ Video is in correct folder: `assets/videos/splash.mp4`
2. ✅ File name is exactly `splash.mp4` (case-sensitive)
3. ✅ Video code is uncommented in SplashScreen.tsx
4. ✅ Placeholder View is removed/commented out
5. ✅ App was restarted after adding video

**Clear cache and restart:**
```powershell
npx expo start --clear
```

### Video looks wrong?

**If video is cropped:**
- Change to `ResizeMode.CONTAIN`

**If video has black bars:**
- Use `ResizeMode.COVER`
- Or create video in 9:16 portrait ratio

**If video is stretched:**
- Check your video's aspect ratio
- Use `ResizeMode.CONTAIN` or `COVER`

### Video file too large?

**Compress your video:**

**Online tools:**
- HandBrake (free desktop app)
- CloudConvert.com
- Clideo.com

**Settings to reduce size:**
- Lower resolution (e.g., 720p instead of 1080p)
- Reduce bitrate (5 Mbps instead of 10 Mbps)
- Shorter duration
- Remove audio if not needed

### No audio?

**Check:**
1. ✅ `isMuted={false}` in code
2. ✅ `volume={1.0}` (not 0.0)
3. ✅ Video file has audio track
4. ✅ Device volume is up
5. ✅ Not in silent mode

---

## 📱 Testing on Different Devices

### iOS:
- Supports MP4, MOV
- H.264 codec works best
- Audio: AAC format

### Android:
- Supports MP4, 3GP, WEBM
- H.264 codec recommended
- Audio: AAC or MP3

### Web:
- Supports MP4, WEBM
- H.264 codec
- Audio: AAC

**Recommendation:** Use MP4 with H.264 for maximum compatibility! ✅

---

## 🎨 Creating Your Video

### Tools You Can Use:

**Professional:**
- Adobe After Effects
- Adobe Premiere Pro
- Final Cut Pro (Mac)

**Easy/Free:**
- Canva (has video templates)
- CapCut (mobile & desktop)
- DaVinci Resolve (free)
- iMovie (Mac)
- Windows Video Editor

**Online:**
- Canva.com
- Animoto.com
- Biteable.com

### Quick Tips:

1. **Start with your image** - Animate your existing splash image
2. **Add motion** - Subtle zoom, pan, or fade effects
3. **Keep it short** - 3-5 seconds is perfect
4. **Test on device** - Always test on actual phone
5. **Optimize file size** - Compress before adding to app

---

## 🚀 Quick Setup (Copy-Paste)

**Windows PowerShell:**
```powershell
# 1. Navigate to project
cd C:\Users\user\Dream-ticket\DreamTicket

# 2. Ensure videos folder exists (already done)
mkdir -p assets/videos

# 3. Copy your video to the folder
# (Manually copy splash.mp4 to assets/videos/)

# 4. Edit SplashScreen.tsx
# (Uncomment Video component, remove placeholder)

# 5. Restart app
npm run expo
```

---

## 📊 Performance Tips

### For Best Performance:

1. **Optimize video file:**
   - Keep under 5MB
   - Use H.264 codec
   - 30 FPS is enough

2. **Preload video:**
   - Video loads while app initializes
   - Plays immediately when ready

3. **Fallback timing:**
   - 5-second max ensures app doesn't hang
   - Users won't wait too long

4. **Test on real devices:**
   - Emulators may not show true performance
   - Test on both iOS and Android

---

## 📝 Current Status

✅ expo-av package installed
✅ SplashScreen component updated for video
✅ Video folder created (`assets/videos/`)
✅ Auto-play configured
✅ Fallback timer set (5 seconds)
✅ Smooth transition to login
⏳ **Waiting for video file to be added**

**Once you add the video file and uncomment the code, your splash video will be ready!**

---

## 🎬 Example Video Structure

```
Your Video Timeline:
0:00 - 0:05 ────────────────────────►
│      │      │      │      │
│      │      │      │      └─ Fade out
│      │      │      └─ Show tagline
│      │      └─ Animate logo
│      └─ Show DreamTicket branding
└─ Fade in from black

Total: 3-5 seconds
```

---

## 🔄 Alternative: Use Image + Animation

If you don't have a video yet, you can:

1. Use your splash image
2. Add CSS/React animations
3. Create motion effects in code
4. Later upgrade to video

**Want me to create an animated version using your image?** Let me know!

---

*DreamTicket - Where Dreams Meet Luck! 🎫✨*

