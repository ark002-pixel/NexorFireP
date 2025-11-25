'use client';

import { addPrePlanHazMat, deletePrePlanHazMat } from '@/actions/buildings';
import { Trash2, Plus, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function HazMatForm({ prePlanId, hazmats }: { prePlanId: string, hazmats: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={20} className="text-orange-500" />
                    Materiales Peligrosos
                </h3>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAdding(true)}>
                    <Plus size={16} style={{ marginRight: '0.25rem' }} /> Agregar
                </button>
            </div>

            {isAdding && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <form action={async (formData) => {
                        await addPrePlanHazMat(prePlanId, {
                            name: formData.get('name'),
                            location: formData.get('location'),
                            quantity: formData.get('quantity'),
                            unNumber: formData.get('unNumber'),
                            health: parseInt(formData.get('health') as string) || 0,
                            flammability: parseInt(formData.get('flammability') as string) || 0,
                            instability: parseInt(formData.get('instability') as string) || 0,
                            special: formData.get('special'),
                            notes: formData.get('notes'),
                        });
                        setIsAdding(false);
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <input name="name" placeholder="Nombre del Material" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="location" placeholder="Ubicación" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="quantity" placeholder="Cantidad" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="unNumber" placeholder="Número UN" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Diamante NFPA 704</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                                <input name="health" type="number" min="0" max="4" placeholder="Salud (Azul)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #3B82F6' }} />
                                <input name="flammability" type="number" min="0" max="4" placeholder="Inflamabilidad (Rojo)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #EF4444' }} />
                                <input name="instability" type="number" min="0" max="4" placeholder="Inestabilidad (Amarillo)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #EAB308' }} />
                                <input name="special" placeholder="Especial (Blanco)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button type="button" onClick={() => setIsAdding(false)} className="btn btn-sm">Cancelar</button>
                            <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {hazmats.map((hazmat) => (
                    <div key={hazmat.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: 600 }}>{hazmat.name} {hazmat.unNumber && <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>({hazmat.unNumber})</span>}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{hazmat.location} • {hazmat.quantity}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                                <span style={{ color: '#3B82F6' }}>S: {hazmat.health}</span>
                                <span style={{ color: '#EF4444' }}>I: {hazmat.flammability}</span>
                                <span style={{ color: '#EAB308' }}>R: {hazmat.instability}</span>
                                {hazmat.special && <span>E: {hazmat.special}</span>}
                            </div>
                        </div>
                        <button onClick={() => deletePrePlanHazMat(hazmat.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {hazmats.length === 0 && !isAdding && (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: '0.875rem' }}>No hay materiales peligrosos registrados.</p>
                )}
            </div>
        </div>
    );
}
