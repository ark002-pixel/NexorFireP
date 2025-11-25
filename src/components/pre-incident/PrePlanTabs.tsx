'use client';

import { useState } from 'react';

export default function PrePlanTabs({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'hazmat', label: 'Materiales Peligrosos' },
        { id: 'contacts', label: 'Contactos' },
        { id: 'attachments', label: 'Adjuntos' },
        { id: 'map', label: 'Mapa y Anotaciones' },
    ];

    return (
        <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    style={{
                        padding: '0.75rem 1rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
                        color: activeTab === tab.id ? '#3B82F6' : 'var(--color-text-secondary)',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
