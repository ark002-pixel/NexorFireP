export const dynamic = 'force-dynamic';
import { getServiceProviders, getSystems } from '@/actions/itm';
import { Wrench, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import NewServiceProviderForm from '@/components/itm/NewServiceProviderForm';

export default async function ITMPage() {
    const providers = await getServiceProviders();
    const systems = await getSystems();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>ITM</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>InspecciÃ³n, Prueba y Mantenimiento</p>
                </div>
                <NewServiceProviderForm />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Systems Status */}
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Wrench size={20} />
                        Estado de Sistemas
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {systems.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay sistemas registrados.</p>
                        ) : (
                            systems.map((system) => (
                                <div key={system.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>{system.type} - {system.building.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            PrÃ³ximo servicio: {system.nextServiceDate ? new Date(system.nextServiceDate).toLocaleDateString() : 'No programado'}
                                        </p>
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: system.status === 'Operational' ? '#D1FAE5' : '#FEE2E2',
                                        color: system.status === 'Operational' ? '#065F46' : '#991B1B'
                                    }}>
                                        {system.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Service Providers */}
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={20} />
                        Proveedores de Servicio
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {providers.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay proveedores registrados.</p>
                        ) : (
                            providers.map((provider) => (
                                <div key={provider.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                    <h4 style={{ fontWeight: 600 }}>{provider.name}</h4>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{provider.contactName}</p>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{provider.phone}</span>
                                        <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>{provider.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

