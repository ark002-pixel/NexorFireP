export const dynamic = 'force-dynamic';
import { getPermits } from '@/actions/fire-prevention';
import { IconFileText, IconSettings } from '@/components/ui/Icons';
import NewPermitForm from '@/components/fire-prevention/NewPermitForm';
import PermitActions from '@/components/fire-prevention/PermitActions';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';
import PermitDownloadButton from '@/components/fire-prevention/PermitDownloadButton';

export default async function PermitsPage() {
    const permits = await getPermits();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Permisos y Certificaciones</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/fire-prevention/permits/settings" className="btn" style={{ backgroundColor: '#F3F4F6', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <IconSettings size={20} style={{ marginRight: '0.5rem' }} />
                        Configuración
                    </Link>
                    <NewPermitForm />
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {permits.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                                <IconFileText size={48} />
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)' }}>No hay permisos activos.</p>
                        </div>
                    ) : (
                        permits.map((permit) => (
                            <div key={permit.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{permit.building.name}</h4>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            Vence: <DateDisplay date={permit.expiryDate} />
                                        </p>
                                        <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', backgroundColor: '#D1FAE5', color: '#065F46', borderRadius: '4px' }}>
                                            {/* {permit.permitType?.name || 'Tipo Desconocido'} */}
                                            Permiso Estándar
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <PermitDownloadButton
                                        permit={permit}
                                        inspection={permit.building.inspections.find(i => i.status === 'Completed')}
                                    />
                                    <PermitActions id={permit.id} status={permit.status} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

