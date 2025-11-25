'use client';

import { updateBuilding, deleteBuilding } from '@/actions/buildings';
import { X, Trash2, Save } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import PrePlanTabs from './PrePlanTabs';
import HazMatForm from './HazMatForm';
import ContactsForm from './ContactsForm';
import AttachmentsForm from './AttachmentsForm';
import MapAnnotationsForm from './MapAnnotationsForm';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            <Save size={18} style={{ marginRight: '0.5rem' }} />
            {pending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
    );
}

export default function EditBuildingForm({ building, onClose }: { building: any, onClose: () => void }) {
    const [activeTab, setActiveTab] = useState('general');

    const handleDelete = async () => {
        if (confirm('¿Estás seguro de que deseas eliminar esta edificación y todo su plan pre-incidente? Esta acción no se puede deshacer.')) {
            await deleteBuilding(building.id);
            onClose();
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{building.name}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{building.address}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={handleDelete} className="btn" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                            <Trash2 size={18} />
                        </button>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                    <PrePlanTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {activeTab === 'general' && (
                        <form action={async (formData) => {
                            await updateBuilding(building.id, {
                                name: formData.get('name'),
                                address: formData.get('address'),
                                city: formData.get('city'),
                                type: formData.get('type'),
                                floors: parseInt(formData.get('floors') as string),
                                area: parseFloat(formData.get('area') as string),
                                occupancy: formData.get('occupancy'),
                                latitude: parseFloat(formData.get('latitude') as string),
                                longitude: parseFloat(formData.get('longitude') as string),
                                prePlan: {
                                    accessNotes: formData.get('accessNotes'),
                                    hydrantInfo: formData.get('hydrantInfo'),
                                    utilityGasShutoff: formData.get('utilityGasShutoff'),
                                    utilityWaterShutoff: formData.get('utilityWaterShutoff'),
                                    utilityElectricShutoff: formData.get('utilityElectricShutoff'),
                                    keyBoxLocation: formData.get('keyBoxLocation'),
                                    fdcLocation: formData.get('fdcLocation'),
                                    specialHazards: formData.get('specialHazards'),
                                    roofConstruction: formData.get('roofConstruction'),
                                    floorConstruction: formData.get('floorConstruction'),
                                }
                            });
                            onClose();
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Información Básica</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre</label>
                                            <input name="name" defaultValue={building.name} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Dirección</label>
                                            <input name="address" defaultValue={building.address} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Ciudad</label>
                                                <input name="city" defaultValue={building.city} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo</label>
                                                <select name="type" defaultValue={building.type} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                                    <option value="Comercial">Comercial</option>
                                                    <option value="Residencial">Residencial</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Institucional">Institucional</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Latitud</label>
                                                <input name="latitude" type="number" step="any" defaultValue={building.latitude} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Longitud</label>
                                                <input name="longitude" type="number" step="any" defaultValue={building.longitude} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Detalles Estructurales</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Pisos</label>
                                                <input name="floors" type="number" defaultValue={building.floors} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Área (m²)</label>
                                                <input name="area" type="number" defaultValue={building.area} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Carga Ocupacional</label>
                                            <input name="occupancy" type="number" defaultValue={building.occupancy} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Construcción Techo</label>
                                            <input name="roofConstruction" defaultValue={building.prePlan?.roofConstruction} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Construcción Piso</label>
                                            <input name="floorConstruction" defaultValue={building.prePlan?.floorConstruction} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Utilidades y Accesos</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Corte de Gas</label>
                                        <input name="utilityGasShutoff" defaultValue={building.prePlan?.utilityGasShutoff} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Corte de Agua</label>
                                        <input name="utilityWaterShutoff" defaultValue={building.prePlan?.utilityWaterShutoff} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Corte Eléctrico</label>
                                        <input name="utilityElectricShutoff" defaultValue={building.prePlan?.utilityElectricShutoff} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Knox Box</label>
                                        <input name="keyBoxLocation" defaultValue={building.prePlan?.keyBoxLocation} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Conexión FDC</label>
                                        <input name="fdcLocation" defaultValue={building.prePlan?.fdcLocation} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Riesgos Especiales</label>
                                        <input name="specialHazards" defaultValue={building.prePlan?.specialHazards} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <SubmitButton />
                            </div>
                        </form>
                    )}

                    {activeTab === 'hazmat' && (
                        <HazMatForm prePlanId={building.prePlan?.id} hazmats={building.prePlan?.hazmats || []} />
                    )}

                    {activeTab === 'contacts' && (
                        <ContactsForm prePlanId={building.prePlan?.id} contacts={building.prePlan?.contacts || []} />
                    )}

                    {activeTab === 'attachments' && (
                        <AttachmentsForm prePlanId={building.prePlan?.id} attachments={building.prePlan?.attachments || []} />
                    )}

                    {activeTab === 'map' && (
                        <MapAnnotationsForm prePlanId={building.prePlan?.id} annotations={building.prePlan?.annotations || []} />
                    )}
                </div>
            </div>
        </div>
    );
}
