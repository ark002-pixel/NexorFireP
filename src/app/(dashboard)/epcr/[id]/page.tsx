import { getPCR } from '@/actions/epcr';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PCRTabs from '@/components/epcr/PCRTabs';

export default async function PCRDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pcr = await getPCR(id);

    if (!pcr) {
        notFound();
    }

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/epcr" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                    Volver a la lista
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>
                        Reporte: {pcr.patient.firstName} {pcr.patient.lastName}
                    </h1>
                    <span style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#E0F2FE',
                        color: '#0369A1',
                        borderRadius: '9999px',
                        fontWeight: 600
                    }}>
                        {pcr.incident ? `Incidente #${pcr.incident.id.slice(0, 8)}` : 'Sin Incidente'}
                    </span>
                </div>
            </div>

            <div className="card">
                <PCRTabs pcr={pcr} />
            </div>
        </div>
    );
}
