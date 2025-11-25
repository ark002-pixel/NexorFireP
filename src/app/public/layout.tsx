import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <header style={{ backgroundColor: '#DC2626', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '8px', color: '#DC2626' }}>
                        <Flame size={24} fill="#DC2626" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>NexorFire</h1>
                        <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Portal de Servicios Ciudadanos</p>
                    </div>
                </div>
                <nav>
                    <Link href="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>
                        Acceso Funcionarios
                    </Link>
                </nav>
            </header>
            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem', color: '#6B7280', fontSize: '0.875rem' }}>
                &copy; {new Date().getFullYear()} Bomberos Voluntarios de Itagüí. Todos los derechos reservados.
            </footer>
        </div>
    );
}
