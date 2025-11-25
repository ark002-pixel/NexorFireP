'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getShifts() {
    try {
        return await prisma.shift.findMany({
            include: {
                roster: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                date: 'asc',
            },
        });
    } catch (error) {
        console.error('Error fetching shifts:', error);
        return [];
    }
}

export async function createShift(formData: FormData) {
    const name = formData.get('name') as string;
    const date = new Date(formData.get('date') as string);
    const startTime = new Date(`${formData.get('date')}T${formData.get('startTime')}`);
    const endTime = new Date(`${formData.get('date')}T${formData.get('endTime')}`);

    try {
        await prisma.shift.create({
            data: {
                name,
                date,
                startTime,
                endTime,
            },
        });

        revalidatePath('/scheduling');
    } catch (error) {
        console.error('Error creating shift:', error);
    }
}

export async function deleteShift(id: string) {
    try {
        await prisma.shift.delete({
            where: { id }
        });
        revalidatePath('/scheduling');
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error;
    }
}
