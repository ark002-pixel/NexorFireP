'use server';

import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/db';



export async function getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [activeIncidents, activeShifts, inspectionsToday, availableUnits] = await Promise.all([
        prisma.incident.count({
            where: { status: 'Open' }
        }),
        prisma.shift.count({
            where: {
                startTime: { lte: new Date() },
                endTime: { gte: new Date() }
            }
        }),
        prisma.inspection.count({
            where: {
                date: {
                    gte: today,
                    lt: tomorrow
                }
            }
        }),
        prisma.vehicle.count({
            where: { status: 'In Service' }
        })
    ]);

    // Calculate personnel on shift (sum of roster entries for active shifts)
    // Since we only counted shifts, let's get the actual roster count
    const activeShiftIds = await prisma.shift.findMany({
        where: {
            startTime: { lte: new Date() },
            endTime: { gte: new Date() }
        },
        select: { id: true }
    });

    const personnelOnShift = await prisma.rosterEntry.count({
        where: {
            shiftId: { in: activeShiftIds.map(s => s.id) }
        }
    });

    return {
        activeIncidents,
        personnelOnShift,
        inspectionsToday,
        availableUnits
    };
}

export async function getRecentActivity() {
    const [incidents, inspections, permits] = await Promise.all([
        prisma.incident.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: { units: true }
        }),
        prisma.inspection.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: { building: true }
        }),
        prisma.permit.findMany({
            take: 5,
            orderBy: { issueDate: 'desc' },
            include: { building: true, permitType: true }
        })
    ]);

    const activity = [
        ...incidents.map(i => ({
            id: i.id,
            type: 'Incident',
            title: `${i.type} - ${i.address}`,
            date: i.date,
            details: `Status: ${i.status}`
        })),
        ...inspections.map(i => ({
            id: i.id,
            type: 'Inspection',
            title: `Inspection - ${i.building.name}`,
            date: i.date,
            details: `Status: ${i.status}`
        })),
        ...permits.map(p => ({
            id: p.id,
            type: 'Permit',
            title: `Permit Issued - ${p.building.name}`,
            date: p.issueDate,
            details: `Type: ${p.permitType?.name || 'N/A'}`
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return activity;
}
