'use client';

import { addInspectionItem } from '@/actions/inspections';
import { useFormStatus } from 'react-dom';
import { X } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="btn btn-primary"
            disabled={pending}
        >
            {pending ? 'Guardando...' : 'Agregar Item'}
        </button>
    );
}

export default function NewItemForm({ templateId, onClose }: { templateId: string, onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nuevo Item de Inspección</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <form action={async (formData) => {
                    await addInspectionItem(templateId, formData);
                    onClose();
                }}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Pregunta / Verificación</label>
                            <input name="question" required placeholder="Ej: ¿Extintores vigentes?" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo de Respuesta</label>
                                <select name="type" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                    <option value="PassFail">Pasa / Falla</option>
                                    <option value="Text">Texto Libre</option>
                                    <option value="Photo">Foto Requerida</option>
                                    <option value="MultipleChoice">Opción Múltiple</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Orden</label>
                                <input name="order" type="number" defaultValue="1" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" name="mandatory" id="mandatory" />
                            <label htmlFor="mandatory" style={{ fontSize: '0.875rem' }}>Obligatorio</label>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
