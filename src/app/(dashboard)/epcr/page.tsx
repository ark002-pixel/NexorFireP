export const dynamic = 'force-dynamic';
import { getPCRs, deletePCR } from '@/actions/epcr';
import { FileText, Activity, Clock, User } from 'lucide-react';
import NewPCRForm from '@/components/epcr/NewPCRForm';
import DateDisplay from '@/components/ui/DateDisplay';
import Link from 'next/link';
import GenericActionButtons from '@/components/ui/GenericActionButtons';

export default async function EPCRPage() {
    const pcrs = await getPCRs();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>ePCR</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Registro de Atención Prehospitalaria</p>
                </div>
                <NewPCRForm />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {pcrs.length === 0 ? (
                    <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                        <FileText size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-text-secondary)', opacity: 0.5 }} />
                        <p style={{ color: 'var(--color-text-secondary)' }}>No hay reportes registrados.</p>
                    </div>
                ) : (
                    pcrs.map((pcr) => (
                        <div key={pcr.id} className="card" style={{ position: 'relative', borderLeft: '4px solid #3B82F6' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                <GenericActionButtons
                                    id={pcr.id}
                                    onDelete={deletePCR}
                                    deleteConfirmMessage="¿Está seguro de que desea eliminar este reporte ePCR?"
                                />
                            </div>

                            <Link href={`/epcr/${pcr.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', paddingRight: '2rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                        {pcr.patient.firstName} {pcr.patient.lastName}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                        <Activity size={16} style={{ marginRight: '0.25rem' }} />
                                        {pcr.chiefComplaint}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Clock size={14} style={{ marginRight: '0.25rem' }} />
                                        <DateDisplay date={pcr.createdAt} />
                                    </div>
                                    {pcr.incident && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FileText size={14} style={{ marginRight: '0.25rem' }} />
                                            Incidente #{pcr.incident.id.slice(0, 8)}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

