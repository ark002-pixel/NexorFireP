'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
