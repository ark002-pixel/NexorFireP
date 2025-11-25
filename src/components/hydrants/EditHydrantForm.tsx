'use client';

import { updateHydrant } from '@/actions/hydrants';
import { PenTool, X } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
    );
}

export default function EditHydrantForm({ hydrant }: { hydrant: any }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <PenTool size={18} style={{ marginRight: '0.5rem' }} />
                Editar
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
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Editar Hidrante</h2>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                    </div>

                    <form action={async (formData) => {
                        await updateHydrant(hydrant.id, {
                            address: formData.get('address'),
                            latitude: parseFloat(formData.get('latitude') as string),
                            longitude: parseFloat(formData.get('longitude') as string),
                            status: formData.get('status'),
                            color: formData.get('color'),
                            make: formData.get('make'),
                            model: formData.get('model'),
                            year: parseInt(formData.get('year') as string) || null,
                            outlets: formData.get('outlets'),
                            mainSize: parseFloat(formData.get('mainSize') as string) || null,
                            flowRate: parseInt(formData.get('flowRate') as string) || null,
                            notes: formData.get('notes'),
                        });
                        setIsOpen(false);
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Dirección / Ubicación</label>
                                <input name="address" defaultValue={hydrant.address} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Latitud</label>
                                <input name="latitude" type="number" step="any" defaultValue={hydrant.latitude} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Longitud</label>
                                <input name="longitude" type="number" step="any" defaultValue={hydrant.longitude} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Estado</label>
                                <select name="status" defaultValue={hydrant.status} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                    <option value="Operational">Operativo</option>
                                    <option value="Out of Service">Fuera de Servicio</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Color (Clase NFPA)</label>
                                <select name="color" defaultValue={hydrant.color || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                    <option value="">Seleccionar...</option>
                                    <option value="Blue">Azul (1500+ GPM)</option>
                                    <option value="Green">Verde (1000-1499 GPM)</option>
                                    <option value="Orange">Naranja (500-999 GPM)</option>
                                    <option value="Red">Rojo (&lt;500 GPM)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Marca</label>
                                <input name="make" defaultValue={hydrant.make || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Modelo</label>
                                <input name="model" defaultValue={hydrant.model || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Año</label>
                                <input name="year" type="number" defaultValue={hydrant.year || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Salidas</label>
                                <input name="outlets" defaultValue={hydrant.outlets || ''} placeholder="Ej. 2x 2.5, 1x 4.5" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tamaño Principal (pulgadas)</label>
                                <input name="mainSize" type="number" step="0.1" defaultValue={hydrant.mainSize || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Flujo (GPM)</label>
                                <input name="flowRate" type="number" defaultValue={hydrant.flowRate || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Notas</label>
                                <textarea name="notes" rows={3} defaultValue={hydrant.notes || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" onClick={() => setIsOpen(false)} className="btn" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Cancelar</button>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
