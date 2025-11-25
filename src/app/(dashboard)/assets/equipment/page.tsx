export const dynamic = 'force-dynamic';
import { getAssets, deleteEquipment } from '@/actions/assets';
import { Wrench } from 'lucide-react';
import GenericActionButtons from '@/components/ui/GenericActionButtons';

export default async function EquipmentPage() {
    const { equipment } = await getAssets();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Equipos y Herramientas</h2>
                <button className="btn btn-primary">
                    <Wrench size={20} style={{ marginRight: '0.5rem' }} />
                    Nuevo Equipo
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {equipment.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)' }}>No hay equipos registrados.</p>
                ) : (
                    equipment.map((item) => (
                        <div key={item.id} className="card" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                <GenericActionButtons id={item.id} onDelete={deleteEquipment} deleteConfirmMessage="Â¿EstÃ¡ seguro de que desea eliminar este equipo?" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingRight: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.name}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{item.type}</p>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    backgroundColor: item.status === 'In Service' ? '#D1FAE5' : '#FEE2E2',
                                    color: item.status === 'In Service' ? '#065F46' : '#991B1B'
                                }}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

