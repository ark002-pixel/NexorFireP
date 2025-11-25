'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getServiceProviders() {
    return await prisma.serviceProvider.findMany({
        orderBy: {
            name: 'asc',
        },
    });
}

export async function getSystems() {
    return await prisma.system.findMany({
        include: {
            building: true,
            provider: true,
            maintenanceRecords: {
                orderBy: {
                    date: 'desc',
                },
                take: 1,
            },
        },
        orderBy: {
            nextServiceDate: 'asc',
        },
    });
}

export async function createServiceProvider(formData: FormData) {
    const name = formData.get('name') as string;
    const contactName = formData.get('contactName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const license = formData.get('license') as string;
    const status = 'Active';

    await prisma.serviceProvider.create({
        data: {
            name,
            contactName,
            email,
            phone,
            license,
            status,
        },
    });

    revalidatePath('/itm');
}
