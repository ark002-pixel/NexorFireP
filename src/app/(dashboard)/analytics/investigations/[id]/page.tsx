import { getActiveIncidents } from '@/actions/command'; // Using this as a proxy to get incident data
import ChainOfCustodyForm from '@/components/investigations/ChainOfCustodyForm';
import FieldNotesForm from '@/components/investigations/FieldNotesForm';
import { ChevronLeft, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';

// Mock function since we don't have a dedicated getInvestigationById yet
async function getInvestigation(id: string) {
    const incidents = await getActiveIncidents();
    return incidents.find(i => i.id === id) || incidents[0]; // Fallback for demo
}

export default async function InvestigationDetailsPage({ params }: { params: { id: string } }) {
    const incident = await getInvestigation(params.id);

    if (!incident) {
        return <div>Investigación no encontrada</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/analytics/investigations" style={{ display: 'flex', alignItems: 'center', color: '#6B7280', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <ChevronLeft size={16} />
                    Volver a Investigaciones
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                            Investigación: {incident.type}
                        </h2>
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#6B7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} />
                                <DateDisplay date={incident.date} />
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} />
                                {incident.address}
                            </span>
                        </div>
                    </div>
                    <span style={{ padding: '0.5rem 1rem', backgroundColor: '#FEF2F2', color: '#EF4444', borderRadius: '9999px', fontWeight: 600 }}>
                        EN CURSO
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <FieldNotesForm />
                <ChainOfCustodyForm />
            </div>
        </div>
    );
}
