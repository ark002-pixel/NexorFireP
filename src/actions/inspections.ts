'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getInspectionTemplates() {
    return await prisma.inspectionTemplate.findMany({
        include: {
            items: true,
            _count: {
                select: { inspections: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function getInspectionTemplate(id: string) {
    return await prisma.inspectionTemplate.findUnique({
        where: { id },
        include: {
            items: {
                orderBy: { order: 'asc' }
            }
        }
    });
}

export async function createInspectionTemplate(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;

    await prisma.inspectionTemplate.create({
        data: {
            name,
            description,
            type,
        }
    });

    revalidatePath('/fire-prevention/inspections/builder');
}

export async function addInspectionItem(templateId: string, formData: FormData) {
    const question = formData.get('question') as string;
    const type = formData.get('type') as string;
    const order = parseInt(formData.get('order') as string || '0');
    const mandatory = formData.get('mandatory') === 'on';

    await prisma.inspectionItem.create({
        data: {
            templateId,
            question,
            type,
            order,
            mandatory
        }
    });

    revalidatePath(`/fire-prevention/inspections/builder/${templateId}`);
}

export async function getFireCodes() {
    return await prisma.fireCode.findMany({
        orderBy: {
            code: 'asc'
        }
    });
}

export async function createFireCode(formData: FormData) {
    const code = formData.get('code') as string;
    const description = formData.get('description') as string;
    const source = formData.get('source') as string;

    await prisma.fireCode.create({
        data: {
            code,
            description,
            source
        }
    });

    revalidatePath('/fire-prevention/inspections/builder');
}
