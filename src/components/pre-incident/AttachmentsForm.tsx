'use client';

import { addPrePlanAttachment, deletePrePlanAttachment } from '@/actions/buildings';
import { Trash2, Plus, Paperclip, FileText, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function AttachmentsForm({ prePlanId, attachments }: { prePlanId: string, attachments: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Paperclip size={20} />
                    Adjuntos y Documentos
                </h3>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAdding(true)}>
                    <Plus size={16} style={{ marginRight: '0.25rem' }} /> Agregar
                </button>
            </div>

            {isAdding && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <form action={async (formData) => {
                        await addPrePlanAttachment(prePlanId, {
                            name: formData.get('name'),
                            url: formData.get('url'),
                            type: formData.get('type'),
                        });
                        setIsAdding(false);
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <input name="name" placeholder="Nombre del Archivo" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <select name="type" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="Document">Documento</option>
                                <option value="Image">Imagen</option>
                                <option value="Plan">Plano</option>
                            </select>
                        </div>
                        <input name="url" placeholder="URL del archivo (Enlace)" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', marginBottom: '1rem' }} />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button type="button" onClick={() => setIsAdding(false)} className="btn btn-sm">Cancelar</button>
                            <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {attachments.map((attachment) => (
                    <div key={attachment.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {attachment.type === 'Image' ? <ImageIcon size={20} className="text-blue-500" /> : <FileText size={20} className="text-gray-500" />}
                            <div>
                                <a href={attachment.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: '#3B82F6', textDecoration: 'none' }}>
                                    {attachment.name}
                                </a>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{attachment.type}</p>
                            </div>
                        </div>
                        <button onClick={() => deletePrePlanAttachment(attachment.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {attachments.length === 0 && !isAdding && (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: '0.875rem' }}>No hay adjuntos registrados.</p>
                )}
            </div>
        </div>
    );
}
