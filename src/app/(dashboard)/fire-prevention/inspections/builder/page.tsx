export const dynamic = 'force-dynamic';
'use client';

import { getInspectionTemplates, getFireCodes } from '@/actions/inspections';
import { Plus, FileText, Settings, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import NewTemplateForm from '@/components/fire-prevention/NewTemplateForm';
import NewCodeForm from '@/components/fire-prevention/NewCodeForm';
import Link from 'next/link';

export default function InspectionBuilderPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [codes, setCodes] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'templates' | 'codes'>('templates');
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);

    useEffect(() => {
        getInspectionTemplates().then(setTemplates);
        getFireCodes().then(setCodes);
    }, [showTemplateModal, showCodeModal]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Constructor de Inspecciones</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gestione plantillas y cÃ³digos de inspecciÃ³n</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`btn ${activeTab === 'templates' ? 'btn-primary' : ''}`}
                        style={{ backgroundColor: activeTab === 'templates' ? undefined : '#F3F4F6' }}
                        onClick={() => setActiveTab('templates')}
                    >
                        Plantillas
                    </button>
                    <button
                        className={`btn ${activeTab === 'codes' ? 'btn-primary' : ''}`}
                        style={{ backgroundColor: activeTab === 'codes' ? undefined : '#F3F4F6' }}
                        onClick={() => setActiveTab('codes')}
                    >
                        CÃ³digos
                    </button>
                </div>
            </div>

            {activeTab === 'templates' ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button className="btn btn-primary" onClick={() => setShowTemplateModal(true)}>
                            <Plus size={20} style={{ marginRight: '0.5rem' }} />
                            Nueva Plantilla
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {templates.map((template) => (
                            <div key={template.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', backgroundColor: '#FEF2F2', borderRadius: '8px', color: '#DC2626' }}>
                                        <FileText size={24} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>
                                        {template.type}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{template.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                                    {template.description || 'Sin descripciÃ³n'}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        {template.items?.length || 0} Items
                                    </span>
                                    <Link
                                        href={`/fire-prevention/inspections/builder/${template.id}`}
                                        className="btn"
                                        style={{ backgroundColor: '#F3F4F6', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                    >
                                        <Settings size={16} style={{ marginRight: '0.5rem' }} />
                                        Configurar
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button className="btn btn-primary" onClick={() => setShowCodeModal(true)}>
                            <Plus size={20} style={{ marginRight: '0.5rem' }} />
                            Nuevo CÃ³digo
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {codes.map((code) => (
                            <div key={code.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}>
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{code.code}</h3>
                                        <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>
                                            {code.source}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{code.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showTemplateModal && <NewTemplateForm onClose={() => setShowTemplateModal(false)} />}
            {showCodeModal && <NewCodeForm onClose={() => setShowCodeModal(false)} />}
        </div>
    );
}

