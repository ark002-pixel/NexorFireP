import { CalendarDays, ClipboardList } from 'lucide-react';
import DateDisplay from '@/components/ui/DateDisplay';

export default function EventsPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Eventos y Actividades (GADE)</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Bitácora y Gestión de Simulacros</p>
                </div>
                <button className="btn btn-primary">
                    <CalendarDays size={20} style={{ marginRight: '0.5rem' }} />
                    Nuevo Evento
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ClipboardList size={20} />
                        Bitácora de Actividades Diarias
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { time: '07:00 AM', activity: 'Cambio de Guardia', officer: 'Sgto. Pérez' },
                            { time: '08:30 AM', activity: 'Revisión de Vehículos', officer: 'Cabo Ruiz' },
                            { time: '10:00 AM', activity: 'Capacitación: RCP Básico', officer: 'Teniente Gomez' },
                        ].map((log, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #F3F4F6' }}>
                                <div style={{ minWidth: '80px', fontWeight: 600, color: '#6B7280' }}>{log.time}</div>
                                <div>
                                    <p style={{ fontWeight: 500 }}>{log.activity}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Registrado por: {log.officer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Próximos Simulacros</h3>
                    <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                        <h4 style={{ fontWeight: 600, color: '#1E40AF', marginBottom: '0.5rem' }}>Simulacro Nacional</h4>
                        <p style={{ fontSize: '0.875rem', color: '#1E3A8A', marginBottom: '0.5rem' }}>
                            <DateDisplay date={new Date(Date.now() + 86400000 * 5)} />
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#60A5FA' }}>Evacuación por Sismo</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
