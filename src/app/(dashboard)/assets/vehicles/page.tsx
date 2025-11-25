import { getAssets, deleteVehicle } from '@/actions/assets';
import { Truck } from 'lucide-react';
import DateDisplay from '@/components/ui/DateDisplay';
import GenericActionButtons from '@/components/ui/GenericActionButtons';

export default async function VehiclesPage() {
    const { vehicles } = await getAssets();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Flota Vehicular</h2>
                <button className="btn btn-primary">
                    <Truck size={20} style={{ marginRight: '0.5rem' }} />
                    Nuevo Vehículo
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {vehicles.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)' }}>No hay vehículos registrados.</p>
                ) : (
                    vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="card" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                <GenericActionButtons id={vehicle.id} onDelete={deleteVehicle} deleteConfirmMessage="¿Está seguro de que desea eliminar este vehículo?" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingRight: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{vehicle.name}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{vehicle.type} - {vehicle.make} {vehicle.model}</p>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    backgroundColor: vehicle.status === 'In Service' ? '#D1FAE5' : '#FEE2E2',
                                    color: vehicle.status === 'In Service' ? '#065F46' : '#991B1B'
                                }}>
                                    {vehicle.status}
                                </span>
                            </div>

                            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Mantenimiento Reciente</h4>
                                {vehicle.maintenance.length === 0 ? (
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>Sin registros</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {vehicle.maintenance.slice(0, 3).map((record) => (
                                            <li key={record.id} style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{record.type}</span>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>
                                                    <DateDisplay date={record.date} />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
