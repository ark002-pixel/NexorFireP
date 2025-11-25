'use client';

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Fix for default marker icon
const iconUrl = (color: string) => `data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>
`)}`;

const getMarkerIcon = (color: string) => new L.Icon({
    iconUrl: iconUrl(color),
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const getColorForHydrant = (hydrant: any) => {
    if (hydrant.status !== 'Operational') return '#9CA3AF'; // Grey for OOS

    // NFPA Colors based on Flow Rate (GPM)
    const flow = hydrant.flowRate || 0;
    if (flow >= 1500) return '#3B82F6'; // Blue (Class AA)
    if (flow >= 1000) return '#22C55E'; // Green (Class A)
    if (flow >= 500) return '#F97316';  // Orange (Class B)
    return '#EF4444';                   // Red (Class C)
};

export default function HydrantMap({ hydrants }: { hydrants: any[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Mapa...</div>;

    // Default center (Itagüí, Antioquia)
    const center = hydrants.length > 0
        ? [hydrants[0].latitude, hydrants[0].longitude] as [number, number]
        : [6.1759, -75.6087] as [number, number]; // Itagüí coordinates

    return (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%', borderRadius: '8px', zIndex: 0 }}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Hybrid (Satelite + Calles)">
                    <TileLayer
                        url="http://mt0.google.com/vt/lyrs=y&hl=es&x={x}&y={y}&z={z}"
                        attribution="Google Maps"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Streets (Calles)">
                    <TileLayer
                        url="http://mt0.google.com/vt/lyrs=m&hl=es&x={x}&y={y}&z={z}"
                        attribution="Google Maps"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Esri World Imagery (Satelite)">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            {hydrants.map((hydrant) => (
                <Marker
                    key={hydrant.id}
                    position={[hydrant.latitude, hydrant.longitude]}
                    icon={getMarkerIcon(getColorForHydrant(hydrant))}
                >
                    <Popup>
                        <div style={{ minWidth: '200px' }}>
                            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{hydrant.address || 'Sin Dirección'}</h3>
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <p><strong>Estado:</strong> {hydrant.status === 'Operational' ? 'Operativo' : 'Fuera de Servicio'}</p>
                                <p><strong>Flujo:</strong> {hydrant.flowRate ? `${hydrant.flowRate} GPM` : 'N/A'}</p>
                                <p><strong>Presión:</strong> {hydrant.staticPressure ? `${hydrant.staticPressure} PSI` : 'N/A'}</p>
                            </div>
                            <Link href={`/hydrants/${hydrant.id}`} style={{ display: 'inline-flex', alignItems: 'center', color: '#3B82F6', fontWeight: 500, textDecoration: 'none' }}>
                                Ver Detalles <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
