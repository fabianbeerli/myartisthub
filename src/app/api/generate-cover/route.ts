import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client only if API key exists
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    // Check if we have the OpenAI client available
    if (!openai) {
      console.error('OpenAI client not initialized. Check OPENAI_API_KEY environment variable.');
      return NextResponse.json(
        { error: 'OpenAI client configuration error' }, 
        { status: 500 }
      );
    }

    console.log('Generating image with DALL-E for prompt:', prompt);
    
    // Make the actual API call to DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3", // Using DALL-E 3 for higher quality images
      prompt: `Album cover art for music: ${prompt}. Make it professional quality, high-resolution, visually striking with stylish typography.`,
      n: 1,
      size: "1024x1024",
      quality: "hd", // Use HD quality for better results
      style: "vivid", // More creative and vibrant style
    });

    // Log the response for debugging
    console.log('DALL-E response:', JSON.stringify(response.data));

    // Return the image URL
    if (response.data && response.data.length > 0 && response.data[0].url) {
      return NextResponse.json({ url: response.data[0].url });
    } else {
      throw new Error('Invalid response from DALL-E API');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}