export const dynamic = 'force-dynamic';
import { getActiveDispatches } from '@/actions/mobile';
import DispatchCard from '@/components/mobile/DispatchCard';
import { Radio } from 'lucide-react';

export default async function MobilePage() {
    const dispatches = await getActiveDispatches();

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '4rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '8px'
            }}>
                <Radio size={24} className="animate-pulse" color="#EF4444" />
                <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Mobile Responder</h1>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF', margin: 0 }}>Unidad: E-101</p>
                </div>
            </div>

            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#6B7280', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
                DESPACHOS ACTIVOS ({dispatches.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {dispatches.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9CA3AF' }}>
                        <p>No hay despachos activos en este momento.</p>
                    </div>
                ) : (
                    dispatches.map((dispatch) => (
                        <DispatchCard key={dispatch.id} incident={dispatch} />
                    ))
                )}
            </div>
        </div>
    );
}

