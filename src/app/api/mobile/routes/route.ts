import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateDailyRoute, getActiveRoute } from '@/lib/services/routing';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const inspectorId = searchParams.get('inspectorId');

        if (!inspectorId) {
            return NextResponse.json({ error: 'Inspector ID required' }, { status: 400 });
        }

        // 1. Try to get existing active route
        let route = await getActiveRoute(inspectorId);

        // 2. If no route exists, generate one for today
        if (!route) {
            route = await generateDailyRoute(inspectorId, new Date());
        }

        if (!route) {
            return NextResponse.json({ message: 'No inspections scheduled for today' });
        }

        return NextResponse.json(route);

    } catch (error) {
        console.error('Route fetch error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
