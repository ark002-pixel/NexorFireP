'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default Leaflet markers in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom icons
const inspectorIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const completedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function LiveRouteMap({ routes }: { routes: any[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />;
    }

    // Calculate center based on first route or default to Mexico City
    const center: [number, number] = routes?.[0]?.stops?.[0]?.inspection?.building
        ? [routes[0].stops[0].inspection.building.latitude, routes[0].stops[0].inspection.building.longitude]
        : [19.4326, -99.1332];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {routes.map((route) => {
                const positions = route.stops.map((stop: any) => [
                    stop.inspection.building.latitude,
                    stop.inspection.building.longitude
                ]);

                return (
                    <div key={route.id}>
                        {/* Route Line */}
                        <Polyline positions={positions} color="#3B82F6" weight={4} opacity={0.7} />

                        {/* Stops */}
                        {route.stops.map((stop: any, index: number) => (
                            <Marker
                                key={stop.id}
                                position={[stop.inspection.building.latitude, stop.inspection.building.longitude]}
                                icon={stop.status === 'Completed' ? completedIcon : defaultIcon}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold">{index + 1}. {stop.inspection.building.name}</h3>
                                        <p className="text-sm text-gray-600">{stop.inspection.building.address}</p>
                                        <div className={`mt-2 text-xs font-bold px-2 py-1 rounded w-fit ${stop.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {stop.status === 'Completed' ? 'COMPLETADO' : 'PENDIENTE'}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Inspector: {route.inspector.name}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </div>
                );
            })}
        </MapContainer>
    );
}
