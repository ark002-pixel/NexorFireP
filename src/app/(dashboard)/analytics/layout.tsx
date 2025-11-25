import ModuleTabs from '@/components/layout/ModuleTabs';
import { IconBarChart3, IconSearch, IconFileText } from '@/components/ui/Icons';

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { name: 'Panel General', href: '/analytics', icon: <IconBarChart3 size={18} /> },
        { name: 'Investigaciones', href: '/analytics/investigations', icon: <IconSearch size={18} /> },
        { name: 'Reportes', href: '/analytics/reports', icon: <IconFileText size={18} /> },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Inteligencia Operacional (SIO)</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Analítica de Datos e Investigaciones</p>
            </div>
            <ModuleTabs tabs={tabs} />
            {children}
        </div>
    );
}
