
import { prisma } from '@/lib/db';

export async function reportSafetyIncident(data: {
    reporterId: string;
    type: string;
    description: string;
    latitude: number;
    longitude: number;
}) {
    return await prisma.safetyIncident.create({
        data: {
            reporterId: data.reporterId,
            type: data.type,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            status: 'Reported'
        }
    });
}

export async function getNearbyIncidents(latitude: number, longitude: number, radiusKm: number = 5) {
    // In a real PostGIS implementation, we would use ST_DWithin
    // For now, we fetch all active incidents and filter in memory (not efficient for large datasets but works for prototype)
    const incidents = await prisma.safetyIncident.findMany({
        where: {
            status: { in: ['Reported', 'Verified'] }
        },
        include: {
            reporter: {
                select: { name: true }
            }
        }
    });

    // Implement Haversine filtering in memory
    const filteredIncidents = incidents.filter(incident => {
        const dist = getDistanceInKm(latitude, longitude, incident.latitude, incident.longitude);
        return dist <= radiusKm;
    });

    return filteredIncidents;
}

function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);

}
