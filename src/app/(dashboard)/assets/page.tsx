import { getAssets } from '@/actions/assets';
import { Truck, Wrench, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default async function AssetsDashboard() {
    const { vehicles, equipment } = await getAssets();

    const activeVehicles = vehicles.filter(v => v.status === 'In Service').length;
    const activeEquipment = equipment.filter(e => e.status === 'In Service').length;

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#DBEAFE', borderRadius: '8px', color: '#1E40AF' }}>
                        <Truck size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Vehículos Operativos</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeVehicles} / {vehicles.length}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#D1FAE5', borderRadius: '8px', color: '#065F46' }}>
                        <Wrench size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Equipos Operativos</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeEquipment} / {equipment.length}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', borderRadius: '8px', color: '#991B1B' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Mantenimiento Pendiente</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Accesos Rápidos</h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <Link href="/assets/vehicles" style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Gestionar Flota</span>
                            <span>&rarr;</span>
                        </Link>
                        <Link href="/assets/equipment" style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Gestionar Equipos</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
