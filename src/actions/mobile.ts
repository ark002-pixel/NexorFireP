'use server';

import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/db';



export async function getActiveDispatches() {
    return await prisma.incident.findMany({
        where: {
            status: 'Open',
        },
        include: {
            units: true,
        },
        orderBy: {
            date: 'desc',
        },
    });
}
