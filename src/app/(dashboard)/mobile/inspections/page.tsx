
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { IconMap, IconClipboardCheck, IconSearch, IconFilter } from '@/components/ui/Icons';

async function getAssignedInspections() {
    // In a real app, filter by the logged-in user's ID
    return await prisma.inspection.findMany({
        where: {
            status: 'Scheduled'
        },
        include: {
            building: true
        },
        orderBy: {
            date: 'asc'
        }
    });
}

export default async function MobileInspectionsPage() {
    const inspections = await getAssignedInspections();

    return (
        <div style={{ padding: '1rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Mis Asignaciones</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-ghost"><IconSearch size={20} /></button>
                    <button className="btn btn-sm btn-ghost"><IconFilter size={20} /></button>
                </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inspections.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                        <p>No tienes inspecciones asignadas hoy.</p>
                    </div>
                ) : (
                    inspections.map((inspection) => (
                        <div key={inspection.id} style={{
                            backgroundColor: 'var(--color-surface)',
                            padding: '1rem',
                            borderRadius: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid var(--color-primary)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>#{inspection.id.slice(0, 8)}</span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    backgroundColor: '#DBEAFE',
                                    color: '#1E40AF',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                }}>
                                    {new Date(inspection.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                {inspection.building.name}
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                                {inspection.building.address}
                            </p>

                            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
                                <Link href={`/fire-prevention/inspections/builder/${inspection.id}`} style={{ flex: 1 }}>
                                    <button className="btn btn-sm btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                        <IconClipboardCheck size={16} /> Detalle
                                    </button>
                                </Link>
                                <button className="btn btn-sm btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                    <IconMap size={16} /> Ruta
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
