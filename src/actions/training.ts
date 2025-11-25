'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getCourses() {
    return await prisma.course.findMany({
        orderBy: {
            name: 'asc',
        },
    });
}

export async function createCourse(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const duration = parseInt(formData.get('duration') as string) || 0;
    const type = formData.get('type') as string;
    const mandatory = formData.get('mandatory') === 'on';

    await prisma.course.create({
        data: {
            name,
            description,
            duration,
            type,
            mandatory,
        },
    });

    revalidatePath('/training');
}
