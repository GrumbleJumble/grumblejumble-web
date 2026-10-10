import { NextResponse } from 'next/server';
import { searchFoursquarePlaces } from '@/lib/foursquare';
import { filterVenuesByGroupSize } from '@/lib/groupFilter';

export const runtime = 'nodejs';

export async function GET(request) {
  return handleRequest(request);
}

export async function POST(request) {
  return handleRequest(request);
}

async function handleRequest(request) {
  try {
    let lat = null;
    let lng = null;
    let radius = 5;
    let mode = 'hungry';
    let category = 'all';
    let groupSize = 'friends';

    // Parse parameters from query string or JSON body
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        lat = body.lat;
        lng = body.lng;
        radius = body.radius || 5;
        mode = body.mode || 'hungry';
        category = body.category || 'all';
        groupSize = body.groupSize || 'friends';
      } catch (e) {
        // Fallback to URL searchParams
      }
    }

    if (!lat || !lng) {
      const { searchParams } = new URL(request.url);
      lat = searchParams.get('lat') || lat;
      lng = searchParams.get('lng') || lng;
      radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')) : radius;
      mode = searchParams.get('mode') || mode;
      category = searchParams.get('category') || category;
      groupSize = searchParams.get('groupSize') || groupSize;
    }

    // IP Geolocation Fallback via Vercel Edge Headers if GPS coordinates not passed
    if (!lat || !lng) {
      const vercelLat = request.headers.get('x-vercel-ip-latitude');
      const vercelLng = request.headers.get('x-vercel-ip-longitude');
      if (vercelLat && vercelLng) {
        lat = parseFloat(vercelLat);
        lng = parseFloat(vercelLng);
      }
    }

    // Default to San Francisco coordinates if no location could be derived
    const finalLat = lat ? parseFloat(lat) : 37.7749;
    const finalLng = lng ? parseFloat(lng) : -122.4194;

    // Fetch batch of up to 20 candidate venues from Foursquare
    const rawVenues = await searchFoursquarePlaces({
      latitude: finalLat,
      longitude: finalLng,
      radiusMiles: radius,
      mode,
      categoryId: category,
      limit: 20
    });

    // Apply the group size filtering and scoring algorithm
    const filteredVenues = filterVenuesByGroupSize(rawVenues, groupSize);

    // Limit to top 9 candidates (1 decisive pick + 8 in secondary options)
    const selectedPool = filteredVenues.slice(0, 9);

    return NextResponse.json({
      success: true,
      count: selectedPool.length,
      mode,
      groupSize,
      locationUsed: { lat: finalLat, lng: finalLng },
      places: selectedPool
    }, { status: 200 });

  } catch (error) {
    console.error('[API /api/jumble Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
