import { FileText, Download } from 'lucide-react';
import DateDisplay from '@/components/ui/DateDisplay';

export default function ReportsPage() {
    const reports = [
        { id: 1, name: 'Reporte Mensual de Incidentes - Octubre 2023', date: '2023-11-01', size: '2.4 MB' },
        { id: 2, name: 'Auditoría de Inspecciones Q3 2023', date: '2023-10-15', size: '1.8 MB' },
        { id: 3, name: 'Estado de Flota Vehicular', date: '2023-11-20', size: '0.9 MB' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Reportes Generados</h2>
                <button className="btn btn-primary">
                    <FileText size={20} style={{ marginRight: '0.5rem' }} />
                    Generar Nuevo Reporte
                </button>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} />
                    Reportes Regulatorios (Oficiales)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>UNGRD</h4>
                        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>Informe de Gestión del Riesgo</p>
                        <button className="btn" style={{ width: '100%', fontSize: '0.875rem' }}>Generar XML</button>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>DIAN</h4>
                        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>Reporte de Facturación Electrónica</p>
                        <button className="btn" style={{ width: '100%', fontSize: '0.875rem' }}>Generar Reporte</button>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: '#F9FAFB' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>ANLA</h4>
                        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>Certificados Ambientales</p>
                        <button className="btn" style={{ width: '100%', fontSize: '0.875rem' }}>Exportar Datos</button>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Historial de Reportes</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {reports.map((report) => (
                        <div key={report.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#64748B' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 600 }}>{report.name}</h4>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        Generado el <DateDisplay date={report.date} /> • {report.size}
                                    </p>
                                </div>
                            </div>
                            <button className="btn" style={{ color: 'var(--color-primary)', backgroundColor: 'transparent', border: '1px solid var(--color-border)' }}>
                                <Download size={18} style={{ marginRight: '0.5rem' }} />
                                Descargar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
