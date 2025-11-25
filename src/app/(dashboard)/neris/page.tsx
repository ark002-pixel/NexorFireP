export const dynamic = 'force-dynamic';
import { getIncidents } from '@/actions/neris';
import { Flame, MapPin, Clock, AlertCircle } from 'lucide-react';
import NewIncidentForm from '@/components/neris/NewIncidentForm';

export default async function NERISPage() {
    const incidents = await getIncidents();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>NERIS</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Reporte de Incidentes</p>
                </div>
                <NewIncidentForm />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Flame size={20} />
                    Incidentes Recientes
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {incidents.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay incidentes reportados.</p>
                    ) : (
                        incidents.map((incident) => (
                            <div key={incident.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontWeight: 600 }}>{incident.type}</h4>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.125rem 0.375rem',
                                            borderRadius: '4px',
                                            backgroundColor: incident.status === 'Open' ? '#FEE2E2' : '#E5E7EB',
                                            color: incident.status === 'Open' ? '#991B1B' : '#374151'
                                        }}>
                                            {incident.status}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {incident.address}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {new Date(incident.date).toLocaleString()}</span>
                                    </div>
                                    {incident.description && <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--color-text-main)' }}>{incident.description}</p>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

