'use client';

import { addVitalSign } from '@/actions/epcr';
import { useState } from 'react';
import { HeartPulse, Plus } from 'lucide-react';
import DateDisplay from '@/components/ui/DateDisplay';

export default function VitalsTab({ pcr }: { pcr: any }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            bpSystolic: parseInt(formData.get('bpSystolic') as string) || null,
            bpDiastolic: parseInt(formData.get('bpDiastolic') as string) || null,
            pulse: parseInt(formData.get('pulse') as string) || null,
            respRate: parseInt(formData.get('respRate') as string) || null,
            spo2: parseInt(formData.get('spo2') as string) || null,
            temp: parseFloat(formData.get('temp') as string) || null,
            gcs: parseInt(formData.get('gcs') as string) || null,
            bloodGlucose: parseInt(formData.get('bloodGlucose') as string) || null,
        };

        await addVitalSign(pcr.id, data);
        setIsAdding(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HeartPulse size={20} /> Signos Vitales
                </h3>
                <button onClick={() => setIsAdding(!isAdding)} className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '0.5rem' }} />
                    Agregar Signos
                </button>
            </div>

            {isAdding && (
                <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#F9FAFB' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Presión Sistólica</label>
                                <input type="number" name="bpSystolic" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Presión Diastólica</label>
                                <input type="number" name="bpDiastolic" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Pulso (BPM)</label>
                                <input type="number" name="pulse" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Resp. (RPM)</label>
                                <input type="number" name="respRate" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>SpO2 (%)</label>
                                <input type="number" name="spo2" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Temp (°C)</label>
                                <input type="number" step="0.1" name="temp" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>GCS (3-15)</label>
                                <input type="number" name="gcs" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Glucosa (mg/dL)</label>
                                <input type="number" name="bloodGlucose" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" onClick={() => setIsAdding(false)} className="btn" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem' }}>Hora</th>
                            <th style={{ padding: '0.75rem' }}>BP</th>
                            <th style={{ padding: '0.75rem' }}>Pulso</th>
                            <th style={{ padding: '0.75rem' }}>Resp</th>
                            <th style={{ padding: '0.75rem' }}>SpO2</th>
                            <th style={{ padding: '0.75rem' }}>Temp</th>
                            <th style={{ padding: '0.75rem' }}>GCS</th>
                            <th style={{ padding: '0.75rem' }}>Glucosa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcr.vitalSigns?.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No hay signos vitales registrados.</td>
                            </tr>
                        ) : (
                            pcr.vitalSigns?.map((vs: any) => (
                                <tr key={vs.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '0.75rem' }}><DateDisplay date={vs.time} /></td>
                                    <td style={{ padding: '0.75rem' }}>{vs.bpSystolic}/{vs.bpDiastolic}</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.pulse}</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.respRate}</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.spo2}%</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.temp}°C</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.gcs}</td>
                                    <td style={{ padding: '0.75rem' }}>{vs.bloodGlucose}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
