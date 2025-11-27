'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';



export async function getResidents() {
    return await prisma.resident.findMany({
        include: {
            medicalProfile: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
}

export async function createResident(formData: FormData) {
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const accessCode = formData.get('accessCode') as string;
    const functionalNeeds = formData.get('functionalNeeds') as string;

    const conditions = formData.get('conditions') as string;
    const allergies = formData.get('allergies') as string;

    await prisma.resident.create({
        data: {
            name,
            address,
            phone,
            accessCode,
            functionalNeeds,
            medicalProfile: {
                create: {
                    conditions,
                    allergies,
                },
            },
        },
    });

    revalidatePath('/community');
}
