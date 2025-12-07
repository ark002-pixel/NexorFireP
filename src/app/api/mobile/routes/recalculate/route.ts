import { NextResponse } from 'next/server';
import { recalculateRoute } from '@/lib/services/routing';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { routeId, lat, lng } = body;

        if (!routeId) {
            return NextResponse.json({ error: 'Route ID required' }, { status: 400 });
        }

        const updatedRoute = await recalculateRoute(routeId, lat, lng);

        if (!updatedRoute) {
            return NextResponse.json({ error: 'Route not found or failed to recalculate' }, { status: 404 });
        }

        return NextResponse.json(updatedRoute);

    } catch (error) {
        console.error('Recalculate route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
