import ModuleTabs from '@/components/layout/ModuleTabs';
import { IconCalendar, IconHeartPulse, IconUserSquare2 } from '@/components/ui/Icons';

export default function PersonnelLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { name: 'Turnos y Roster', href: '/scheduling', icon: <IconCalendar size={18} /> },
        { name: 'Salud y Bienestar', href: '/scheduling/health', icon: <IconHeartPulse size={18} /> },
        { name: 'Hoja de Vida', href: '/scheduling/profiles', icon: <IconUserSquare2 size={18} /> },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Gestión de Personal (SGP)</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Administración de Recursos Humanos y Operativos</p>
            </div>
            <ModuleTabs tabs={tabs} />
            {children}
        </div>
    );
}
