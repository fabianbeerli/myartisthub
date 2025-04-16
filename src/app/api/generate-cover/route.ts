import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    // Log environment variables for debugging (excluding the actual key value)
    console.log('Environment variables check:');
    console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
    console.log('USE_REAL_API value:', process.env.USE_REAL_API);
    console.log('NODE_ENV value:', process.env.NODE_ENV);

    // Check if we have an API key in the environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.log('Using mock response since OPENAI_API_KEY is missing');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        url: `https://placehold.co/1024x1024/8a2be2/ffffff?text=Album+Cover:+${encodeURIComponent(prompt.substring(0, 30))}`
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Making request to DALL-E API with prompt:', prompt);
    
    // Make the actual API call to DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Album cover art for music: ${prompt}. Make it professional quality, high-resolution, visually striking with stylish typography.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    });

    console.log('DALL-E response received:', JSON.stringify(response.data));

    return NextResponse.json({
      url: response.data[0].url
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}