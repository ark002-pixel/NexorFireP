'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';



export async function getActiveIncidents() {
    try {
        return await prisma.incident.findMany({
            where: { status: 'Active' },
            include: { units: true },
            orderBy: { date: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching incidents:', error);
        return [];
    }
}

export async function updateIncidentStatus(id: string, status: string) {
    try {
        await prisma.incident.update({
            where: { id },
            data: { status }
        });
        revalidatePath('/command');
        revalidatePath(`/command/incidents/${id}`);
    } catch (error) {
        console.error('Error updating incident status:', error);
    }
}

export async function assignUnit(incidentId: string, unitName: string) {
    try {
        await prisma.incidentUnit.create({
            data: {
                incidentId,
                unitName,
                dispatchTime: new Date()
            }
        });
        revalidatePath(`/command/incidents/${incidentId}`);
    } catch (error) {
        console.error('Error assigning unit:', error);
    }
}

export async function deleteIncident(id: string) {
    try {
        await prisma.incident.delete({
            where: { id }
        });
        revalidatePath('/command');
        revalidatePath('/command/incidents');
    } catch (error) {
        console.error('Error deleting incident:', error);
        throw error;
    }
}
