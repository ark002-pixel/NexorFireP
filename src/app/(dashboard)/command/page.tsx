export const dynamic = 'force-dynamic';
import { getActiveIncidents } from '@/actions/command';
import { ShieldAlert, Radio, Users, Activity } from 'lucide-react';
import Link from 'next/link';

export default async function CommandDashboard() {
    const incidents = await getActiveIncidents();
    const activeCount = incidents.length;
    // Mock data for other metrics
    const unitsDeployed = incidents.reduce((acc, inc) => acc + inc.units.length, 0);
    const radioChannel = 'TAC-1';

    return (
        <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #EF4444' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEF2F2', borderRadius: '8px', color: '#EF4444' }}>
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Incidentes Activos</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeCount}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #3B82F6' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#3B82F6' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Unidades Desplegadas</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{unitsDeployed}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #10B981' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#ECFDF5', borderRadius: '8px', color: '#10B981' }}>
                        <Radio size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Canal Principal</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{radioChannel}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Actividad Reciente</h3>
                        <Link href="/command/incidents" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                            Ver Todo
                        </Link>
                    </div>
                    {incidents.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay actividad reciente.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {incidents.slice(0, 3).map((incident) => (
                                <div key={incident.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{incident.type}</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{incident.address}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#EF4444' }}>{incident.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Accesos RÃ¡pidos</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button className="btn btn-primary" style={{ justifyContent: 'center' }}>
                            <ShieldAlert size={18} style={{ marginRight: '0.5rem' }} />
                            Nuevo Incidente
                        </button>
                        <Link href="/command/dispatch" className="btn" style={{ backgroundColor: '#F3F4F6', color: 'inherit', justifyContent: 'center', textDecoration: 'none' }}>
                            <Radio size={18} style={{ marginRight: '0.5rem' }} />
                            Consola de Despacho
                        </Link>
                        <Link href="/command/map" className="btn" style={{ backgroundColor: '#F3F4F6', color: 'inherit', justifyContent: 'center', textDecoration: 'none' }}>
                            <Activity size={18} style={{ marginRight: '0.5rem' }} />
                            Mapa de SituaciÃ³n
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

