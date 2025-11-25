export const dynamic = 'force-dynamic';
import { getBuildings } from '@/actions/buildings';
import { Building, MapPin, Activity } from 'lucide-react';
import Link from 'next/link';

export default async function OccupanciesPage() {
    const buildings = await getBuildings();

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Ocupaciones (Occupancy 360)</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>GestiÃ³n integral de edificaciones y riesgos</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {buildings.map((building) => (
                    <div key={building.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: '#F3F4F6', borderRadius: '8px', color: '#374151' }}>
                                <Building size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{building.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                    <MapPin size={14} />
                                    <span>{building.address}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {building.type}
                            </span>
                            <Link
                                href={`/fire-prevention/occupancies/${building.id}`}
                                className="btn btn-primary"
                                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                            >
                                <Activity size={16} style={{ marginRight: '0.5rem' }} />
                                Gestionar 360Â°
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

