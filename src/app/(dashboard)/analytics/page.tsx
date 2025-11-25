export const dynamic = 'force-dynamic';
import { getAnalyticsData } from '@/actions/analytics';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    // Calculate max for simple bar chart scaling
    const maxIncidentCount = Math.max(...data.incidents.byType.map(i => i._count.type), 1);

    return (
        <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', borderRadius: '8px', color: '#DC2626' }}>
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total Incidentes</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{data.incidents.total}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#DBEAFE', borderRadius: '8px', color: '#2563EB' }}>
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total Inspecciones</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{data.inspections.total}</p>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#D1FAE5', borderRadius: '8px', color: '#059669' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Edificios Registrados</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{data.buildings.total}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Incidentes por Tipo</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.incidents.byType.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay datos suficientes.</p>
                        ) : (
                            data.incidents.byType.map((item) => (
                                <div key={item.type}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                                        <span style={{ fontWeight: 500 }}>{item.type}</span>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>{item._count.type}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${(item._count.type / maxIncidentCount) * 100}%`,
                                            height: '100%',
                                            backgroundColor: '#DC2626',
                                            borderRadius: '4px'
                                        }} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Estado de Inspecciones</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.inspections.byStatus.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No hay datos suficientes.</p>
                        ) : (
                            data.inspections.byStatus.map((item) => (
                                <div key={item.status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                    <span style={{ fontWeight: 500 }}>{item.status}</span>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        backgroundColor: '#F1F5F9',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}>
                                        {item._count.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

