'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Component to force map resize update
function MapUpdater() {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
}

export default function InspectionMap({ inspections }: { inspections: any[] }) {
    useEffect(() => {
        // Fix Leaflet icon issues
        // We need to cast to any because _getIconUrl is private/internal
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const center: [number, number] = inspections?.[0]?.building
        ? [inspections[0].building.latitude, inspections[0].building.longitude]
        : [19.4326, -99.1332];

    const getIcon = (status: string) => {
        if (status === 'Passed') {
            return L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }
        if (status === 'Failed') {
            return L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }
        return L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    };

    return (
        <div className="h-full w-full relative z-0" style={{ minHeight: '500px' }}>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%', minHeight: '500px' }}
            >
                <MapUpdater />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {inspections.map((inspection) => (
                    <Marker
                        key={inspection.id}
                        position={[inspection.building.latitude, inspection.building.longitude]}
                        icon={getIcon(inspection.status)}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg mb-1">{inspection.building.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{inspection.building.address}</p>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${inspection.status === 'Passed' ? 'bg-green-100 text-green-700' :
                                            inspection.status === 'Failed' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {inspection.status}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(inspection.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <Link
                                    href={`/fire-prevention/inspections/run/${inspection.id}`}
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    Revisar Inspección
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
