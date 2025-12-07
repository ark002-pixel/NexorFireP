
'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function simulateRoute() {
    // 1. Get the first user (acting as the logged-in inspector)
    const user = await prisma.user.findFirst();
    if (!user) return { error: 'No user found' };

    // 2. Create some dummy buildings if they don't exist
    const buildingData = [
        { name: 'Centro Comercial Andino', address: 'Cra 11 #82-71', lat: 4.666, lng: -74.054 },
        { name: 'Torre Colpatria', address: 'Cra 7 #24-89', lat: 4.610, lng: -74.071 },
        { name: 'Estadio El Campín', address: 'Cra 30 #57-60', lat: 4.646, lng: -74.077 }
    ];

    const inspections = [];

    for (const b of buildingData) {
        let building = await prisma.building.findFirst({ where: { name: b.name } });
        if (!building) {
            building = await prisma.building.create({
                data: {
                    name: b.name,
                    address: b.address,
                    city: 'Bogotá',
                    latitude: b.lat,
                    longitude: b.lng,
                    type: 'Commercial',
                    floors: 10
                }
            });
        }

        // Create an inspection for this building
        const inspection = await prisma.inspection.create({
            data: {
                buildingId: building.id,
                inspectorId: user.id,
                status: 'Scheduled',
                date: new Date(),
                mode: 'In-Person'
            }
        });
        inspections.push(inspection);
    }

    // 3. Create the Route
    const route = await prisma.route.create({
        data: {
            inspectorId: user.id,
            date: new Date(),
            status: 'InProgress',
            totalDistance: 15000, // 15km mock
            totalTime: 120, // 2 hours mock
            stops: {
                create: inspections.map((inspection, index) => ({
                    inspectionId: inspection.id,
                    sequence: index + 1,
                    status: index === 0 ? 'Pending' : 'Pending', // First one pending
                    estimatedArrival: new Date(new Date().getTime() + index * 3600000) // +1 hour each
                }))
            }
        }
    });

    revalidatePath('/mobile/routes');
    return { success: true, routeId: route.id };
}
