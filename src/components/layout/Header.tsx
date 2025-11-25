'use client';

import styles from './layout.module.css';
import { Bell, User } from 'lucide-react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                {/* Breadcrumbs or Page Title could go here */}
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Bienvenido, Bombero</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn">
                    <Bell size={20} color="var(--color-text-secondary)" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary-dark)'
                    }}>
                        <User size={18} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin User</span>
                </div>
            </div>
        </header>
    );
}
