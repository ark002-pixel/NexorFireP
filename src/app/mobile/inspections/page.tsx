import { getInspections } from '@/actions/fire-prevention';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';

export default async function MobileInspectionsPage() {
    const inspections = await getInspections();

    return (
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>Mis Asignaciones</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inspections.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '2rem' }}>No tienes inspecciones asignadas.</p>
                ) : (
                    inspections.map((inspection) => (
                        <Link key={inspection.id} href={`/mobile/inspections/${inspection.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderLeft: '4px solid #3B82F6' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{inspection.building.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <MapPin size={14} />
                                            {inspection.building.address}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.875rem' }}>
                                            <Calendar size={14} />
                                            <DateDisplay date={inspection.date} />
                                        </div>
                                    </div>
                                    <ChevronRight size={20} color="#9CA3AF" />
                                </div>
                                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#EFF6FF', color: '#1D4ED8', borderRadius: '4px', fontWeight: 500 }}>
                                        {inspection.status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
