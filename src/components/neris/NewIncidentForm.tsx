'use client';

import { createIncident } from '@/actions/neris';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Reportando...' : 'Reportar Incidente'}
        </button>
    );
}

export default function NewIncidentForm() {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Nuevo Incidente
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
                <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nuevo Incidente</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                    </div>

                    <form action={async (formData) => {
                        await createIncident(formData);
                        setIsOpen(false);
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo de Incidente</label>
                            <select name="type" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="Fire">Incendio</option>
                                <option value="Medical">Emergencia Médica</option>
                                <option value="Rescue">Rescate</option>
                                <option value="Hazmat">Materiales Peligrosos</option>
                                <option value="Other">Otro</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Fecha y Hora</label>
                            <input type="datetime-local" name="date" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Dirección</label>
                            <input name="address" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Descripción</label>
                            <textarea name="description" rows={3} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}></textarea>
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
