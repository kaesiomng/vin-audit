import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const vincode = searchParams.get('vincode');
  
  if (!vincode) {
    return NextResponse.json({ error: 'VIN code is required' }, { status: 400 });
  }

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_KEY || !API_BASE_URL) {
    return NextResponse.json({ error: 'API configuration missing' }, { status: 500 });
  }

  try {
    console.log(`Making Carfax API call to: ${API_BASE_URL}/api/v1/carfax/check?vincode=${vincode}&api_key=${API_KEY}`);
    
    const response = await fetch(`${API_BASE_URL}/api/v1/carfax/check?vincode=${vincode}&api_key=${API_KEY}`);
    
    console.log('Carfax API response status:', response.status);
    console.log('Carfax API response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Carfax API raw response:', responseText);
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Carfax response as JSON:', parseError);
      return NextResponse.json({ 
        error: 'Invalid response format from Carfax API',
        rawResponse: responseText.substring(0, 200) + '...'
      }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Carfax API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Carfax data', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}