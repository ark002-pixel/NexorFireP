'use client';

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default marker icon
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map({ buildings }: { buildings: any[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div style={{ height: '500px', width: '100%', backgroundColor: '#e5e7eb' }}>Cargando mapa...</div>;
    }

    return (
        <MapContainer
            center={[6.1759, -75.6087]} // Itagüí, Antioquia
            zoom={14}
            style={{ height: '500px', width: '100%', borderRadius: '8px', zIndex: 0 }}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Hybrid">
                    <TileLayer
                        url="http://mt0.google.com/vt/lyrs=y&hl=es&x={x}&y={y}&z={z}"
                        attribution="Google Maps"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Streets">
                    <TileLayer
                        url="http://mt0.google.com/vt/lyrs=m&hl=es&x={x}&y={y}&z={z}"
                        attribution="Google Maps"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Esri World Imagery">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            {buildings.map((building) => (
                <Marker
                    key={building.id}
                    position={[building.latitude, building.longitude]}
                    icon={icon}
                >
                    <Popup>
                        <strong>{building.name}</strong><br />
                        {building.address}<br />
                        {building.type}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
