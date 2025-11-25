export const dynamic = 'force-dynamic';
import { getInvestigations } from '@/actions/analytics';
import { Search, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';

export default async function InvestigationsPage() {
    const investigations = await getInvestigations();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Investigaciones de Incendios</h2>
                <button className="btn btn-primary">
                    <Search size={20} style={{ marginRight: '0.5rem' }} />
                    Nueva InvestigaciÃ³n
                </button>
            </div>

            <div className="card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {investigations.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <Search size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-text-secondary)' }} />
                            <p style={{ color: 'var(--color-text-secondary)' }}>No hay investigaciones activas.</p>
                        </div>
                    ) : (
                        investigations.map((incident) => (
                            <div key={incident.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{incident.type}</h4>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Calendar size={14} />
                                            <DateDisplay date={incident.date} />
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <MapPin size={14} />
                                            {incident.address}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/analytics/investigations/${incident.id}`} className="btn" style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

