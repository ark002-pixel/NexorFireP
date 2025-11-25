import { getVehicles } from '@/actions/inventory';
import { Truck, Wrench, AlertTriangle } from 'lucide-react';
import NewAssetForm from '@/components/inventory/NewAssetForm';

export default async function InventoryPage() {
    const vehicles = await getVehicles();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Assets & Inventory</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gestión de Flota y Equipos</p>
                </div>
                <NewAssetForm />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={20} />
                    Flota de Vehículos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {vehicles.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay vehículos registrados.</p>
                    ) : (
                        vehicles.map((vehicle) => (
                            <div key={vehicle.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{vehicle.name}</h4>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{vehicle.type} - {vehicle.mileage} km</p>
                                </div>
                                <div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: vehicle.status === 'In Service' ? '#D1FAE5' : '#FEE2E2',
                                        color: vehicle.status === 'In Service' ? '#065F46' : '#991B1B'
                                    }}>
                                        {vehicle.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
