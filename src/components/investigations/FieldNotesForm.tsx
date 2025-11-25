'use client';

import { Camera, FileText } from 'lucide-react';

export default function FieldNotesForm() {
    return (
        <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <FileText size={20} />
                Documentación de Campo
            </h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Observaciones Iniciales</label>
                    <textarea
                        className="input"
                        rows={4}
                        placeholder="Describa las condiciones iniciales de la escena, puntos de origen observados, patrones de fuego, etc."
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Registro Fotográfico</label>
                    <div style={{ border: '2px dashed #E5E7EB', borderRadius: '8px', padding: '2rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#F9FAFB' }}>
                        <Camera size={32} style={{ color: '#9CA3AF', marginBottom: '0.5rem' }} />
                        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Haga clic para cargar fotos o arrastre archivos aquí</p>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Croquis / Plano</label>
                    <div style={{ border: '2px dashed #E5E7EB', borderRadius: '8px', padding: '2rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#F9FAFB' }}>
                        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Cargar archivo de plano (PDF/IMG)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
