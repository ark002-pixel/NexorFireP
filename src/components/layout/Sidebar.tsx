'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import {
  LayoutDashboard,
  Map,
  ShieldCheck,
  Wrench,
  FileText,
  Ambulance,
  Smartphone,
  Calendar,
  Users,
  Truck,
  Droplet,
  GraduationCap,
  BarChart3,
  Search,
  ShieldAlert,
  CalendarDays,
  HeartPulse,
  LogOut
} from 'lucide-react';

const menuGroups = [
  {
    title: 'General',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    ]
  },
  {
    title: 'GIPR (Prevención)',
    items: [
      { name: 'Prevención', href: '/fire-prevention', icon: ShieldCheck },
      { name: 'Pre-Incidentes', href: '/pre-incident-planning', icon: Map },
      { name: 'ITM', href: '/itm', icon: Wrench },
      { name: 'Hidrantes', href: '/hydrants', icon: Droplet },
    ]
  },
  {
    title: 'CRI (Respuesta)',
    items: [
      { name: 'Comando', href: '/command', icon: ShieldAlert },
      { name: 'NERIS', href: '/neris', icon: FileText },
      { name: 'ePCR', href: '/epcr', icon: Ambulance },
      { name: 'Mobile Responder', href: '/mobile/inspections', icon: Smartphone },
    ]
  },
  {
    title: 'SOA (Soporte)',
    items: [
      { name: 'Gestión de Personal', href: '/scheduling', icon: Users },
      { name: 'Eventos y Actividades', href: '/events', icon: CalendarDays },
      { name: 'Activos e Inventario', href: '/assets', icon: Truck },
      { name: 'Entrenamiento', href: '/training', icon: GraduationCap },
    ]
  },
  {
    title: 'SIO (Inteligencia)',
    items: [
      { name: 'Analítica', href: '/analytics', icon: BarChart3 },
      { name: 'Investigaciones', href: '/analytics/investigations', icon: Search },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <ShieldCheck size={24} />
          <span>NexorFire</span>
        </div>
      </div>
      <nav className={styles.nav} style={{ overflowY: 'auto' }}>
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              padding: '0 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-sidebar-text)',
              opacity: 0.7,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}>
              {group.title}
            </h3>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <form action={async () => {
          const { logoutUser } = await import('@/actions/auth');
          await logoutUser();
        }}>
          <button
            type="submit"
            className={styles.navItem}
            style={{
              width: '100%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#EF4444'
            }}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
