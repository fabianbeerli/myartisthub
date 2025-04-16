import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if we have the OpenAI API key in environment
    const hasApiKey = !!process.env.OPENAI_API_KEY;
    
    // Log environment info for debugging
    console.log({
      hasApiKey,
      useRealApi: process.env.USE_REAL_API,
      nodeEnv: process.env.NODE_ENV,
      // List all environment variables (omitting values)
      envVars: Object.keys(process.env)
    });
    
    return NextResponse.json({
      status: 'ok',
      hasApiKey,
      envVars: Object.keys(process.env),
      useRealApi: process.env.USE_REAL_API,
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error: any) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { 
        error: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}