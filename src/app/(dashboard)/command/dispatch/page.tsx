export const dynamic = 'force-dynamic';
import { Radio, Mic, Volume2 } from 'lucide-react';

export default function DispatchPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Consola de Despacho</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#FEF2F2', color: '#EF4444', borderRadius: '9999px', fontWeight: 600 }}>
                        <Radio size={18} />
                        EN AIRE
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827', color: 'white' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Volume2 size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Canal Principal: TAC-1</h3>
                        <p style={{ color: '#9CA3AF' }}>Esperando transmisiones...</p>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Unidades Disponibles</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {['M-01', 'M-02', 'B-01', 'R-01'].map((unit) => (
                            <div key={unit} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#F3F4F6', borderRadius: '6px' }}>
                                <span style={{ fontWeight: 600 }}>{unit}</span>
                                <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', backgroundColor: '#D1FAE5', color: '#065F46', borderRadius: '4px' }}>DISPONIBLE</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

