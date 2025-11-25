'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Camera, Save } from 'lucide-react';

export default function MobileChecklist({ inspectionId }: { inspectionId: string }) {
    const [items, setItems] = useState([
        { id: 1, question: '¿Extintores vigentes y señalizados?', status: null as 'pass' | 'fail' | null },
        { id: 2, question: '¿Rutas de evacuación despejadas?', status: null as 'pass' | 'fail' | null },
        { id: 3, question: '¿Iluminación de emergencia funcional?', status: null as 'pass' | 'fail' | null },
        { id: 4, question: '¿Sistema de alarma operativo?', status: null as 'pass' | 'fail' | null },
        { id: 5, question: '¿Gabinetes contra incendio completos?', status: null as 'pass' | 'fail' | null },
    ]);

    const handleStatusChange = (id: number, status: 'pass' | 'fail') => {
        setItems(items.map(item => item.id === id ? { ...item, status } : item));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => (
                <div key={item.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontWeight: 500, marginBottom: '1rem' }}>{item.question}</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => handleStatusChange(item.id, 'pass')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: item.status === 'pass' ? '2px solid #10B981' : '1px solid #E5E7EB',
                                backgroundColor: item.status === 'pass' ? '#ECFDF5' : 'white',
                                color: item.status === 'pass' ? '#047857' : '#6B7280',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                fontWeight: 600
                            }}
                        >
                            <CheckCircle size={20} />
                            CUMPLE
                        </button>
                        <button
                            onClick={() => handleStatusChange(item.id, 'fail')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: item.status === 'fail' ? '2px solid #EF4444' : '1px solid #E5E7EB',
                                backgroundColor: item.status === 'fail' ? '#FEF2F2' : 'white',
                                color: item.status === 'fail' ? '#B91C1C' : '#6B7280',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                fontWeight: 600
                            }}
                        >
                            <XCircle size={20} />
                            NO CUMPLE
                        </button>
                    </div>
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #E5E7EB' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6B7280', background: 'none', border: 'none' }}>
                            <Camera size={16} />
                            Agregar Evidencia Fotográfica
                        </button>
                    </div>
                </div>
            ))}

            <button className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', marginTop: '1rem', justifyContent: 'center' }}>
                <Save size={20} style={{ marginRight: '0.5rem' }} />
                Finalizar Inspección
            </button>
        </div>
    );
}
