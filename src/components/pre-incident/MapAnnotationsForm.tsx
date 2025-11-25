'use client';

import { addPrePlanAnnotation, deletePrePlanAnnotation } from '@/actions/buildings';
import { Trash2, Plus, MapPin, Type } from 'lucide-react';
import { useState } from 'react';

export default function MapAnnotationsForm({ prePlanId, annotations }: { prePlanId: string, annotations: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} />
                    Anotaciones en Mapa
                </h3>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAdding(true)}>
                    <Plus size={16} style={{ marginRight: '0.25rem' }} /> Agregar
                </button>
            </div>

            <div className="alert alert-info" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                Nota: La herramienta de dibujo interactivo está en desarrollo. Por ahora, puedes agregar anotaciones de texto o coordenadas manualmente.
            </div>

            {isAdding && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <form action={async (formData) => {
                        await addPrePlanAnnotation(prePlanId, {
                            label: formData.get('label'),
                            type: formData.get('type'),
                            data: formData.get('data'),
                        });
                        setIsAdding(false);
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <input name="label" placeholder="Etiqueta" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <select name="type" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="Marker">Marcador</option>
                                <option value="Polygon">Polígono (Zona)</option>
                                <option value="Text">Texto</option>
                            </select>
                        </div>
                        <textarea name="data" placeholder="Datos (Coordenadas o Descripción)" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', marginBottom: '1rem', minHeight: '80px' }} />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button type="button" onClick={() => setIsAdding(false)} className="btn btn-sm">Cancelar</button>
                            <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {annotations.map((annotation) => (
                    <div key={annotation.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: 600 }}>{annotation.label} <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>({annotation.type})</span></p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{annotation.data}</p>
                        </div>
                        <button onClick={() => deletePrePlanAnnotation(annotation.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {annotations.length === 0 && !isAdding && (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: '0.875rem' }}>No hay anotaciones registradas.</p>
                )}
            </div>
        </div>
    );
}
