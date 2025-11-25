'use client';

import { updatePCR } from '@/actions/epcr';
import { useState } from 'react';
import { Clock, MapPin, Save } from 'lucide-react';

export default function IncidentTab({ pcr }: { pcr: any }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            dispatchTime: formData.get('dispatchTime') ? new Date(formData.get('dispatchTime') as string) : null,
            enRouteTime: formData.get('enRouteTime') ? new Date(formData.get('enRouteTime') as string) : null,
            onSceneTime: formData.get('onSceneTime') ? new Date(formData.get('onSceneTime') as string) : null,
            patientContactTime: formData.get('patientContactTime') ? new Date(formData.get('patientContactTime') as string) : null,
            transportTime: formData.get('transportTime') ? new Date(formData.get('transportTime') as string) : null,
            hospitalArrivalTime: formData.get('hospitalArrivalTime') ? new Date(formData.get('hospitalArrivalTime') as string) : null,
            clearTime: formData.get('clearTime') ? new Date(formData.get('clearTime') as string) : null,
            disposition: formData.get('disposition'),
            destinationFacility: formData.get('destinationFacility'),
        };

        await updatePCR(pcr.id, data);
        setIsSaving(false);
        alert('Datos guardados correctamente');
    };

    const formatDate = (date: string | Date | null) => {
        if (!date) return '';
        return new Date(date).toISOString().slice(0, 16); // Format for datetime-local
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Tiempos Operativos
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Hora de Despacho</label>
                            <input type="datetime-local" name="dispatchTime" defaultValue={formatDate(pcr.dispatchTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>En Ruta</label>
                            <input type="datetime-local" name="enRouteTime" defaultValue={formatDate(pcr.enRouteTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>En Escena</label>
                            <input type="datetime-local" name="onSceneTime" defaultValue={formatDate(pcr.onSceneTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Contacto con Paciente</label>
                            <input type="datetime-local" name="patientContactTime" defaultValue={formatDate(pcr.patientContactTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={20} /> Transporte y Destino
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Inicio Transporte</label>
                            <input type="datetime-local" name="transportTime" defaultValue={formatDate(pcr.transportTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Llegada Hospital</label>
                            <input type="datetime-local" name="hospitalArrivalTime" defaultValue={formatDate(pcr.hospitalArrivalTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Fin de Misión (Clear)</label>
                            <input type="datetime-local" name="clearTime" defaultValue={formatDate(pcr.clearTime)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Disposición Final</label>
                            <select name="disposition" defaultValue={pcr.disposition || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                <option value="">Seleccionar...</option>
                                <option value="Transported">Transportado</option>
                                <option value="Refused">Rehusó Atención</option>
                                <option value="Dead on Scene">Fallecido en Escena</option>
                                <option value="Cancelled">Cancelado</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Hospital de Destino</label>
                            <input name="destinationFacility" defaultValue={pcr.destinationFacility || ''} placeholder="Ej. Hospital Central" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <Save size={18} style={{ marginRight: '0.5rem' }} />
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </form>
    );
}
