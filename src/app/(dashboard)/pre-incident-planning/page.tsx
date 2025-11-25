export const dynamic = 'force-dynamic';
'use client';

import { getBuildings } from '@/actions/buildings';
import { Plus, Building as BuildingIcon } from 'lucide-react';
import nextDynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import NewBuildingForm from '@/components/pre-incident/NewBuildingForm';
import EditBuildingForm from '@/components/pre-incident/EditBuildingForm';

// Dynamically import Map to avoid SSR issues with Leaflet
const MapComponent = nextDynamic(() => import('@/components/pre-incident/Map'), {
    ssr: false,
    loading: () => <div style={{ height: '500px', width: '100%', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div>
});

export default function PreIncidentPage() {
    const [buildings, setBuildings] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBuilding, setEditingBuilding] = useState<any>(null);

    const refreshBuildings = () => {
        getBuildings().then(setBuildings);
    };

    useEffect(() => {
        refreshBuildings();
    }, [showModal, editingBuilding]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>PlanificaciÃ³n Pre-Incidente</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>GestiÃ³n de edificaciones y riesgos</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    Nueva EdificaciÃ³n
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                    <MapComponent buildings={buildings} />
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BuildingIcon size={20} />
                        Edificaciones Recientes
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                        {buildings.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No hay edificaciones registradas.</p>
                        ) : (
                            buildings.map((building) => (
                                <div key={building.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h4 style={{ fontWeight: 600 }}>{building.name}</h4>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0' }}>{building.address}</p>
                                        </div>
                                        <button
                                            onClick={() => setEditingBuilding(building)}
                                            style={{ fontSize: '0.75rem', color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                        >
                                            Editar
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>{building.type}</span>
                                        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>{building.floors} Pisos</span>
                                        {building.prePlan?.specialHazards && (
                                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '4px', fontWeight: 600 }}>
                                                Riesgo: {building.prePlan.specialHazards}
                                            </span>
                                        )}
                                        {building.prePlan?.hazmats?.length > 0 && (
                                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: '4px', fontWeight: 600 }}>
                                                HazMat ({building.prePlan.hazmats.length})
                                            </span>
                                        )}
                                    </div>
                                    <button style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '4px', color: '#4B5563', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}>
                                        Ver Rutas de EvacuaciÃ³n
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {showModal && <NewBuildingForm onClose={() => setShowModal(false)} />}
            {editingBuilding && (
                <EditBuildingForm
                    building={editingBuilding}
                    onClose={() => {
                        setEditingBuilding(null);
                        refreshBuildings();
                    }}
                />
            )}
        </div>
    );
}

