export const dynamic = 'force-dynamic';
import { getInspections, getPermits } from '@/actions/fire-prevention';
import { IconClipboardCheck, IconFileText, IconAlertTriangle } from '@/components/ui/Icons';
import Link from 'next/link';

export default async function FirePreventionDashboard() {
    const inspectionsData = await getInspections();
    const permitsData = await getPermits();

    const inspections = Array.isArray(inspectionsData) ? inspectionsData : [];
    const permits = Array.isArray(permitsData) ? permitsData : [];

    const pendingInspections = inspections.filter(i => i.status === 'Scheduled').length;
    const activePermits = permits.filter(p => p.status === 'Active').length;

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#DBEAFE', borderRadius: '8px', color: '#1E40AF' }}>
                        <IconClipboardCheck size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Inspecciones Pendientes</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pendingInspections}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#D1FAE5', borderRadius: '8px', color: '#065F46' }}>
                        <IconFileText size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Permisos Activos</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activePermits}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', borderRadius: '8px', color: '#991B1B' }}>
                        <IconAlertTriangle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Violaciones Críticas</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Actividad Reciente</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay actividad reciente registrada.</p>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Accesos Rápidos</h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <Link href="/fire-prevention/inspections" style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Ver todas las inspecciones</span>
                            <span>&rarr;</span>
                        </Link>
                        <Link href="/fire-prevention/permits" style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Ver todos los permisos</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

