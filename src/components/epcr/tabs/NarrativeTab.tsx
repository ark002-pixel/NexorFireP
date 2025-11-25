'use client';

import { updatePCR } from '@/actions/epcr';
import { useState } from 'react';
import { FileText, Save, PenTool } from 'lucide-react';

export default function NarrativeTab({ pcr }: { pcr: any }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            narrative: formData.get('narrative'),
        };

        await updatePCR(pcr.id, data);
        setIsSaving(false);
        alert('Narrativa guardada correctamente');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} /> Narrativa del Paciente
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                        Utilice el formato SOAP (Subjetivo, Objetivo, Análisis, Plan) para documentar la atención.
                    </p>
                    <textarea
                        name="narrative"
                        defaultValue={pcr.narrative || ''}
                        rows={15}
                        style={{ width: '100%', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', lineHeight: '1.5' }}
                        placeholder="S: Paciente refiere dolor en..."
                    />
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PenTool size={20} /> Firmas
                </h3>
                <div className="card" style={{ backgroundColor: '#F9FAFB', border: '1px dashed var(--color-border)', textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Firma Digital del Paciente / Testigo</p>
                    <button type="button" className="btn" style={{ marginTop: '1rem' }} disabled>Capturar Firma (Próximamente)</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    <Save size={18} style={{ marginRight: '0.5rem' }} />
                    {isSaving ? 'Guardando...' : 'Guardar Narrativa'}
                </button>
            </div>
        </form>
    );
}
