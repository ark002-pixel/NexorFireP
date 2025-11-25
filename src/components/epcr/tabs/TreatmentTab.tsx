'use client';

import { addMedication, addProcedure } from '@/actions/epcr';
import { useState } from 'react';
import { Syringe, Plus, Stethoscope } from 'lucide-react';
import DateDisplay from '@/components/ui/DateDisplay';

export default function TreatmentTab({ pcr }: { pcr: any }) {
    const [isAddingMed, setIsAddingMed] = useState(false);
    const [isAddingProc, setIsAddingProc] = useState(false);

    const handleMedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await addMedication(
            pcr.id,
            formData.get('name') as string,
            formData.get('dose') as string,
            formData.get('route') as string,
            formData.get('response') as string
        );
        setIsAddingMed(false);
    };

    const handleProcSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await addProcedure(
            pcr.id,
            formData.get('name') as string,
            formData.get('successful') === 'true',
            formData.get('notes') as string
        );
        setIsAddingProc(false);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Medications Section */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Syringe size={20} /> Medicamentos
                    </h3>
                    <button onClick={() => setIsAddingMed(!isAddingMed)} className="btn btn-sm" style={{ padding: '0.25rem 0.5rem' }}>
                        <Plus size={16} /> Agregar
                    </button>
                </div>

                {isAddingMed && (
                    <div className="card" style={{ marginBottom: '1rem', backgroundColor: '#F9FAFB', padding: '1rem' }}>
                        <form onSubmit={handleMedSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input name="name" placeholder="Nombre del Medicamento" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input name="dose" placeholder="Dosis" required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                                <input name="route" placeholder="Vía (IV, IM, etc.)" required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            </div>
                            <input name="response" placeholder="Respuesta del Paciente" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button type="button" onClick={() => setIsAddingMed(false)} className="btn btn-sm" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                )}

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {pcr.medications?.length === 0 ? (
                        <li style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay medicamentos administrados.</li>
                    ) : (
                        pcr.medications?.map((med: any) => (
                            <li key={med.id} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px', marginBottom: '0.5rem', backgroundColor: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600 }}>{med.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}><DateDisplay date={med.time} /></span>
                                </div>
                                <div style={{ fontSize: '0.875rem' }}>
                                    {med.dose} - {med.route}
                                </div>
                                {med.response && (
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                        Respuesta: {med.response}
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Procedures Section */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Stethoscope size={20} /> Procedimientos
                    </h3>
                    <button onClick={() => setIsAddingProc(!isAddingProc)} className="btn btn-sm" style={{ padding: '0.25rem 0.5rem' }}>
                        <Plus size={16} /> Agregar
                    </button>
                </div>

                {isAddingProc && (
                    <div className="card" style={{ marginBottom: '1rem', backgroundColor: '#F9FAFB', padding: '1rem' }}>
                        <form onSubmit={handleProcSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input name="name" placeholder="Nombre del Procedimiento" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <select name="successful" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                <option value="true">Exitoso</option>
                                <option value="false">Fallido</option>
                            </select>
                            <input name="notes" placeholder="Notas" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button type="button" onClick={() => setIsAddingProc(false)} className="btn btn-sm" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Cancelar</button>
                                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                )}

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {pcr.procedures?.length === 0 ? (
                        <li style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay procedimientos registrados.</li>
                    ) : (
                        pcr.procedures?.map((proc: any) => (
                            <li key={proc.id} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px', marginBottom: '0.5rem', backgroundColor: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600 }}>{proc.name}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.1rem 0.4rem',
                                        borderRadius: '9999px',
                                        backgroundColor: proc.successful ? '#D1FAE5' : '#FEE2E2',
                                        color: proc.successful ? '#065F46' : '#991B1B'
                                    }}>
                                        {proc.successful ? 'Exitoso' : 'Fallido'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                                    <DateDisplay date={proc.time} />
                                </div>
                                {proc.notes && (
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        {proc.notes}
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
