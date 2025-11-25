'use client';

import { useState } from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';

export default function ChainOfCustodyForm() {
    const [items, setItems] = useState([
        { id: 1, description: 'Fragmento de cable eléctrico quemado', location: 'Habitación principal, zona norte', collectedBy: 'Sgto. Pérez', time: '10:30 AM' }
    ]);

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            description: '',
            location: '',
            collectedBy: '',
            time: ''
        };
        setItems([...items, newItem]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={20} />
                    Cadena de Custodia
                </h3>
                <button onClick={addItem} className="btn" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                    <Plus size={16} style={{ marginRight: '0.25rem' }} />
                    Agregar Evidencia
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map((item, index) => (
                    <div key={item.id} style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#6B7280' }}>Evidencia #{index + 1}</span>
                            <button onClick={() => removeItem(item.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <input
                                className="input"
                                placeholder="Descripción de la evidencia"
                                defaultValue={item.description}
                            />
                            <input
                                className="input"
                                placeholder="Ubicación de hallazgo"
                                defaultValue={item.location}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                className="input"
                                placeholder="Recolectado por"
                                defaultValue={item.collectedBy}
                            />
                            <input
                                className="input"
                                type="time"
                                defaultValue={item.time}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
