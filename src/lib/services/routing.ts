
import { prisma } from '@/lib/db';

// Facade Interface for Routing Provider
interface RoutingProvider {
    calculateRoute(stops: { lat: number; lng: number }[]): Promise<{
        orderedStops: number[]; // Indices of stops in optimized order
        totalDistance: number;
        totalTime: number;
        geometry: string; // Polyline
    }>;
}

// Mock Provider (Simple implementation for now, can be replaced with Google/Mapbox)
// Optimized Provider using Nearest Neighbor Heuristic
class OptimizedRoutingProvider implements RoutingProvider {
    async calculateRoute(stops: { lat: number; lng: number }[]): Promise<{
        orderedStops: number[];
        totalDistance: number;
        totalTime: number;
        geometry: string;
    }> {
        if (stops.length === 0) {
            return { orderedStops: [], totalDistance: 0, totalTime: 0, geometry: '' };
        }

        const visited = new Set<number>();
        const orderedStops: number[] = [];
        let currentStopIndex = 0; // Start at the first stop (or depot)
        let totalDistance = 0;

        // Simple Nearest Neighbor Algorithm
        // 1. Start at the first point
        // 2. Find the nearest unvisited point
        // 3. Move there, add to path
        // 4. Repeat until all visited

        // Assuming index 0 is the start point (e.g., Fire Station)
        // If not, we could add a "start" parameter
        orderedStops.push(0);
        visited.add(0);
        currentStopIndex = 0;

        while (visited.size < stops.length) {
            let nearestIndex = -1;
            let minDistance = Infinity;

            for (let i = 0; i < stops.length; i++) {
                if (!visited.has(i)) {
                    const dist = this.getDistance(
                        stops[currentStopIndex].lat, stops[currentStopIndex].lng,
                        stops[i].lat, stops[i].lng
                    );
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestIndex = i;
                    }
                }
            }

            if (nearestIndex !== -1) {
                visited.add(nearestIndex);
                orderedStops.push(nearestIndex);
                totalDistance += minDistance;
                currentStopIndex = nearestIndex;
            } else {
                break; // Should not happen
            }
        }

        // Estimate time: Avg speed 30km/h in city
        const avgSpeedKmH = 30;
        const totalTimeHours = totalDistance / avgSpeedKmH;
        const totalTimeMinutes = Math.round(totalTimeHours * 60);

        return {
            orderedStops,
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            totalTime: totalTimeMinutes,
            geometry: '' // In a real app, we'd fetch this from OSRM/Google
        };
    }

    // Haversine formula for distance in km
    private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}

const routingProvider: RoutingProvider = new OptimizedRoutingProvider();

export async function generateDailyRoute(inspectorId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Fetch assigned inspections for the day
    const inspections = await prisma.inspection.findMany({
        where: {
            inspectorId: inspectorId,
            date: {
                gte: startOfDay,
                lt: endOfDay
            },
            status: 'Scheduled'
        },
        include: {
            building: true
        },
        orderBy: {
            priority: 'desc' // Process high priority first if we were doing time windows
        }
    });

    if (inspections.length === 0) return null;

    // 2. Prepare stops for the provider
    // We could add the Fire Station as the first "stop" (index 0) to optimize from there
    // For now, we optimize relative to the first inspection in the list (or we could pick the northernmost)
    const stops = inspections.map((i: any) => ({
        lat: i.building.latitude,
        lng: i.building.longitude
    }));

    // 3. Calculate optimal route
    const routeResult = await routingProvider.calculateRoute(stops);

    // 4. Save Route to DB
    const route = await prisma.route.create({
        data: {
            inspectorId: inspectorId,
            date: date,
            status: 'Planned',
            totalDistance: routeResult.totalDistance,
            totalTime: routeResult.totalTime,
            stops: {
                create: routeResult.orderedStops.map((originalIndex, sequence) => ({
                    inspectionId: inspections[originalIndex].id,
                    sequence: sequence + 1,
                    status: 'Pending',
                    estimatedArrival: new Date(date.getTime() + (sequence * 30 * 60000)) // Mock: +30 mins per stop
                }))
            }
        },
        include: {
            stops: {
                include: {
                    inspection: {
                        include: { building: true }
                    }
                }
            }
        }
    });

    return route;
}

export async function getActiveRoute(inspectorId: string) {
    const today = new Date();
    return await prisma.route.findFirst({
        where: {
            inspectorId,
            date: {
                gte: new Date(today.setHours(0, 0, 0, 0)),
                lt: new Date(today.setHours(23, 59, 59, 999))
            }
        },
        include: {
            stops: {
                include: {
                    inspection: {
                        include: { building: true }
                    }
                },
                orderBy: {
                    sequence: 'asc'
                }
            }
        }
    });
}

export async function recalculateRoute(routeId: string, currentLat?: number, currentLng?: number) {
    // 1. Fetch Route and Stops
    const route = await prisma.route.findUnique({
        where: { id: routeId },
        include: {
            stops: {
                include: {
                    inspection: {
                        include: { building: true }
                    }
                }
            }
        }
    });

    if (!route) return null;

    const pendingStops = route.stops.filter(s => s.status === 'Pending');
    if (pendingStops.length === 0) return route;

    // 2. Prepare stops for optimization
    // We map them to a structure that keeps track of their ID
    let stopsToOptimize = pendingStops.map(s => ({
        lat: s.inspection?.building?.latitude || 0,
        lng: s.inspection?.building?.longitude || 0,
        id: s.id
    }));

    // 3. Determine Start Point (Anchor)
    // If current location is provided, use it.
    // Otherwise, use the last completed stop.
    // If neither, we just optimize the pending list starting from the first one in the list.
    let startPoint = null;
    if (currentLat && currentLng) {
        startPoint = { lat: currentLat, lng: currentLng };
    } else {
        const completedStops = route.stops
            .filter(s => s.status === 'Completed')
            .sort((a, b) => a.sequence - b.sequence);

        if (completedStops.length > 0) {
            const last = completedStops[completedStops.length - 1];
            if (last.inspection?.building) {
                startPoint = {
                    lat: last.inspection.building.latitude,
                    lng: last.inspection.building.longitude
                };
            }
        }
    }

    // If we have a start point, prepend it as a "virtual" stop
    if (startPoint) {
        stopsToOptimize.unshift({ ...startPoint, id: 'START_POINT' });
    }

    // 4. Calculate Route
    const providerInput = stopsToOptimize.map(s => ({ lat: s.lat, lng: s.lng }));
    const result = await routingProvider.calculateRoute(providerInput);

    // 5. Update Sequences in DB
    const maxCompletedSequence = route.stops
        .filter(s => s.status === 'Completed')
        .reduce((max, s) => Math.max(max, s.sequence), 0);

    let newSequenceCounter = maxCompletedSequence + 1;
    const updatePromises = [];

    // result.orderedStops contains indices of providerInput
    for (const index of result.orderedStops) {
        const stop = stopsToOptimize[index];

        // Skip the virtual start point
        if (stop.id === 'START_POINT') continue;

        // Update the sequence of the actual stop
        updatePromises.push(prisma.routeStop.update({
            where: { id: stop.id },
            data: {
                sequence: newSequenceCounter++
                // We could also update estimatedArrival here if we had a more robust time calculation
            }
        }));
    }

    if (updatePromises.length > 0) {
        await prisma.$transaction(updatePromises);
    }

    // Return the updated route
    return await prisma.route.findUnique({
        where: { id: routeId },
        include: {
            stops: {
                include: {
                    inspection: { include: { building: true } }
                },
                orderBy: { sequence: 'asc' }
            }
        }
    });
}

