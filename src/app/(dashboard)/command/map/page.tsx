export const dynamic = 'force-dynamic';
'use client';

import dynamic from 'next/dynamic';

const OperationalMap = dynamic(() => import('@/components/command/OperationalMap'), {
    ssr: false,
    loading: () => <div style={{ height: '600px', backgroundColor: '#E5E7EB', borderRadius: '12px' }} />
});

export default function MapPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Mapa Operativo</h2>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                <OperationalMap height="75vh" />
            </div>
        </div>
    );
}

