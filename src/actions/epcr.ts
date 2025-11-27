'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';



export async function getPCRs() {
    return await prisma.pCR.findMany({
        include: {
            patient: true,
            incident: true,
            medic: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getPCR(id: string) {
    return await prisma.pCR.findUnique({
        where: { id },
        include: {
            patient: {
                include: {
                    allergies: true,
                    history: true,
                }
            },
            incident: true,
            medic: true,
            vitalSigns: { orderBy: { time: 'asc' } },
            medications: { orderBy: { time: 'asc' } },
            procedures: { orderBy: { time: 'asc' } },
        },
    });
}

export async function createPCR(formData: FormData) {
    // Basic creation - will be expanded in the full form
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const chiefComplaint = formData.get('chiefComplaint') as string;
    const narrative = formData.get('narrative') as string;

    // Create Patient (Simplified for now)
    const patient = await prisma.patient.create({
        data: {
            firstName,
            lastName,
        },
    });

    await prisma.pCR.create({
        data: {
            patientId: patient.id,
            chiefComplaint,
            narrative,
            dispatchTime: new Date(), // Default to now
        },
    });

    revalidatePath('/epcr');
}

export async function deletePCR(id: string) {
    try {
        // Delete related data first (cascade should handle this but being safe)
        await prisma.vitalSign.deleteMany({ where: { pcrId: id } });
        await prisma.medicationAdministered.deleteMany({ where: { pcrId: id } });
        await prisma.procedurePerformed.deleteMany({ where: { pcrId: id } });

        await prisma.pCR.delete({ where: { id } });
        revalidatePath('/epcr');
    } catch (error) {
        console.error('Error deleting PCR:', error);
        throw error;
    }
}

export async function updatePCR(id: string, data: any) {
    try {
        await prisma.pCR.update({
            where: { id },
            data: data,
        });
        revalidatePath(`/epcr/${id}`);
        revalidatePath('/epcr');
    } catch (error) {
        console.error('Error updating PCR:', error);
        throw error;
    }
}

export async function addVitalSign(pcrId: string, data: any) {
    try {
        await prisma.vitalSign.create({
            data: {
                pcrId,
                ...data,
                time: new Date(),
            }
        });
        revalidatePath(`/epcr/${pcrId}`);
    } catch (error) {
        console.error('Error adding vital sign:', error);
        throw error;
    }
}

export async function updatePatient(id: string, data: any) {
    try {
        await prisma.patient.update({
            where: { id },
            data: data,
        });
        revalidatePath('/epcr');
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}

export async function addPatientAllergy(patientId: string, allergen: string, reaction: string) {
    try {
        await prisma.patientAllergy.create({
            data: {
                patientId,
                allergen,
                reaction,
            }
        });
        revalidatePath('/epcr');
    } catch (error) {
        console.error('Error adding allergy:', error);
        throw error;
    }
}

export async function addPatientHistory(patientId: string, condition: string, notes: string) {
    try {
        await prisma.patientHistory.create({
            data: {
                patientId,
                condition,
                notes,
            }
        });
        revalidatePath('/epcr');
    } catch (error) {
        console.error('Error adding history:', error);
        throw error;
    }
}

export async function addMedication(pcrId: string, name: string, dose: string, route: string, response: string) {
    try {
        await prisma.medicationAdministered.create({
            data: {
                pcrId,
                name,
                dose,
                route,
                response,
                time: new Date(),
            }
        });
        revalidatePath(`/epcr/${pcrId}`);
    } catch (error) {
        console.error('Error adding medication:', error);
        throw error;
    }
}

export async function addProcedure(pcrId: string, name: string, successful: boolean, notes: string) {
    try {
        await prisma.procedurePerformed.create({
            data: {
                pcrId,
                name,
                successful,
                notes,
                time: new Date(),
            }
        });
        revalidatePath(`/epcr/${pcrId}`);
    } catch (error) {
        console.error('Error adding procedure:', error);
        throw error;
    }
}
