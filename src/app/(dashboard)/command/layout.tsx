import ModuleTabs from '@/components/layout/ModuleTabs';
import { IconShieldAlert, IconRadio, IconMap, IconActivity } from '@/components/ui/Icons';

export default function CommandLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { name: 'Panel de Comando', href: '/command', icon: <IconActivity size={18} /> },
        { name: 'Incidentes Activos', href: '/command/incidents', icon: <IconShieldAlert size={18} /> },
        { name: 'Despacho', href: '/command/dispatch', icon: <IconRadio size={18} /> },
        { name: 'Mapa Operativo', href: '/command/map', icon: <IconMap size={18} /> },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Comando de Incidentes (CRI)</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Gestión Operativa y Respuesta</p>
            </div>
            <ModuleTabs tabs={tabs} />
            {children}
        </div>
    );
}
