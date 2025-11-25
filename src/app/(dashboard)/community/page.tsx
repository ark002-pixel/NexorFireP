import { getResidents } from '@/actions/community';
import { Users, Home, Activity } from 'lucide-react';
import NewResidentForm from '@/components/community/NewResidentForm';

export default async function CommunityPage() {
    const residents = await getResidents();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Community Connect</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Portal de Información Comunitaria</p>
                </div>
                <NewResidentForm />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} />
                    Residentes Registrados
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {residents.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay residentes registrados.</p>
                    ) : (
                        residents.map((resident) => (
                            <div key={resident.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{resident.name}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            <Home size={14} />
                                            <span>{resident.address}</span>
                                        </div>
                                    </div>
                                    {resident.accessCode && (
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                            Código: {resident.accessCode}
                                        </span>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', fontSize: '0.875rem' }}>
                                    {resident.functionalNeeds && (
                                        <div>
                                            <span style={{ fontWeight: 600, display: 'block', color: 'var(--color-text-main)' }}>Necesidades Funcionales:</span>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>{resident.functionalNeeds}</span>
                                        </div>
                                    )}
                                    {resident.medicalProfile && (
                                        <div>
                                            <span style={{ fontWeight: 600, display: 'block', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Activity size={14} /> Alertas Médicas:
                                            </span>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                                {resident.medicalProfile.conditions && `Condiciones: ${resident.medicalProfile.conditions}. `}
                                                {resident.medicalProfile.allergies && `Alergias: ${resident.medicalProfile.allergies}.`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
