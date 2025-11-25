'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getPermitTypes() {
    return await prisma.permitType.findMany({
        orderBy: {
            name: 'asc'
        }
    });
}

export async function createPermitType(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const duration = parseInt(formData.get('duration') as string);
    const fee = parseFloat(formData.get('fee') as string);

    await prisma.permitType.create({
        data: {
            name,
            description,
            duration,
            fee
        }
    });

    revalidatePath('/fire-prevention/permits/settings');
}
