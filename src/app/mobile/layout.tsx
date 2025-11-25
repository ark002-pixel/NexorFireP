import { ClipboardCheck, Home } from 'lucide-react';
import Link from 'next/link';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            <header style={{ backgroundColor: '#1F2937', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardCheck size={24} />
                    <span style={{ fontWeight: 600 }}>Inspector Móvil</span>
                </div>
                <Link href="/fire-prevention" style={{ color: 'white' }}>
                    <Home size={24} />
                </Link>
            </header>
            <main style={{ padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
}
