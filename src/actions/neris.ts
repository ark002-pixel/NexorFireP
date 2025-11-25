'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getIncidents() {
    return await prisma.incident.findMany({
        include: {
            units: true,
        },
        orderBy: {
            date: 'desc',
        },
    });
}

export async function createIncident(formData: FormData) {
    const date = new Date(formData.get('date') as string);
    const type = formData.get('type') as string;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;
    const status = 'Open';

    await prisma.incident.create({
        data: {
            date,
            type,
            address,
            description,
            status,
        },
    });

    revalidatePath('/neris');
}
