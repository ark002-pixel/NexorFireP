'use client';

import { registerUser } from '@/actions/auth';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

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
    return (
        <form action={registerUser}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Crear Cuenta</h2>

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
