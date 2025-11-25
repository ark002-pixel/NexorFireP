export const dynamic = 'force-dynamic';
import { HeartPulse, FileText, AlertTriangle } from 'lucide-react';

export default function HealthPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Salud y Bienestar</h2>
                <button className="btn btn-primary">
                    <HeartPulse size={20} style={{ marginRight: '0.5rem' }} />
                    Nueva Ficha MÃ©dica
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={20} color="#F59E0B" />
                        Alertas MÃ©dicas
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '6px', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#92400E' }}>
                            <strong>Sgto. PÃ©rez:</strong> Examen periÃ³dico vencido (5 dÃ­as)
                        </li>
                        <li style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '6px', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#92400E' }}>
                            <strong>Bombero Ruiz:</strong> RestricciÃ³n operativa temporal
                        </li>
                    </ul>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} />
                        Protocolos MEDEVAC
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#F3F4F6', color: 'inherit' }}>
                            Protocolo de Traslado AÃ©reo
                        </button>
                        <button className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#F3F4F6', color: 'inherit' }}>
                            Directorio de Hospitales Nivel 3
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

