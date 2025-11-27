'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';



export async function getAssets() {
    try {
        const vehicles = await prisma.vehicle.findMany({
            include: { maintenance: true },
            orderBy: { name: 'asc' }
        });
        const equipment = await prisma.equipment.findMany({
            include: { maintenance: true },
            orderBy: { name: 'asc' }
        });
        return { vehicles, equipment };
    } catch (error) {
        console.error('Error fetching assets:', error);
        return { vehicles: [], equipment: [] };
    }
}

export async function createMaintenanceRecord(formData: FormData) {
    const type = formData.get('type') as string; // 'Vehicle' or 'Equipment'
    const id = formData.get('id') as string;
    const description = formData.get('description') as string;
    const maintenanceType = formData.get('maintenanceType') as string;
    const cost = parseFloat(formData.get('cost') as string) || 0;

    try {
        await prisma.assetMaintenance.create({
            data: {
                vehicleId: type === 'Vehicle' ? id : null,
                equipmentId: type === 'Equipment' ? id : null,
                date: new Date(),
                type: maintenanceType,
                description,
                cost,
            }
        });

        revalidatePath('/assets');
    } catch (error) {
        console.error('Error creating maintenance record:', error);
    }
}

export async function deleteVehicle(id: string) {
    try {
        await prisma.vehicle.delete({ where: { id } });
        revalidatePath('/assets');
        revalidatePath('/assets/vehicles');
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
}

export async function deleteEquipment(id: string) {
    try {
        await prisma.equipment.delete({ where: { id } });
        revalidatePath('/assets');
        revalidatePath('/assets/equipment');
    } catch (error) {
        console.error('Error deleting equipment:', error);
        throw error;
    }
}
