'use client';

import { updatePatient, addPatientAllergy, addPatientHistory } from '@/actions/epcr';
import { useState } from 'react';
import { User, Save, Plus, AlertTriangle, FileText } from 'lucide-react';

export default function PatientTab({ pcr }: { pcr: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const [newAllergy, setNewAllergy] = useState({ allergen: '', reaction: '' });
    const [newHistory, setNewHistory] = useState({ condition: '', notes: '' });

    const handleUpdatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            dob: formData.get('dob') ? new Date(formData.get('dob') as string) : null,
            gender: formData.get('gender'),
            address: formData.get('address'),
        };

        await updatePatient(pcr.patient.id, data);
        setIsSaving(false);
        alert('Datos del paciente actualizados');
    };

    const handleAddAllergy = async () => {
        if (!newAllergy.allergen) return;
        await addPatientAllergy(pcr.patient.id, newAllergy.allergen, newAllergy.reaction);
        setNewAllergy({ allergen: '', reaction: '' });
    };

    const handleAddHistory = async () => {
        if (!newHistory.condition) return;
        await addPatientHistory(pcr.patient.id, newHistory.condition, newHistory.notes);
        setNewHistory({ condition: '', notes: '' });
    };

    const formatDate = (date: string | Date | null) => {
        if (!date) return '';
        return new Date(date).toISOString().slice(0, 10);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <form onSubmit={handleUpdatePatient}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={20} /> Información Demográfica
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre</label>
                        <input name="firstName" defaultValue={pcr.patient.firstName} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Apellido</label>
                        <input name="lastName" defaultValue={pcr.patient.lastName} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Fecha de Nacimiento</label>
                        <input type="date" name="dob" defaultValue={formatDate(pcr.patient.dob)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Género</label>
                        <select name="gender" defaultValue={pcr.patient.gender || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                            <option value="">Seleccionar...</option>
                            <option value="Male">Masculino</option>
                            <option value="Female">Femenino</option>
                            <option value="Other">Otro</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Dirección</label>
                        <input name="address" defaultValue={pcr.patient.address || ''} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }} />
                    </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        <Save size={16} style={{ marginRight: '0.5rem' }} /> Guardar Datos
                    </button>
                </div>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={20} /> Alergias
                    </h3>
                    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <input
                            placeholder="Alergeno"
                            value={newAllergy.allergen}
                            onChange={(e) => setNewAllergy({ ...newAllergy, allergen: e.target.value })}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        />
                        <input
                            placeholder="Reacción"
                            value={newAllergy.reaction}
                            onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        />
                        <button type="button" onClick={handleAddAllergy} className="btn" style={{ padding: '0.5rem' }}><Plus size={20} /></button>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pcr.patient.allergies?.map((allergy: any) => (
                            <li key={allergy.id} style={{ padding: '0.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500 }}>{allergy.allergen}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{allergy.reaction}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} /> Historial Médico
                    </h3>
                    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <input
                            placeholder="Condición"
                            value={newHistory.condition}
                            onChange={(e) => setNewHistory({ ...newHistory, condition: e.target.value })}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        />
                        <input
                            placeholder="Notas"
                            value={newHistory.notes}
                            onChange={(e) => setNewHistory({ ...newHistory, notes: e.target.value })}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        />
                        <button type="button" onClick={handleAddHistory} className="btn" style={{ padding: '0.5rem' }}><Plus size={20} /></button>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pcr.patient.history?.map((history: any) => (
                            <li key={history.id} style={{ padding: '0.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500 }}>{history.condition}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{history.notes}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
