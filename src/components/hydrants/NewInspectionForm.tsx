'use client';

import { addHydrantInspection } from '@/actions/hydrants';
import { ClipboardCheck, X } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Guardando...' : 'Registrar Inspección'}
        </button>
    );
}

export default function NewInspectionForm({ hydrantId }: { hydrantId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button className="btn btn-sm btn-secondary" onClick={() => setIsOpen(true)}>
                Nueva Inspección
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
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Nueva Inspección</h2>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                    </div>

                    <form action={async (formData) => {
                        await addHydrantInspection(hydrantId, {
                            flowRate: parseInt(formData.get('flowRate') as string) || null,
                            staticPressure: parseInt(formData.get('staticPressure') as string) || null,
                            residualPressure: parseInt(formData.get('residualPressure') as string) || null,
                            pitotPressure: parseInt(formData.get('pitotPressure') as string) || null,
                            caps: formData.get('caps') === 'on',
                            threads: formData.get('threads') === 'on',
                            paint: formData.get('paint') === 'on',
                            drainage: formData.get('drainage') === 'on',
                            marker: formData.get('marker') === 'on',
                            notes: formData.get('notes'),
                        });
                        setIsOpen(false);
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Prueba de Flujo</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Flujo (GPM)</label>
                                    <input name="flowRate" type="number" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Presión Estática (PSI)</label>
                                    <input name="staticPressure" type="number" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Presión Residual (PSI)</label>
                                    <input name="residualPressure" type="number" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Presión Pitot (PSI)</label>
                                    <input name="pitotPressure" type="number" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Verificaciones Visuales</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" name="caps" defaultChecked /> Tapas Presentes
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" name="threads" defaultChecked /> Roscas en Buen Estado
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" name="paint" defaultChecked /> Pintura Adecuada
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" name="drainage" defaultChecked /> Drenaje Funcional
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" name="marker" defaultChecked /> Marcador Visible
                                </label>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Notas de Inspección</label>
                            <textarea name="notes" rows={3} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" onClick={() => setIsOpen(false)} className="btn" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Cancelar</button>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
