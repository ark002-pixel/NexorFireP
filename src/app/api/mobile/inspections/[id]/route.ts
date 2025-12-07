import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const { status, notes } = await request.json();

        // Validate status
        const validStatuses = ['Scheduled', 'Pending', 'In Progress', 'Completed', 'Skipped'];
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedInspection = await prisma.inspection.update({
            where: { id },
            data: {
                status: status,
                // If we had a notes field in the schema, we would update it here.
                // For now, we'll just update the status.
                // completedAt: status === 'Completed' ? new Date() : undefined 
            }
        });

        return NextResponse.json(updatedInspection);

    } catch (error) {
        console.error('Inspection update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
