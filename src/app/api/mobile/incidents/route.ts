import { NextResponse } from 'next/server';
import { getNearbyIncidents } from '@/lib/services/safety';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = parseFloat(searchParams.get('lat') || '0');
        const lng = parseFloat(searchParams.get('lng') || '0');
        const radius = parseFloat(searchParams.get('radius') || '5'); // Default 5km radius

        if (!lat || !lng) {
            // If no coordinates provided, maybe return all active incidents? 
            // For now, let's require coordinates or default to a central point if needed.
            // But better to return error or empty if we want strict geospatial.
            // Let's return empty list if invalid coords to avoid crash
            return NextResponse.json([]);
        }

        const incidents = await getNearbyIncidents(lat, lng, radius);
        return NextResponse.json(incidents);

    } catch (error) {
        console.error('Incidents fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
