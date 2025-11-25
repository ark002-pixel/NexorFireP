'use client';

import { addPrePlanContact, deletePrePlanContact } from '@/actions/buildings';
import { Trash2, Plus, User, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ContactsForm({ prePlanId, contacts }: { prePlanId: string, contacts: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={20} />
                    Contactos de Emergencia
                </h3>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAdding(true)}>
                    <Plus size={16} style={{ marginRight: '0.25rem' }} /> Agregar
                </button>
            </div>

            {isAdding && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <form action={async (formData) => {
                        await addPrePlanContact(prePlanId, {
                            name: formData.get('name'),
                            role: formData.get('role'),
                            phone: formData.get('phone'),
                            email: formData.get('email'),
                            notes: formData.get('notes'),
                        });
                        setIsAdding(false);
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <input name="name" placeholder="Nombre Completo" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="role" placeholder="Rol (ej. Dueño, Gerente)" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="phone" placeholder="Teléfono" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                            <input name="email" placeholder="Correo Electrónico" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                        </div>
                        <input name="notes" placeholder="Notas adicionales" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)', marginBottom: '1rem' }} />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button type="button" onClick={() => setIsAdding(false)} className="btn btn-sm">Cancelar</button>
                            <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {contacts.map((contact) => (
                    <div key={contact.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: 600 }}>{contact.name} <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>({contact.role})</span></p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={14} /> {contact.phone}</span>
                                {contact.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {contact.email}</span>}
                            </div>
                        </div>
                        <button onClick={() => deletePrePlanContact(contact.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {contacts.length === 0 && !isAdding && (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: '0.875rem' }}>No hay contactos registrados.</p>
                )}
            </div>
        </div>
    );
}
