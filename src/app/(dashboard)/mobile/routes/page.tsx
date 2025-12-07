
import { prisma } from '@/lib/db';
import { IconMap, IconCheckCircle, IconTruck, IconUser } from '@/components/ui/Icons';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getActiveRoute() {
    // In a real app, filter by logged-in user
    // For prototype, get the first active route or create a mock one if none exists
    const route = await prisma.route.findFirst({
        include: {
            stops: {
                include: {
                    inspection: {
                        include: { building: true }
                    }
                },
                orderBy: { sequence: 'asc' }
            }
        }
    });
    return route;
}

export default async function MobileRoutePage() {
    const route = await getActiveRoute();

    if (!route) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <IconMap size={48} style={{ margin: '0 auto', color: '#9CA3AF', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>No hay ruta activa</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    No has iniciado ninguna ruta hoy. Ve a tus asignaciones para comenzar.
                </p>
                <Link href="/mobile/inspections">
                    <button className="btn btn-primary" style={{ marginRight: '1rem' }}>Ver Asignaciones</button>
                </Link>

                <form action={async () => {
                    'use server';
                    const { simulateRoute } = await import('@/actions/route-simulation');
                    await simulateRoute();
                }}>
                    <button type="submit" className="btn btn-secondary">
                        Simular Ruta (Demo)
                    </button>
                </form>
            </div>
        );
    }

    const currentStop = route.stops.find(s => s.status === 'Pending') || route.stops[0];
    const nextStops = route.stops.filter(s => s.sequence > currentStop.sequence);

    return (
        <div style={{ padding: '1rem', paddingBottom: '6rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ruta Activa</h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {route.stops.length} Paradas • 2h 30m Est.
                </p>
            </div>

            {/* Current Stop Card (Highlighted) */}
            <div style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                    }}>
                        PARADA ACTUAL #{currentStop.sequence}
                    </span>
                    <IconTruck size={20} />
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {currentStop.inspection?.building.name}
                </h2>
                <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                    {currentStop.inspection?.building.address}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button className="btn" style={{
                        backgroundColor: 'white',
                        color: 'var(--color-primary)',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        <IconMap size={18} /> Navegar
                    </button>
                    <button className="btn" style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        <IconCheckCircle size={18} /> Llegué
                    </button>
                </div>
            </div>

            {/* Timeline / Next Stops */}
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Siguientes Paradas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {nextStops.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>Fin de la ruta.</p>
                ) : (
                    nextStops.map((stop, index) => (
                        <div key={stop.id} style={{ display: 'flex', gap: '1rem', position: 'relative', paddingBottom: '1.5rem' }}>
                            {/* Timeline Line */}
                            {index !== nextStops.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    left: '15px',
                                    top: '30px',
                                    bottom: '0',
                                    width: '2px',
                                    backgroundColor: '#E5E7EB'
                                }} />
                            )}

                            {/* Circle */}
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#F3F4F6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                zIndex: 1
                            }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280' }}>{stop.sequence}</span>
                            </div>

                            {/* Content */}
                            <div style={{
                                flex: 1,
                                backgroundColor: 'var(--color-surface)',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #E5E7EB'
                            }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{stop.inspection?.building.name}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{stop.inspection?.building.address}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
