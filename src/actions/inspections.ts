'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

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
                orderBy: { order: 'asc' },
                include: {
                    associatedCodes: {
                        include: {
                            fireCode: true
                        }
                    }
                }
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
    const responseType = formData.get('responseType') as string;
    const order = parseInt(formData.get('order') as string || '0');
    const mandatory = formData.get('mandatory') === 'on';
    const associatedCodes = formData.getAll('associatedCodes') as string[];

    await prisma.inspectionItem.create({
        data: {
            templateId,
            question,
            type,
            responseType,
            order,
            mandatory,
            isMandatory: mandatory,
            associatedCodes: {
                create: associatedCodes.map(codeId => ({
                    fireCodeId: codeId
                }))
            }
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

export async function getInspection(id: string) {
    return await prisma.inspection.findUnique({
        where: { id },
        include: {
            building: true,
            template: {
                include: {
                    items: {
                        orderBy: { order: 'asc' },
                        include: {
                            associatedCodes: {
                                include: {
                                    fireCode: true
                                }
                            }
                        }
                    }
                }
            },
            results: true
        }
    });
}

export async function updateInspectionResult(inspectionId: string, itemId: string, status: string, notes?: string) {
    const existing = await prisma.inspectionResult.findFirst({
        where: {
            inspectionId,
            itemId
        }
    });

    if (existing) {
        await prisma.inspectionResult.update({
            where: { id: existing.id },
            data: { status, notes }
        });
    } else {
        await prisma.inspectionResult.create({
            data: {
                inspectionId,
                itemId,
                status,
                notes
            }
        });
    }

    revalidatePath(`/fire-prevention/inspections/run/${inspectionId}`);
}

export async function getAllInspections() {
    return await prisma.inspection.findMany({
        include: {
            building: true,
            template: true
        },
        orderBy: {
            date: 'desc'
        }
    });
}

export async function uploadInspectionPhoto(formData: FormData) {
    const inspectionId = formData.get('inspectionId') as string;
    const itemId = formData.get('itemId') as string;
    const file = formData.get('photo') as File;

    if (!file || !inspectionId || !itemId) {
        throw new Error('Missing required fields');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'inspections');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const filename = `${inspectionId}-${itemId}-${Date.now()}${path.extname(file.name)}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    fs.writeFileSync(filepath, buffer);

    const photoUrl = `/uploads/inspections/${filename}`;

    // Update DB
    const existing = await prisma.inspectionResult.findFirst({
        where: {
            inspectionId,
            itemId
        }
    });

    if (existing) {
        await prisma.inspectionResult.update({
            where: { id: existing.id },
            data: { photoUrl }
        });
    } else {
        await prisma.inspectionResult.create({
            data: {
                inspectionId,
                itemId,
                status: 'Pending', // Default status if photo uploaded first
                photoUrl
            }
        });
    }

    revalidatePath(`/fire-prevention/inspections/run/${inspectionId}`);
    return { success: true, photoUrl };
}

export async function deleteInspectionTemplate(id: string) {
    // 1. Unlink inspections
    await prisma.inspection.updateMany({
        where: { templateId: id },
        data: { templateId: null }
    });

    // 2. Get all items to clean up their relations
    const items = await prisma.inspectionItem.findMany({
        where: { templateId: id },
        select: { id: true }
    });
    const itemIds = items.map(i => i.id);

    // 3. Delete related data for items
    if (itemIds.length > 0) {
        // Delete associated codes
        await prisma.inspectionItemCode.deleteMany({
            where: { inspectionItemId: { in: itemIds } }
        });

        // Delete results (WARNING: This deletes historical data for these items)
        await prisma.inspectionResult.deleteMany({
            where: { itemId: { in: itemIds } }
        });

        // Delete items
        await prisma.inspectionItem.deleteMany({
            where: { templateId: id }
        });
    }

    // 4. Delete the template
    await prisma.inspectionTemplate.delete({
        where: { id }
    });

    revalidatePath('/fire-prevention/inspections/builder');
}

export async function completeInspection(id: string) {
    await prisma.inspection.update({
        where: { id },
        data: {
            status: 'Completed'
        }
    });

    revalidatePath(`/fire-prevention/inspections/run/${id}`);
    revalidatePath('/fire-prevention/inspections');
}
