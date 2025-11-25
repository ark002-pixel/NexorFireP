'use client';

import dynamic from 'next/dynamic';

const HydrantMap = dynamic(() => import('./HydrantMap'), {
    ssr: false,
    loading: () => <div style={{ height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Mapa...</div>
});

export default function HydrantMapWrapper({ hydrants }: { hydrants: any[] }) {
    return <HydrantMap hydrants={hydrants} />;
}
