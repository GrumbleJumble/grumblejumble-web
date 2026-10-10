import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    // Check Vercel native headers
    const vercelCity = request.headers.get('x-vercel-ip-city');
    const vercelRegion = request.headers.get('x-vercel-ip-country-region');
    const vercelLat = request.headers.get('x-vercel-ip-latitude');
    const vercelLng = request.headers.get('x-vercel-ip-longitude');

    if (vercelLat && vercelLng) {
      return NextResponse.json({
        success: true,
        city: vercelCity ? decodeURIComponent(vercelCity) : 'Nearby',
        region: vercelRegion || '',
        lat: parseFloat(vercelLat),
        lng: parseFloat(vercelLng),
        source: 'vercel-ip'
      });
    }

    // Default fallback
    return NextResponse.json({
      success: true,
      city: 'San Francisco',
      region: 'CA',
      lat: 37.7749,
      lng: -122.4194,
      source: 'default'
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      city: 'Nearby',
      lat: 37.7749,
      lng: -122.4194,
      source: 'fallback'
    });
  }
}
