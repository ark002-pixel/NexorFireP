'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAnalyticsData() {
    try {
        // Aggregate Incident Data
        const totalIncidents = await prisma.incident.count();
        const incidentsByType = await prisma.incident.groupBy({
            by: ['type'],
            _count: {
                type: true,
            },
        });

        // Aggregate Inspection Data
        const totalInspections = await prisma.inspection.count();
        const inspectionsByStatus = await prisma.inspection.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
        });

        // Aggregate Building Data
        const totalBuildings = await prisma.building.count();

        return {
            incidents: {
                total: totalIncidents,
                byType: incidentsByType,
            },
            inspections: {
                total: totalInspections,
                byStatus: inspectionsByStatus,
            },
            buildings: {
                total: totalBuildings,
            }
        };
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        // Return fallback data to prevent crash
        return {
            incidents: { total: 0, byType: [] },
            inspections: { total: 0, byStatus: [] },
            buildings: { total: 0 }
        };
    }
}

export async function getInvestigations() {
    try {
        // Since we can't create a new Investigation model yet, 
        // we'll fetch Incidents that might be flagged for investigation 
        // (e.g., 'Fire' type) as a placeholder.
        return await prisma.incident.findMany({
            where: {
                type: {
                    in: ['Fire', 'Explosion', 'HazMat']
                }
            },
            orderBy: {
                date: 'desc'
            },
            take: 10
        });
    } catch (error) {
        console.error('Error fetching investigations:', error);
        return [];
    }
}
