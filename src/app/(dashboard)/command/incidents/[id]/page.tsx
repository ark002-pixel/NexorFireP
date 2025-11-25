import { getActiveIncidents } from '@/actions/command';
import PMULog from '@/components/command/PMULog';
import { ChevronLeft, MapPin, Clock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';

// Mock function
async function getIncident(id: string) {
    const incidents = await getActiveIncidents();
    return incidents.find(i => i.id === id) || incidents[0];
}

export default async function IncidentDetailsPage({ params }: { params: { id: string } }) {
    const incident = await getIncident(params.id);

    if (!incident) {
        return <div>Incidente no encontrado</div>;
    }

    return (
        <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/command/incidents" style={{ display: 'flex', alignItems: 'center', color: '#6B7280', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <ChevronLeft size={16} />
                    Volver al Tablero
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <ShieldAlert color="#EF4444" size={32} />
                            {incident.type} #{incident.id.slice(0, 8)}
                        </h2>
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#6B7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={18} />
                                <DateDisplay date={incident.date} />
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} />
                                {incident.address}
                            </span>
                        </div>
                    </div>
                    <span style={{ padding: '0.5rem 1rem', backgroundColor: '#FEF2F2', color: '#EF4444', borderRadius: '9999px', fontWeight: 600, fontSize: '1.25rem' }}>
                        {incident.status.toUpperCase()}
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Recursos Asignados</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {incident.units && incident.units.length > 0 ? (
                                incident.units.map((unit: any) => (
                                    <div key={unit.id} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#EFF6FF', color: '#1E40AF', borderRadius: '6px', fontWeight: 600, border: '1px solid #BFDBFE' }}>
                                        {unit.unitName}
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#6B7280', fontStyle: 'italic' }}>Sin unidades asignadas</p>
                            )}
                        </div>
                    </div>

                    <div className="card" style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Mapa Táctico</h3>
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                            <p style={{ color: '#6B7280' }}>Vista de Mapa en Tiempo Real</p>
                        </div>
                    </div>
                </div>

                <PMULog incidentId={incident.id} />
            </div>
        </div>
    );
}
