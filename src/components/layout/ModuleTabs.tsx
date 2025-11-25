'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface Tab {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

export default function ModuleTabs({ tabs }: { tabs: Tab[] }) {
    const pathname = usePathname();

    return (
        <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
            <nav style={{ display: 'flex', gap: '2rem' }}>
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || (pathname.startsWith(tab.href) && tab.href !== '/');

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                paddingBottom: '1rem',
                                textDecoration: 'none',
                                color: isActive ? '#EF4444' : 'var(--color-text-secondary)',
                                fontWeight: isActive ? 600 : 500,
                                borderBottom: isActive ? '2px solid #EF4444' : '2px solid transparent',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tab.icon}
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
