'use client';

import { getInspectionTemplate, getFireCodes } from '@/actions/inspections';
import { Plus, ArrowLeft, Trash2, GripVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NewItemForm from '@/components/fire-prevention/NewItemForm';

export default function TemplateDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [template, setTemplate] = useState<any>(null);
    const [codes, setCodes] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (id) {
            getInspectionTemplate(id).then(setTemplate);
            getFireCodes().then(setCodes);
        }
    }, [id, showModal]);

    if (!template) return <div>Cargando...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/fire-prevention/inspections/builder" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', marginBottom: '1rem', textDecoration: 'none' }}>
                    <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                    Volver a Plantillas
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{template.name}</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{template.description}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <Plus size={20} style={{ marginRight: '0.5rem' }} />
                        Agregar Item
                    </button>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Items de Inspección</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {template.items.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem 0' }}>Esta plantilla no tiene items aún.</p>
                    ) : (
                        template.items.map((item: any) => (
                            <div key={item.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff' }}>
                                <GripVertical size={20} style={{ color: 'var(--color-text-secondary)', cursor: 'grab' }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500 }}>{item.question}</p>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>
                                            {item.type}
                                        </span>
                                        {item.responseType && (
                                            <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '4px' }}>
                                                {item.responseType}
                                            </span>
                                        )}
                                        {item.mandatory && (
                                            <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '4px' }}>
                                                Obligatorio
                                            </span>
                                        )}
                                        {item.associatedCodes?.map((link: any) => (
                                            <span key={link.fireCode.id} style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: '4px' }}>
                                                {link.fireCode.code}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn" style={{ padding: '0.5rem', color: '#EF4444' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showModal && <NewItemForm templateId={template.id} codes={codes} onClose={() => setShowModal(false)} />}
        </div>
    );
}
