export const dynamic = 'force-dynamic';
import { getShifts, deleteShift } from '@/actions/scheduling';
import { Calendar, Clock, Users } from 'lucide-react';
import NewShiftForm from '@/components/scheduling/NewShiftForm';
import DateDisplay from '@/components/ui/DateDisplay';
import GenericActionButtons from '@/components/ui/GenericActionButtons';

export default async function SchedulingPage() {
    const shifts = await getShifts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1.5rem' }}>
                <NewShiftForm />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={20} />
                    Próximos Turnos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {shifts.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay turnos programados.</p>
                    ) : (
                        shifts.map((shift) => (
                            <div key={shift.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                    <GenericActionButtons id={shift.id} onDelete={deleteShift} deleteConfirmMessage="¿Está seguro de que desea eliminar este turno?" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingRight: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{shift.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            <DateDisplay date={shift.date} />
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        <Clock size={16} />
                                        <span>
                                            {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                            {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                    <h5 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Users size={16} />
                                        Personal Asignado
                                    </h5>
                                    {shift.roster.length === 0 ? (
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>Sin personal asignado</p>
                                    ) : (
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {shift.roster.map((entry) => (
                                                <li key={entry.id} style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                                    <span style={{ fontWeight: 500 }}>{entry.user.name}</span> - <span style={{ color: 'var(--color-text-secondary)' }}>{entry.role} ({entry.unit || 'Sin unidad'})</span>
                                                </li>
                                            ))}
                                        </ul>
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

