export const dynamic = 'force-dynamic';
'use client';

import { getPermitTypes, createPermitType } from '@/actions/finance';
import { Plus, Settings, DollarSign, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Guardando...' : 'Crear Tipo'}
        </button>
    );
}

export default function PermitSettingsPage() {
    const [types, setTypes] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getPermitTypes().then(setTypes);
    }, [showModal]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>ConfiguraciÃ³n de Permisos</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gestione tipos de permisos y tarifas</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    Nuevo Tipo
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {types.map((type) => (
                    <div key={type.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}>
                                <Settings size={24} />
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{type.name}</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            {type.description || 'Sin descripciÃ³n'}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <Clock size={16} className="text-gray-400" />
                                <span>DuraciÃ³n: {type.duration} dÃ­as</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <DollarSign size={16} className="text-gray-400" />
                                <span>Tarifa: ${type.fee.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Nuevo Tipo de Permiso</h3>
                        <form action={async (formData) => {
                            await createPermitType(formData);
                            setShowModal(false);
                        }}>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre</label>
                                    <input name="name" required placeholder="Ej: Materiales Peligrosos" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>DescripciÃ³n</label>
                                    <textarea name="description" rows={3} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>DuraciÃ³n (DÃ­as)</label>
                                        <input name="duration" type="number" required defaultValue="365" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tarifa ($)</label>
                                        <input name="fee" type="number" step="0.01" required defaultValue="0.00" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

