export const dynamic = 'force-dynamic';
import { getHydrants } from '@/actions/hydrants';
import { Droplet, MapPin, Activity, PenTool } from 'lucide-react';
import NewHydrantForm from '@/components/hydrants/NewHydrantForm';
import Link from 'next/link';
import HydrantMapWrapper from '@/components/hydrants/HydrantMapWrapper';

export default async function HydrantsPage() {
    const hydrants = await getHydrants();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Hidrantes</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Mapa y Mantenimiento de Hidrantes</p>
                </div>
                <NewHydrantForm />
            </div>

            <div className="card" style={{ marginBottom: '2rem', padding: '0', overflow: 'hidden' }}>
                <HydrantMapWrapper hydrants={hydrants} />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Droplet size={20} />
                    Hidrantes Registrados
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {hydrants.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay hidrantes registrados.</p>
                    ) : (
                        hydrants.map((hydrant) => (
                            <div key={hydrant.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <MapPin size={16} color="var(--color-primary)" />
                                        <h4 style={{ fontWeight: 600 }}>{hydrant.address || 'Ubicación sin dirección'}</h4>
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <span>Lat: {hydrant.latitude.toFixed(4)}, Lng: {hydrant.longitude.toFixed(4)}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Activity size={14} /> {hydrant.flowRate ? `${hydrant.flowRate} GPM` : 'Sin datos de flujo'}
                                        </span>
                                        {hydrant.color && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: hydrant.color === 'Blue' ? '#3B82F6' : hydrant.color === 'Green' ? '#22C55E' : hydrant.color === 'Orange' ? '#F97316' : '#EF4444' }}></span>
                                                Clase {hydrant.color}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: hydrant.status === 'Operational' ? '#D1FAE5' : '#FEE2E2',
                                        color: hydrant.status === 'Operational' ? '#065F46' : '#991B1B'
                                    }}>
                                        {hydrant.status === 'Operational' ? 'Operativo' : 'Fuera de Servicio'}
                                    </span>
                                    <Link href={`/hydrants/${hydrant.id}`} className="btn btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                        <PenTool size={14} /> Detalles
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

