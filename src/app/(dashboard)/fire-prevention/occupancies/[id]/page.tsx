import { getBuildingDetails } from '@/actions/buildings';
import { ArrowLeft, Building, AlertTriangle, FileText, ClipboardCheck, MapPin, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

export default async function OccupancyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const building = await getBuildingDetails(id);

    if (!building) return <div>Edificación no encontrada.</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/fire-prevention/occupancies" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', marginBottom: '1rem', textDecoration: 'none' }}>
                    <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                    Volver a Ocupaciones
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Building size={32} />
                            {building.name}
                        </h1>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {building.address}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={16} /> {building.prePlan?.contactPhone || 'Sin teléfono'}</span>
                        </div>
                    </div>
                    <span style={{ padding: '0.5rem 1rem', backgroundColor: '#EFF6FF', color: '#1E40AF', borderRadius: '9999px', fontWeight: 600 }}>
                        {building.type}
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Pre-Plan Summary */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={20} />
                            Información Pre-Plan
                        </h3>
                        {building.prePlan ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Cierre de Gas</p>
                                    <p style={{ fontWeight: 500 }}>{building.prePlan.utilityGasShutoff || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Cierre de Agua</p>
                                    <p style={{ fontWeight: 500 }}>{building.prePlan.utilityWaterShutoff || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Cierre Eléctrico</p>
                                    <p style={{ fontWeight: 500 }}>{building.prePlan.utilityElectricShutoff || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Caja de Llaves</p>
                                    <p style={{ fontWeight: 500 }}>{building.prePlan.keyBoxLocation || 'N/A'}</p>
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--color-text-secondary)' }}>Sin información de Pre-Plan.</p>
                        )}
                    </div>

                    {/* Inspection History */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ClipboardCheck size={20} />
                            Historial de Inspecciones
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {building.inspections.length === 0 ? (
                                <p style={{ color: 'var(--color-text-secondary)' }}>No hay inspecciones registradas.</p>
                            ) : (
                                building.inspections.map((insp: any) => (
                                    <div key={insp.id} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 500 }}>{new Date(insp.date).toLocaleDateString()}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{insp.mode}</p>
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px',
                                            backgroundColor: insp.status === 'Passed' ? '#D1FAE5' : insp.status === 'Failed' ? '#FEE2E2' : '#F3F4F6',
                                            color: insp.status === 'Passed' ? '#065F46' : insp.status === 'Failed' ? '#991B1B' : '#374151'
                                        }}>
                                            {insp.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Hazards */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertTriangle size={20} />
                            Riesgos Activos
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {building.hazards.length === 0 ? (
                                <p style={{ color: 'var(--color-text-secondary)' }}>No hay riesgos reportados.</p>
                            ) : (
                                building.hazards.map((hazard: any) => (
                                    <div key={hazard.id} style={{ padding: '0.5rem', backgroundColor: '#FEF2F2', borderRadius: '4px', color: '#991B1B', fontSize: '0.875rem' }}>
                                        <strong>{hazard.type}:</strong> {hazard.description}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Permits */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={20} />
                            Permisos
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {building.permits.length === 0 ? (
                                <p style={{ color: 'var(--color-text-secondary)' }}>No hay permisos activos.</p>
                            ) : (
                                building.permits.map((permit: any) => (
                                    <div key={permit.id} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                        <p style={{ fontWeight: 500 }}>{permit.type}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Vence: {new Date(permit.expiryDate).toLocaleDateString()}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
