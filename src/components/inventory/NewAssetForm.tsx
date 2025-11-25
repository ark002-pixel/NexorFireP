'use client';

import { createVehicle } from '@/actions/inventory';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Guardando...' : 'Registrar Vehículo'}
        </button>
    );
}

export default function NewAssetForm() {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Nuevo Vehículo
            </button>
        );
    }

    return (
        <>
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nuevo Vehículo</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                    </div>

                    <form action={async (formData) => {
                        await createVehicle(formData);
                        setIsOpen(false);
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre / Unidad</label>
                            <input name="name" placeholder="Ej: Engine 1" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo</label>
                            <select name="type" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="Pumper">Autobomba</option>
                                <option value="Aerial">Escalera</option>
                                <option value="Ambulance">Ambulancia</option>
                                <option value="SUV">Vehículo Ligero</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Estado</label>
                            <select name="status" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="In Service">En Servicio</option>
                                <option value="Out of Service">Fuera de Servicio</option>
                                <option value="Maintenance">Mantenimiento</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Kilometraje</label>
                            <input type="number" name="mileage" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" onClick={() => setIsOpen(false)} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
