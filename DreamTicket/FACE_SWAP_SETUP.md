# 🎭 Face Swap AI Integration Setup Guide

This guide will help you set up the **Replicate.ai Face Swap** feature for the Dream Ticket app!

## 🚀 Step 1: Get Your Replicate API Token

1. Go to [Replicate.ai](https://replicate.com/)
2. Sign up for a free account (they offer free credits!)
3. Navigate to your account settings
4. Copy your API token

## 🔧 Step 2: Add Your API Token to the App

Open the file: `src/services/FaceSwapService.ts`

Replace this line:
```typescript
const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN_HERE';
```

With your actual token:
```typescript
const REPLICATE_API_TOKEN = 'r8_YOUR_ACTUAL_TOKEN_HERE';
```

## 📸 Step 3: Add Template Images

You need to add 5 template images to the `assets/templates/` folder. These should be professional photos of **3 people in suits holding a giant check**.

### Required Template Images:

1. **template-galaxy.jpg** - Purple/blue galaxy theme
2. **template-gold.jpg** - Golden/luxury theme  
3. **template-ocean.jpg** - Blue ocean theme
4. **template-sunset.jpg** - Orange/pink sunset theme
5. **template-forest.jpg** - Green nature theme

### Image Requirements:
- **3 professional people in business suits**
- **Holding a large ceremonial check**
- **Middle person's face should be clearly visible** (this is where the user's face will be swapped)
- **High resolution** (at least 1024x1024 pixels)
- **Good lighting** on faces
- **Portrait orientation** preferred

### Where to Get Template Images:

**Option 1: Use the Images You Shared**
- The images you provided to me earlier are perfect!
- Rename them according to the theme:
  - `IMG-20250126-WA0004.jpg` → `template-galaxy.jpg`
  - `IMG-20250126-WA0005.jpg` → `template-gold.jpg`
  - `IMG-20250126-WA0006.jpg` → `template-ocean.jpg`
  - (Add 2 more similar professional winner photos)

**Option 2: Generate with AI**
- Use **Midjourney**, **DALL-E**, or **Leonardo.ai**
- Prompt example:
  ```
  Professional business photo of three people in suits holding a giant ceremonial check, 
  studio lighting, corporate setting, professional photography, 
  middle person prominently centered, holding oversized novelty check, 
  celebratory mood, high resolution
  ```

**Option 3: Stock Photos**
- Search on **Shutterstock**, **Getty Images**, or **Unsplash**
- Keywords: "business people holding check", "lottery winners", "ceremonial check presentation"

## 🎨 Step 4: How It Works

When a user generates a ticket:

1. **User uploads their photo** 📸
2. **AI selects a random template** (one of the 5 images)
3. **Replicate Face Swap API** swaps the user's face onto the middle person in the template
4. **Result:** Professional winner photo with user's face on a person in a suit holding a giant check! 🏆

## 💰 Pricing

**Replicate.ai Pricing:**
- Free tier: **$5 in free credits** (good for ~50-100 face swaps)
- Pay-as-you-go: **~$0.05 per face swap**
- Very affordable for testing and production!

## 🧪 Testing Without API Token

The app will work in **mock mode** if no API token is provided:
- It will use the user's original photo (no face swap)
- Console will show: "Using mock face swap (API token not configured)"
- This lets you test the UI flow before setting up the API

## 📝 API Limits & Performance

- **Processing time:** 5-10 seconds per face swap
- **Quality:** Professional, realistic face swapping
- **Success rate:** ~95% with good input photos
- **Best results:** Clear face photos with good lighting

## 🔒 Security Notes

- **Never commit your API token to Git!**
- Add `FaceSwapService.ts` to `.gitignore` if needed
- For production, store the token in environment variables
- Consider implementing server-side API calls for better security

## 🎉 You're All Set!

Once you've:
1. ✅ Added your Replicate API token
2. ✅ Placed the 5 template images in `assets/templates/`

The app will automatically:
- Swap user faces onto professional winner templates
- Generate stunning lottery winner-style images
- Create shareable Dream Tickets with your users' faces! 🚀🔥

---

Need help? Check the [Replicate Face Swap Docs](https://replicate.com/yan-ops/face_swap) or reach out to the dev team!

