'use client';

import { createPermit } from '@/actions/fire-prevention';
import { getBuildings } from '@/actions/buildings';
import { getPermitTypes } from '@/actions/finance';
import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { X, DollarSign, Calendar, Plus } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Emitiendo...' : 'Emitir Permiso'}
        </button>
    );
}

export default function NewPermitForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [buildings, setBuildings] = useState<any[]>([]);
    const [types, setTypes] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<any>(null);

    useEffect(() => {
        if (isOpen) {
            getBuildings().then(setBuildings);
            getPermitTypes().then(setTypes);
        }
    }, [isOpen]);

    if (!isOpen) {
        return (
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Emitir Permiso
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Emitir Nuevo Permiso</h3>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <form action={async (formData) => {
                    await createPermit(formData);
                    setIsOpen(false);
                }}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Edificación</label>
                            <select name="buildingId" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="">Seleccione una edificación</option>
                                {buildings.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo de Permiso</label>
                            <select
                                name="typeId"
                                required
                                onChange={(e) => setSelectedType(types.find(t => t.id === e.target.value))}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            >
                                <option value="">Seleccione un tipo</option>
                                {types.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        {selectedType && (
                            <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                        <DollarSign size={16} /> Tarifa:
                                    </span>
                                    <span style={{ fontWeight: 600 }}>${selectedType.fee.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                        <Calendar size={16} /> Duración:
                                    </span>
                                    <span>{selectedType.duration} días</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsOpen(false)} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
