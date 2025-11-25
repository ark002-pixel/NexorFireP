import ModuleTabs from '@/components/layout/ModuleTabs';
import { IconTruck, IconWrench, IconLayoutDashboard } from '@/components/ui/Icons';

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { name: 'Panel General', href: '/assets', icon: <IconLayoutDashboard size={18} /> },
        { name: 'Vehículos', href: '/assets/vehicles', icon: <IconTruck size={18} /> },
        { name: 'Equipos', href: '/assets/equipment', icon: <IconWrench size={18} /> },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Activos e Inventario</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Gestión de Flota y Equipos (S-IAL)</p>
            </div>
            <ModuleTabs tabs={tabs} />
            {children}
        </div>
    );
}
