import { Alert } from 'react-native';

// Replicate.ai Face Swap Configuration
const REPLICATE_API_TOKEN = 'YOUR_REPLICATE_API_TOKEN_HERE'; // User will add their token
const FACE_SWAP_MODEL = 'yan-ops/face_swap:d5900f9ebed33e7ae6f0f192de2f5ba0027bbb49fb73c2f2c7589ee37d455d83';

export interface FaceSwapRequest {
  targetImage: string; // Template image URL or base64
  sourceImage: string; // User's uploaded photo URL or base64
}

export interface FaceSwapResponse {
  success: boolean;
  swappedImageUrl?: string;
  error?: string;
}

class FaceSwapService {
  private apiToken: string;

  constructor() {
    this.apiToken = REPLICATE_API_TOKEN;
  }

  /**
   * Swap user's face onto template image using Replicate.ai
   */
  async swapFace(request: FaceSwapRequest): Promise<FaceSwapResponse> {
    try {
      // Check if API token is configured
      if (!this.apiToken || this.apiToken === 'YOUR_REPLICATE_API_TOKEN_HERE') {
        console.warn('Replicate API token not configured. Using mock response.');
        return this.mockFaceSwap(request);
      }

      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: FACE_SWAP_MODEL,
          input: {
            target_image: request.targetImage,
            swap_image: request.sourceImage,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Replicate API error: ${response.status}`);
      }

      const prediction = await response.json();
      
      // Poll for result
      const result = await this.pollForResult(prediction.id);
      
      return {
        success: true,
        swappedImageUrl: result.output,
      };
    } catch (error) {
      console.error('Face swap error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Face swap failed',
      };
    }
  }

  /**
   * Poll Replicate API for prediction result
   */
  private async pollForResult(predictionId: string, maxAttempts = 30): Promise<any> {
    for (let i = 0; i < maxAttempts; i++) {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${this.apiToken}`,
        },
      });

      const prediction = await response.json();

      if (prediction.status === 'succeeded') {
        return prediction;
      }

      if (prediction.status === 'failed') {
        throw new Error('Face swap prediction failed');
      }

      // Wait 1 second before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('Face swap timeout');
  }

  /**
   * Mock face swap for testing without API token
   * Returns the original user image
   */
  private async mockFaceSwap(request: FaceSwapRequest): Promise<FaceSwapResponse> {
    console.log('Using mock face swap (API token not configured)');
    // In mock mode, just return user's image
    // In production, this would return the actual swapped image
    return {
      success: true,
      swappedImageUrl: request.sourceImage,
    };
  }

  /**
   * Convert local file URI to base64 for API
   */
  async convertToBase64(uri: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting to base64:', error);
      throw error;
    }
  }

  /**
   * Check if API token is configured
   */
  isConfigured(): boolean {
    return this.apiToken !== 'YOUR_REPLICATE_API_TOKEN_HERE' && this.apiToken.length > 0;
  }

  /**
   * Set API token dynamically
   */
  setApiToken(token: string) {
    this.apiToken = token;
  }
}

export const faceSwapService = new FaceSwapService();

