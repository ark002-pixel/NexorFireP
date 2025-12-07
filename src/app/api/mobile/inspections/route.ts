import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const inspectorId = searchParams.get('inspectorId');

        if (!inspectorId) {
            return NextResponse.json({ error: 'Inspector ID required' }, { status: 400 });
        }

        const inspections = await prisma.inspection.findMany({
            where: {
                inspectorId: inspectorId,
                status: { not: 'Completed' } // Fetch pending/scheduled
            },
            include: {
                building: true,
                template: true
            },
            orderBy: {
                date: 'asc'
            }
        });

        return NextResponse.json(inspections);

    } catch (error) {
        console.error('Inspections fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
