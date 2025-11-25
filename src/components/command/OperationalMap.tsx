'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom Icons
const fireIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const unitIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface OperationalMapProps {
    height?: string;
    incidents?: any[];
    units?: any[];
}

export default function OperationalMap({ height = '600px', incidents = [], units = [] }: OperationalMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div style={{ height, width: '100%', backgroundColor: '#E5E7EB', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Cargando Mapa Operativo...</p>
            </div>
        );
    }

    // Default center (Bogotá, Colombia as example, or user's location)
    const center: [number, number] = [4.6097, -74.0817];

    return (
        <MapContainer center={center} zoom={13} style={{ height, width: '100%', borderRadius: '12px', zIndex: 0 }} zoomControl={false}>
            <ZoomControl position="bottomright" />

            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Callejero (OpenStreetMap)">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Satelital (Esri)">
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Topográfico (OpenTopoMap)">
                    <TileLayer
                        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            {/* Mock Data Markers if real data is empty */}
            {incidents.length === 0 && (
                <>
                    <Marker position={[4.6097, -74.0817]} icon={fireIcon}>
                        <Popup>
                            <strong>Incendio Estructural</strong><br />
                            Calle 10 # 5-20<br />
                            Estado: Activo
                        </Popup>
                    </Marker>
                    <Marker position={[4.6150, -74.0900]} icon={unitIcon}>
                        <Popup>
                            <strong>Unidad M-101</strong><br />
                            En ruta
                        </Popup>
                    </Marker>
                </>
            )}

            {incidents.map((incident) => (
                <Marker
                    key={incident.id}
                    position={[incident.latitude || 4.6097, incident.longitude || -74.0817]}
                    icon={fireIcon}
                >
                    <Popup>
                        <strong>{incident.type}</strong><br />
                        {incident.address}<br />
                        Estado: {incident.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
