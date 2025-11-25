import { MapPin, Clock, Navigation } from 'lucide-react';

interface DispatchCardProps {
    incident: any;
}

export default function DispatchCard({ incident }: DispatchCardProps) {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #EF4444' // Red accent for emergency
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1F2937' }}>{incident.type}</h3>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#EF4444',
                    backgroundColor: '#FEE2E2',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                }}>
                    DESPACHADO
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#4B5563' }}>
                <MapPin size={18} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{incident.address}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6B7280', fontSize: '0.875rem' }}>
                <Clock size={16} />
                <span>{new Date(incident.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            {incident.description && (
                <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {incident.description}
                </p>
            )}

            <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <Navigation size={18} />
                Navegar
            </button>
        </div>
    );
}
