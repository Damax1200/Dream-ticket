# 🎭 Face Swap Integration - Technical Documentation

## Overview

The Dream Ticket app now includes **AI-powered face swapping** using Replicate.ai's Face Swap model. This allows users to see themselves in professional lottery winner photos holding giant ceremonial checks!

## Architecture

### 1. **FaceSwapService** (`src/services/FaceSwapService.ts`)

A singleton service that handles all face swap operations:

```typescript
interface FaceSwapRequest {
  targetImage: string;  // Template image (3 people in suits)
  sourceImage: string;  // User's uploaded photo
}

interface FaceSwapResponse {
  success: boolean;
  swappedImageUrl?: string;
  error?: string;
}
```

**Key Methods:**
- `swapFace(request)` - Performs the face swap via Replicate API
- `pollForResult(predictionId)` - Polls API until processing is complete
- `mockFaceSwap(request)` - Fallback mode when API token not configured
- `convertToBase64(uri)` - Converts local images to base64 for API
- `isConfigured()` - Checks if API token is set
- `setApiToken(token)` - Dynamically updates API token

### 2. **AI Ticket Generator Integration** (`src/screens/AITicketGeneratorScreen.tsx`)

The face swap is integrated into the ticket generation flow:

```typescript
const handleGenerateTicket = async () => {
  // 1. User uploads photo
  // 2. Get random template image
  // 3. Call face swap API
  const faceSwapResult = await faceSwapService.swapFace({
    targetImage: templateImageUri,
    sourceImage: selectedMedia,
  });
  
  // 4. Create winner ticket with swapped photo
  // 5. Capture and save the result
}
```

### 3. **Template System**

Templates are stored in `assets/templates/` and mapped by theme:

```typescript
const templateMap = {
  'dreamGalaxy': require('../../assets/templates/template-galaxy.jpg'),
  'dreamGold': require('../../assets/templates/template-gold.jpg'),
  'dreamOcean': require('../../assets/templates/template-ocean.jpg'),
  'dreamSunset': require('../../assets/templates/template-sunset.jpg'),
  'dreamForest': require('../../assets/templates/template-forest.jpg'),
};
```

## API Integration

### Replicate.ai Face Swap Model

**Model:** `yan-ops/face_swap:d5900f9ebed33e7ae6f0f192de2f5ba0027bbb49fb73c2f2c7589ee37d455d83`

**API Endpoint:** `https://api.replicate.com/v1/predictions`

**Authentication:** Bearer token

**Input Parameters:**
- `target_image` - Image with the face to be replaced
- `swap_image` - Source face image

**Processing Time:** 5-10 seconds average

**Output:** URL to the swapped image

### API Flow

```
1. POST /v1/predictions
   └─> Returns prediction ID
   
2. GET /v1/predictions/{id}
   └─> Poll every 1 second
   └─> Status: "starting" → "processing" → "succeeded"
   └─> Max 30 attempts (30 seconds timeout)
   
3. Extract output image URL
   └─> Download and display result
```

## Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const result = await faceSwapService.swapFace({...});
  if (!result.success) {
    throw new Error(result.error);
  }
} catch (error) {
  Alert.alert('Generation Failed', error.message);
  setIsGenerating(false);
}
```

**Error Scenarios:**
- API token not configured → Falls back to mock mode
- Network timeout → Shows user-friendly error
- Face detection failed → Provides retry option
- Invalid image format → Alerts user to upload different photo

## Mock Mode

When API token is not configured, the service operates in **mock mode**:

```typescript
private async mockFaceSwap(request: FaceSwapRequest) {
  console.log('Using mock face swap (API token not configured)');
  return {
    success: true,
    swappedImageUrl: request.sourceImage, // Returns original user image
  };
}
```

This allows development and testing without API costs!

## State Management

The AI Generator screen manages face swap state:

```typescript
const [swappedPhotoUri, setSwappedPhotoUri] = useState<string | null>(null);
```

This stores the swapped image URL for display and further processing.

## User Experience Flow

1. **User uploads photo** 📸
   - Shows preview of selected image
   
2. **User taps "Generate Lucky Ticket"** ✨
   - Shows sparkle animation
   - Displays "Generating..." message
   
3. **Face swap processing** 🎭
   - Sends photo to Replicate API
   - Polls for result (5-10 seconds)
   - Console logs progress
   
4. **Success!** 🎉
   - Shows professional winner image with user's face
   - Includes motivational quote
   - Displays lucky number on giant check
   - Provides share & save options

## Performance Optimization

- **Async/Await:** Non-blocking UI during API calls
- **Polling Strategy:** 1-second intervals with 30-second timeout
- **Image Caching:** Stores result locally after generation
- **Mock Mode:** Instant results for testing without API

## Security Considerations

⚠️ **Important:**

1. **Never commit API token to Git**
2. **Token location:** `src/services/FaceSwapService.ts`
3. **Production:** Move token to environment variables
4. **Server-side:** Consider proxy API for better security

## Cost Analysis

**Replicate.ai Pricing:**
- Free tier: $5 credits (~50-100 face swaps)
- Per face swap: ~$0.05
- Monthly estimate for 1000 users: ~$50-100

**Optimization Tips:**
- Cache results to avoid re-processing
- Implement rate limiting
- Consider batch processing for premium users

## Testing

### Manual Testing:

1. **With API Token:**
   ```typescript
   // In FaceSwapService.ts
   const REPLICATE_API_TOKEN = 'r8_YOUR_TOKEN';
   ```
   - Upload clear face photo
   - Generate ticket
   - Verify face swap quality

2. **Without API Token (Mock Mode):**
   ```typescript
   const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN_HERE';
   ```
   - Upload photo
   - Generate ticket  
   - Verify original photo is used

### Console Logging:

The service includes detailed logging:
```
🎭 Starting face swap process...
✅ Face swap completed successfully!
```

Monitor console for debugging.

## Future Enhancements

Potential improvements:

1. **Multiple Face Detection:** Swap all faces in group photos
2. **Face Enhancement:** Auto-improve photo quality before swap
3. **Custom Templates:** Let users upload their own templates
4. **Video Face Swap:** Extend to video tickets (premium feature)
5. **Preview Before Generate:** Show template before final generation
6. **Batch Processing:** Generate multiple variations at once

## Troubleshooting

### Common Issues:

**Issue:** "Face swap failed"
- **Solution:** Ensure photo has clear, visible face
- Try uploading a different photo with better lighting

**Issue:** "Timeout" error
- **Solution:** Check internet connection
- Retry generation

**Issue:** "API token not configured" warning in console
- **Solution:** Add your Replicate token to `FaceSwapService.ts`

**Issue:** Template images not found
- **Solution:** Add required template images to `assets/templates/`

## Documentation Files

- `FACE_SWAP_SETUP.md` - User setup guide
- `FACESWAP_INTEGRATION.md` - This technical doc
- `assets/templates/README.md` - Template requirements

---

**Built with ❤️ using Replicate.ai Face Swap** 🎭🚀

