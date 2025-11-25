export const dynamic = 'force-dynamic';
import { getActiveIncidents, deleteIncident } from '@/actions/command';
import { Clock, Radio, MapPin, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';
import GenericActionButtons from '@/components/ui/GenericActionButtons';

export default async function IncidentsPage() {
    const incidents = await getActiveIncidents();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Incidentes Activos</h2>
                <button className="btn btn-primary">
                    <ShieldAlert size={20} style={{ marginRight: '0.5rem' }} />
                    Nuevo Incidente
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {incidents.length === 0 ? (
                    <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>No hay incidentes activos en este momento.</p>
                    </div>
                ) : (
                    incidents.map((incident) => (
                        <div key={incident.id} className="card" style={{ borderLeft: '4px solid #EF4444', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                <GenericActionButtons id={incident.id} onDelete={deleteIncident} deleteConfirmMessage="Â¿EstÃ¡ seguro de que desea eliminar este incidente?" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingRight: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{incident.type}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                        <MapPin size={16} style={{ marginRight: '0.25rem' }} />
                                        {incident.address}
                                    </div>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    backgroundColor: '#FEF2F2',
                                    color: '#EF4444'
                                }}>
                                    {incident.status}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ backgroundColor: '#F9FAFB', padding: '0.75rem', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        <Clock size={14} style={{ marginRight: '0.25rem' }} />
                                        Fecha
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                                        <DateDisplay date={incident.date} />
                                    </div>
                                </div>
                                <div style={{ backgroundColor: '#F9FAFB', padding: '0.75rem', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        <Radio size={14} style={{ marginRight: '0.25rem' }} />
                                        Canal
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                        TAC-1
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Unidades Asignadas</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {incident.units.length > 0 ? (
                                        incident.units.map((unit) => (
                                            <span key={unit.id} style={{
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: '#E5E7EB',
                                                borderRadius: '4px',
                                                fontSize: '0.875rem',
                                                fontWeight: 500
                                            }}>
                                                {unit.unitName}
                                            </span>
                                        ))
                                    ) : (
                                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontStyle: 'italic' }}>Sin unidades asignadas</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link href={`/neris/${incident.id}`} style={{ color: '#EF4444', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
                                    Ver Informe Completo &rarr;
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

