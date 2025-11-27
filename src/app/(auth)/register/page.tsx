'use client';

import { registerUser } from '@/actions/auth';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={pending}
        >
            {pending ? 'Registrando...' : 'Registrarse'}
        </button>
    );
}

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);

    return (
        <form action={async (formData) => {
            setError(null);
            const result = await registerUser(formData);
            if (result?.error) {
                setError(result.error);
            }
        }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Crear Cuenta</h2>

            {error && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Nombre Completo</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <SubmitButton />

            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                ¿Ya tienes una cuenta? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Inicia Sesión</Link>
            </p>
        </form>
    );
}
