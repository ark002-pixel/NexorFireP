'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getInspections() {
    try {
        return await prisma.inspection.findMany({
            include: {
                building: true,
                violations: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
    } catch (error) {
        console.error('Error fetching inspections:', error);
        return [];
    }
}

export async function getInspectionById(id: string) {
    try {
        return await prisma.inspection.findUnique({
            where: { id },
            include: {
                building: true,
                violations: true,
            }
        });
    } catch (error) {
        console.error('Error fetching inspection:', error);
        return null;
    }
}

export async function getPermits() {
    try {
        return await prisma.permit.findMany({
            include: {
                building: true,
            },
            orderBy: {
                expiryDate: 'asc',
            },
        });
    } catch (error) {
        console.error('Error fetching permits:', error);
        return [];
    }
}

export async function getInspectionTemplates() {
    return [];
}

export async function createInspection(formData: FormData) {
    const buildingId = formData.get('buildingId') as string;
    const date = new Date(formData.get('date') as string);
    const status = 'Scheduled';

    try {
        await prisma.inspection.create({
            data: {
                buildingId,
                date,
                status,
            },
        });

        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/inspections');
    } catch (error) {
        console.error('Error creating inspection:', error);
    }
}

export async function updateInspection(id: string, formData: FormData) {
    const date = new Date(formData.get('date') as string);
    const status = formData.get('status') as string;

    try {
        await prisma.inspection.update({
            where: { id },
            data: {
                date,
                status,
            },
        });

        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/inspections');
    } catch (error) {
        console.error('Error updating inspection:', error);
    }
}

export async function createPermit(formData: FormData) {
    const buildingId = formData.get('buildingId') as string;

    // Fallback logic
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(issueDate.getDate() + 365);

    try {
        const permit = await prisma.permit.create({
            data: {
                buildingId,
                // type: 'Standard', // Removed as it does not exist in schema
                status: 'Active',
                issueDate,
                expiryDate,
            }
        });

        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/permits');
        return { permit };
    } catch (error) {
        console.error('Error creating permit:', error);
        return { permit: null };
    }
}

export async function deleteInspection(id: string) {
    console.log(`Server Action: deleteInspection called for id: ${id}`);
    try {
        console.log('Deleting related Violations...');
        await prisma.violation.deleteMany({ where: { inspectionId: id } });

        console.log('Deleting Inspection...');
        await prisma.inspection.delete({
            where: { id }
        });
        console.log('Inspection deleted successfully.');
        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/inspections');
        return { success: true };
    } catch (error) {
        console.error('Error deleting inspection:', error);
        return { success: false, error: String(error) };
    }
}

export async function deletePermit(id: string) {
    try {
        await prisma.permit.delete({
            where: { id }
        });
        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/permits');
    } catch (error) {
        console.error('Error deleting permit:', error);
    }
}

export async function revokePermit(id: string) {
    try {
        await prisma.permit.update({
            where: { id },
            data: { status: 'Revoked' }
        });
        revalidatePath('/fire-prevention');
        revalidatePath('/fire-prevention/permits');
    } catch (error) {
        console.error('Error revoking permit:', error);
    }
}
