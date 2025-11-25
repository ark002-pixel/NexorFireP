'use client';

import { updateInspection } from '@/actions/fire-prevention';
import { X } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
    );
}

export default function EditInspectionForm({ inspection, onClose }: { inspection: any, onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Editar Inspección</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <form action={async (formData) => {
                    await updateInspection(inspection.id, formData);
                    onClose();
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Edificación</label>
                        <input
                            type="text"
                            value={inspection.building.name}
                            disabled
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Fecha</label>
                        <input
                            type="date"
                            name="date"
                            required
                            defaultValue={new Date(inspection.date).toISOString().split('T')[0]}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Modo</label>
                        <select
                            name="mode"
                            defaultValue={inspection.mode || 'In-Person'}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        >
                            <option value="In-Person">Presencial</option>
                            <option value="Virtual">Virtual</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Estado</label>
                        <select
                            name="status"
                            defaultValue={inspection.status}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        >
                            <option value="Scheduled">Programada</option>
                            <option value="Completed">Completada</option>
                            <option value="Cancelled">Cancelada</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn" style={{ backgroundColor: '#F3F4F6' }}>Cancelar</button>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
