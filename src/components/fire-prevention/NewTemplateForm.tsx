'use client';

import { createInspectionTemplate } from '@/actions/inspections';
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
            {pending ? 'Creando...' : 'Crear Plantilla'}
        </button>
    );
}

export default function NewTemplateForm({ onClose }: { onClose: () => void }) {
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
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nueva Plantilla de Inspección</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <form action={async (formData) => {
                    await createInspectionTemplate(formData);
                    onClose();
                }}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre de la Plantilla</label>
                            <input name="name" required placeholder="Ej: Inspección Anual Comercial" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Descripción</label>
                            <textarea name="description" rows={3} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo</label>
                            <select name="type" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="Annual">Anual</option>
                                <option value="New Construction">Nueva Construcción</option>
                                <option value="Re-inspection">Re-inspección</option>
                                <option value="Special">Especial</option>
                            </select>
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
