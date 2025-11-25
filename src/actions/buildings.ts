'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createBuilding(formData: FormData) {
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const type = formData.get('type') as string;
    const floors = parseInt(formData.get('floors') as string);
    const area = parseFloat(formData.get('area') as string);
    const occupancyLoad = parseInt(formData.get('occupancy') as string);
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);

    // Risk Classification Algorithm
    let riskLevel = 'Low';
    if (type === 'Industrial' || floors > 5 || area > 1000 || occupancyLoad > 500) {
        riskLevel = 'High';
    } else if (type === 'Commercial' || (floors >= 3 && floors <= 5) || (area >= 500 && area <= 1000) || (occupancyLoad >= 100 && occupancyLoad <= 500)) {
        riskLevel = 'Medium';
    }

    await prisma.building.create({
        data: {
            name,
            address,
            city,
            latitude,
            longitude,
            type,
            floors,
            area,
            occupancy: occupancyLoad.toString(),
            riskLevel,
            prePlan: {
                create: {
                    accessNotes: formData.get('accessNotes') as string,
                    hydrantInfo: formData.get('hydrantInfo') as string,
                    utilityGasShutoff: formData.get('utilityGasShutoff') as string,
                    utilityWaterShutoff: formData.get('utilityWaterShutoff') as string,
                    utilityElectricShutoff: formData.get('utilityElectricShutoff') as string,
                    keyBoxLocation: formData.get('keyBoxLocation') as string,
                    fdcLocation: formData.get('fdcLocation') as string,
                    specialHazards: formData.get('specialHazards') as string,
                    roofConstruction: formData.get('roofConstruction') as string,
                    floorConstruction: formData.get('floorConstruction') as string,
                }
            }
        }
    });

    revalidatePath('/pre-incident-planning');
}

export async function updateBuilding(id: string, data: any) {
    const { prePlan, ...buildingData } = data;

    await prisma.building.update({
        where: { id },
        data: {
            ...buildingData,
            prePlan: {
                upsert: {
                    create: prePlan,
                    update: prePlan
                }
            }
        }
    });
    revalidatePath('/pre-incident-planning');
}

export async function deleteBuilding(id: string) {
    // PrePlan is deleted via cascade if configured, but explicit delete is safer if not
    const prePlan = await prisma.prePlan.findUnique({ where: { buildingId: id } });
    if (prePlan) {
        await prisma.prePlan.delete({ where: { id: prePlan.id } });
    }
    await prisma.building.delete({ where: { id } });
    revalidatePath('/pre-incident-planning');
}

export async function getBuildings() {
    return await prisma.building.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            prePlan: {
                include: {
                    contacts: true,
                    hazmats: true,
                    attachments: true,
                    annotations: true
                }
            }
        }
    });
}

// Sub-item Actions

export async function addPrePlanContact(prePlanId: string, data: any) {
    await prisma.prePlanContact.create({
        data: { prePlanId, ...data }
    });
    revalidatePath('/pre-incident-planning');
}

export async function deletePrePlanContact(id: string) {
    await prisma.prePlanContact.delete({ where: { id } });
    revalidatePath('/pre-incident-planning');
}

export async function addPrePlanHazMat(prePlanId: string, data: any) {
    await prisma.prePlanHazMat.create({
        data: { prePlanId, ...data }
    });
    revalidatePath('/pre-incident-planning');
}

export async function deletePrePlanHazMat(id: string) {
    await prisma.prePlanHazMat.delete({ where: { id } });
    revalidatePath('/pre-incident-planning');
}

export async function addPrePlanAnnotation(prePlanId: string, data: any) {
    await prisma.prePlanAnnotation.create({
        data: { prePlanId, ...data }
    });
    revalidatePath('/pre-incident-planning');
}

export async function deletePrePlanAnnotation(id: string) {
    await prisma.prePlanAnnotation.delete({ where: { id } });
    revalidatePath('/pre-incident-planning');
}

export async function addPrePlanAttachment(prePlanId: string, data: any) {
    await prisma.prePlanAttachment.create({
        data: { prePlanId, ...data }
    });
    revalidatePath('/pre-incident-planning');
}

export async function deletePrePlanAttachment(id: string) {
    await prisma.prePlanAttachment.delete({ where: { id } });
    revalidatePath('/pre-incident-planning');
}
