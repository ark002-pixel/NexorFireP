import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const routes = await prisma.route.findMany({
            where: {
                date: {
                    gte: today
                },
                status: 'Active'
            },
            include: {
                inspector: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                stops: {
                    orderBy: {
                        sequence: 'asc'
                    },
                    include: {
                        inspection: {
                            include: {
                                building: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(routes);
    } catch (error) {
        console.error('Error fetching active routes:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
