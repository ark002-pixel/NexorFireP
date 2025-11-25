import { getInspectionById } from '@/actions/fire-prevention';
import MobileChecklist from '@/components/mobile/MobileChecklist';
import { ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function InspectionChecklistPage({ params }: { params: { id: string } }) {
    const inspection = await getInspectionById(params.id);

    if (!inspection) {
        notFound();
    }

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/mobile/inspections" style={{ display: 'flex', alignItems: 'center', color: '#6B7280', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <ChevronLeft size={16} />
                    Volver a la lista
                </Link>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{inspection.building.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', marginTop: '0.5rem' }}>
                    <MapPin size={16} />
                    {inspection.building.address}
                </div>
            </div>

            <MobileChecklist inspectionId={inspection.id} />
        </div>
    );
}
