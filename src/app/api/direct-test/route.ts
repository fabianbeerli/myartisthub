import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' }, 
        { status: 400 }
      );
    }

    // Initialize OpenAI client with provided API key
    const openai = new OpenAI({
      apiKey,
    });

    try {
      // Test the API key with a simple models.list call
      const models = await openai.models.list();
      
      // Find DALL-E models
      const dalleModels = models.data.filter(model => 
        model.id.includes('dall-e')
      );
      
      return NextResponse.json({
        success: true,
        message: 'API key is valid',
        models: {
          total: models.data.length,
          dalleModels: dalleModels.map(m => m.id),
          allModels: models.data.map(m => m.id)
        }
      });
    } catch (error: any) {
      // Handle OpenAI API errors
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : undefined
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error testing API key:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to test API key' },
      { status: 500 }
    );
  }
}