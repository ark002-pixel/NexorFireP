'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getVehicles() {
    return await prisma.vehicle.findMany({
        orderBy: {
            name: 'asc',
        },
    });
}

export async function createVehicle(formData: FormData) {
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const status = formData.get('status') as string;
    const mileage = parseInt(formData.get('mileage') as string) || 0;

    await prisma.vehicle.create({
        data: {
            name,
            type,
            status,
            mileage,
        },
    });

    revalidatePath('/inventory');
}
