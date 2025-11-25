'use client';

import { updatePCR } from '@/actions/epcr';
import { useState } from 'react';
import { Activity, Save } from 'lucide-react';

export default function AssessmentTab({ pcr }: { pcr: any }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            chiefComplaint: formData.get('chiefComplaint'),
            secondaryComplaint: formData.get('secondaryComplaint'),
            impression: formData.get('impression'),
        };

        await updatePCR(pcr.id, data);
        setIsSaving(false);
        alert('Evaluación guardada correctamente');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={20} /> Evaluación del Paciente
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Queja Principal</label>
                        <input name="chiefComplaint" defaultValue={pcr.chiefComplaint} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Queja Secundaria</label>
                        <input name="secondaryComplaint" defaultValue={pcr.secondaryComplaint || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Impresión del Proveedor</label>
                        <input name="impression" defaultValue={pcr.impression || ''} placeholder="Ej. Dolor Torácico, Posible IAM" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <Save size={18} style={{ marginRight: '0.5rem' }} />
                    {isSaving ? 'Guardando...' : 'Guardar Evaluación'}
                </button>
            </div>
        </form>
    );
}
