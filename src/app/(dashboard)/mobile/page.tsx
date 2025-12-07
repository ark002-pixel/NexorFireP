
'use client';

import Link from 'next/link';
import {
    IconClipboardCheck,
    IconMap,
    IconAlertTriangle,
    IconUser
} from '@/components/ui/Icons';

export default function MobileDashboard() {
    return (
        <div style={{ padding: '1rem', paddingBottom: '5rem' }}>
            {/* Header / Profile Summary */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                backgroundColor: 'var(--color-surface)',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <IconUser size={24} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Hola, Inspector</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                        Zona: Norte • En Turno
                    </p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Mi Jornada</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>

                {/* My Route */}
                <Link href="/mobile/routes" style={{ textDecoration: 'none' }}>
                    <div style={{
                        backgroundColor: '#EFF6FF',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#1E40AF'
                    }}>
                        <IconMap size={32} />
                        <span style={{ fontWeight: 600 }}>Mi Ruta</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>3 Paradas hoy</span>
                    </div>
                </Link>

                {/* My Inspections */}
                <Link href="/mobile/inspections" style={{ textDecoration: 'none' }}>
                    <div style={{
                        backgroundColor: '#ECFDF5',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#065F46'
                    }}>
                        <IconClipboardCheck size={32} />
                        <span style={{ fontWeight: 600 }}>Lista</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>5 Asignadas</span>
                    </div>
                </Link>
            </div>

            {/* Safety Report Button */}
            <Link href="/mobile/safety" style={{ textDecoration: 'none' }}>
                <div style={{
                    backgroundColor: '#FEF2F2',
                    padding: '1rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: '#991B1B',
                    border: '1px solid #FECACA'
                }}>
                    <div style={{
                        padding: '0.5rem',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        display: 'flex'
                    }}>
                        <IconAlertTriangle size={20} />
                    </div>
                    <div>
                        <span style={{ display: 'block', fontWeight: 600 }}>Reportar Incidente</span>
                        <span style={{ fontSize: '0.75rem' }}>Accidente, Robo o Peligro</span>
                    </div>
                </div>
            </Link>

            {/* Recent Activity List */}
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>Próxima Parada</h3>
            <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: '1rem',
                borderRadius: '12px',
                borderLeft: '4px solid var(--color-primary)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>Centro Comercial Andino</span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '10px' }}>10:00 AM</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    Cra 11 #82-71
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-primary" style={{ flex: 1 }}>Iniciar Ruta</button>
                    <button className="btn btn-sm btn-secondary" style={{ flex: 1 }}>Detalles</button>
                </div>
            </div>
        </div>
    );
}
