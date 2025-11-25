'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getHydrants() {
    return await prisma.hydrant.findMany({
        include: {
            inspections: {
                orderBy: {
                    date: 'desc',
                },
                take: 1,
            },
        },
    });
}

export async function getHydrant(id: string) {
    return await prisma.hydrant.findUnique({
        where: { id },
        include: {
            inspections: {
                orderBy: {
                    date: 'desc',
                },
            },
        },
    });
}

export async function createHydrant(formData: FormData) {
    const data = {
        address: formData.get('address') as string,
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        status: formData.get('status') as string,
        flowRate: parseInt(formData.get('flowRate') as string) || null,
        make: formData.get('make') as string,
        model: formData.get('model') as string,
        year: parseInt(formData.get('year') as string) || null,
        outlets: formData.get('outlets') as string,
        mainSize: parseFloat(formData.get('mainSize') as string) || null,
        color: formData.get('color') as string,
        notes: formData.get('notes') as string,
    };

    await prisma.hydrant.create({ data });
    revalidatePath('/hydrants');
}

export async function updateHydrant(id: string, data: any) {
    await prisma.hydrant.update({
        where: { id },
        data,
    });
    revalidatePath(`/hydrants/${id}`);
    revalidatePath('/hydrants');
}

export async function deleteHydrant(id: string) {
    await prisma.hydrantInspection.deleteMany({ where: { hydrantId: id } });
    await prisma.hydrant.delete({ where: { id } });
    revalidatePath('/hydrants');
}

export async function addHydrantInspection(hydrantId: string, data: any) {
    await prisma.hydrantInspection.create({
        data: {
            hydrantId,
            date: new Date(),
            ...data,
        },
    });

    // Update hydrant flow rate and status based on latest inspection
    if (data.flowRate) {
        await prisma.hydrant.update({
            where: { id: hydrantId },
            data: {
                flowRate: data.flowRate,
                lastServiceDate: new Date()
            }
        });
    }

    revalidatePath(`/hydrants/${hydrantId}`);
    revalidatePath('/hydrants');
}
