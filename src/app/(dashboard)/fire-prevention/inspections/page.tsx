export const dynamic = 'force-dynamic';
import { getInspections, getInspectionTemplates } from '@/actions/fire-prevention';
import { getBuildings } from '@/actions/buildings';
import { IconClipboardCheck } from '@/components/ui/Icons';
import NewInspectionForm from '@/components/fire-prevention/NewInspectionForm';
import InspectionActions from '@/components/fire-prevention/InspectionActions';
import Link from 'next/link';
import DateDisplay from '@/components/ui/DateDisplay';

export default async function InspectionsPage() {
    const inspections = await getInspections();
    const buildings = await getBuildings();
    const templates = await getInspectionTemplates();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Gestión de Inspecciones</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/fire-prevention/inspections/builder" className="btn" style={{ backgroundColor: '#F3F4F6', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        Constructor de Inspecciones
                    </Link>
                    <NewInspectionForm buildings={buildings} templates={templates} />
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {inspections.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                                <IconClipboardCheck size={48} />
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)' }}>No hay inspecciones programadas.</p>
                        </div>
                    ) : (
                        inspections.map((inspection) => (
                            <div key={inspection.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{inspection.building.name}</h4>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            <DateDisplay date={inspection.date} />
                                        </p>
                                        {/* <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{inspection.mode}</p> */}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: inspection.status === 'Scheduled' ? '#DBEAFE' :
                                            inspection.status === 'Completed' ? '#D1FAE5' :
                                                inspection.status === 'Failed' ? '#FEE2E2' : '#F3F4F6',
                                        color: inspection.status === 'Scheduled' ? '#1E40AF' :
                                            inspection.status === 'Completed' ? '#065F46' :
                                                inspection.status === 'Failed' ? '#991B1B' : '#374151'
                                    }}>
                                        {{
                                            'Scheduled': 'Programada',
                                            'Completed': 'Completada',
                                            'Failed': 'Reprobada',
                                            'Passed': 'Aprobada',
                                            'In Progress': 'En Progreso'
                                        }[inspection.status] || inspection.status}
                                    </span>
                                    <Link
                                        href={`/fire-prevention/inspections/run/${inspection.id}`}
                                        className="btn btn-primary"
                                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', textDecoration: 'none' }}
                                    >
                                        Ejecutar
                                    </Link>
                                    <InspectionActions inspection={inspection} templates={templates} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

