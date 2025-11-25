import ModuleTabs from '@/components/layout/ModuleTabs';
import { IconClipboardCheck, IconFileText, IconLayoutDashboard } from '@/components/ui/Icons';

export default function FirePreventionLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { name: 'Panel General', href: '/fire-prevention', icon: <IconLayoutDashboard size={18} /> },
        { name: 'Inspecciones', href: '/fire-prevention/inspections', icon: <IconClipboardCheck size={18} /> },
        { name: 'Permisos', href: '/fire-prevention/permits', icon: <IconFileText size={18} /> },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Prevención de Incendios</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Gestión Integral de Riesgos (GIPR)</p>
            </div>
            <ModuleTabs tabs={tabs} />
            {children}
        </div>
    );
}
