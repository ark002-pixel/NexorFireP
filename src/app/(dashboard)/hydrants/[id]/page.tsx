import { getHydrant } from '@/actions/hydrants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Droplet, Activity, Calendar, PenTool, ClipboardCheck } from 'lucide-react';
import HydrantMapWrapper from '@/components/hydrants/HydrantMapWrapper';
import EditHydrantForm from '@/components/hydrants/EditHydrantForm';
import NewInspectionForm from '@/components/hydrants/NewInspectionForm';

export default async function HydrantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const hydrant = await getHydrant(id);

    if (!hydrant) {
        notFound();
    }

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/hydrants" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', textDecoration: 'none' }}>
                    <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                    Volver a Hidrantes
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>
                            {hydrant.address || 'Hidrante sin dirección'}
                        </h1>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                backgroundColor: hydrant.status === 'Operational' ? '#D1FAE5' : '#FEE2E2',
                                color: hydrant.status === 'Operational' ? '#065F46' : '#991B1B'
                            }}>
                                {hydrant.status === 'Operational' ? 'Operativo' : 'Fuera de Servicio'}
                            </span>
                            {hydrant.color && (
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    backgroundColor: '#EFF6FF',
                                    color: '#1E40AF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: hydrant.color === 'Blue' ? '#3B82F6' : hydrant.color === 'Green' ? '#22C55E' : hydrant.color === 'Orange' ? '#F97316' : '#EF4444' }}></span>
                                    Clase {hydrant.color}
                                </span>
                            )}
                        </div>
                    </div>
                    <EditHydrantForm hydrant={hydrant} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Details Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Droplet size={20} />
                            Detalles Técnicos
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Marca / Modelo</p>
                                <p style={{ fontWeight: 500 }}>{hydrant.make || '-'} / {hydrant.model || '-'}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Año</p>
                                <p style={{ fontWeight: 500 }}>{hydrant.year || '-'}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Salidas</p>
                                <p style={{ fontWeight: 500 }}>{hydrant.outlets || '-'}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Tamaño Principal</p>
                                <p style={{ fontWeight: 500 }}>{hydrant.mainSize ? `${hydrant.mainSize}"` : '-'}</p>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Notas</p>
                                <p style={{ fontWeight: 500 }}>{hydrant.notes || 'Sin notas adicionales.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Flow Data Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={20} />
                            Datos de Flujo
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                            <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Flujo (GPM)</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#059669' }}>{hydrant.flowRate || '-'}</p>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Estática (PSI)</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{hydrant.staticPressure || '-'}</p>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Residual (PSI)</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{hydrant.residualPressure || '-'}</p>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Pitot (PSI)</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{hydrant.pitotPressure || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Inspections List */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ClipboardCheck size={20} />
                                Historial de Inspecciones
                            </h3>
                            <NewInspectionForm hydrantId={hydrant.id} />
                        </div>

                        {hydrant.inspections.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '1rem' }}>No hay inspecciones registradas.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {hydrant.inspections.map((inspection: any) => (
                                    <div key={inspection.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{new Date(inspection.date).toLocaleDateString()}</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                                Flujo: {inspection.flowRate || '-'} GPM | Estática: {inspection.staticPressure || '-'} PSI
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {inspection.caps && <span title="Tapas OK" style={{ color: '#059669', fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#D1FAE5', borderRadius: '4px' }}>Tapas</span>}
                                            {inspection.paint && <span title="Pintura OK" style={{ color: '#059669', fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#D1FAE5', borderRadius: '4px' }}>Pintura</span>}
                                            {inspection.drainage && <span title="Drenaje OK" style={{ color: '#059669', fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#D1FAE5', borderRadius: '4px' }}>Drenaje</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / Map */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <HydrantMapWrapper hydrants={[hydrant]} />
                    </div>
                    <div className="card">
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Ubicación</h3>
                        <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Lat: {hydrant.latitude}</p>
                        <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Lng: {hydrant.longitude}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${hydrant.latitude},${hydrant.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.875rem', color: '#3B82F6', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block' }}
                        >
                            Abrir en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
