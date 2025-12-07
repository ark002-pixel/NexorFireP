'use client';

import { loginUser } from '@/actions/auth';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await loginUser(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
            // If success, the action redirects automatically.
        } catch (e) {
            setError('Ocurrió un error inesperado al intentar iniciar sesión.');
            setLoading(false);
        }
    }

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            zIndex: 10
        }}>
            <form action={handleSubmit}>
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

                {error && (
                    <div style={{
                        backgroundColor: '#FEF2F2',
                        color: '#B91C1C',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        border: '1px solid #FECACA'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="usuario@ejemplo.com"
                        className="input"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #D1D5DB'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="input"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #D1D5DB'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>¿No tienes cuenta? </span>
                    <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
                        Regístrate
                    </Link>
                </div>
            </form>
        </div>
    );
}
