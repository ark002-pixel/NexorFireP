'use client';

import { loginUser } from '@/actions/auth';
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
            {pending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
    );
}

export default function LoginPage() {
    return (
        <form action={async (formData) => {
            await loginUser(formData);
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', flexDirection: 'column', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logo.png"
                    alt="NexorFire"
                    width={280}
                    height={84}
                    style={{ width: 'auto', height: '84px' }}
                />
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Software Integral para Bomberos
                </p>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Bienvenido</h2>

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
                ¿No tienes una cuenta? <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Regístrate</Link>
            </p>
        </form>
    );
}
