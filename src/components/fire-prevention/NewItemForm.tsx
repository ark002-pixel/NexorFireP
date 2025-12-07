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

interface NewItemFormProps {
    templateId: string;
    codes: any[];
    onClose: () => void;
}

export default function NewItemForm({ templateId, codes, onClose }: NewItemFormProps) {
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
            <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
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
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Pregunta / Verificación (Requerido)</label>
                            <input name="question" required placeholder="Ej: ¿El sistema de alarma está operativo?" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Tipo de Respuesta</label>
                                <select name="type" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <option value="PassFail">Pasa / Falla</option>
                                    <option value="Text">Texto Libre</option>
                                    <option value="Photo">Foto Requerida</option>
                                    <option value="MultipleChoice">Opción Múltiple</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Formato de Respuesta</label>
                                <select name="responseType" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <option value="Standard">Estándar (Botones)</option>
                                    <option value="Checkbox">Checkbox</option>
                                    <option value="Input">Campo de Texto</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Códigos Asociados</label>
                            <select name="associatedCodes" multiple style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', minHeight: '100px' }}>
                                {codes.map((code) => (
                                    <option key={code.id} value={code.id}>
                                        {code.code} - {code.description.substring(0, 50)}...
                                    </option>
                                ))}
                            </select>
                            <p style={{ fontSize: '0.75rem', color: 'gray', marginTop: '0.25rem' }}>Mantén presionado Ctrl (o Cmd) para seleccionar múltiples.</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                            <div>
                                <label htmlFor="mandatory" style={{ fontWeight: 500, display: 'block' }}>Respuesta Obligatoria</label>
                                <p style={{ fontSize: '0.75rem', color: 'gray' }}>El inspector debe responder este item para completar la inspección.</p>
                            </div>
                            <div style={{ position: 'relative', width: '44px', height: '24px' }}>
                                <input type="checkbox" name="mandatory" id="mandatory" style={{ width: '100%', height: '100%', opacity: 0, cursor: 'pointer', position: 'absolute', zIndex: 10 }} />
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', borderRadius: '9999px', position: 'absolute' }}></div>
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', transition: 'transform 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                            </div>
                        </div>

                        <input type="hidden" name="order" value="1" />
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
