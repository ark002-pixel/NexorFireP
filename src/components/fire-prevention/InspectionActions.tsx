'use client';

import { deleteInspection } from '../../actions/delete-inspection';
import { Trash2, Edit, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import EditInspectionForm from './EditInspectionForm';

export default function InspectionActions({ inspection }: { inspection: any }) {
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        console.log('Delete button clicked for id:', inspection.id);
        if (confirm('¿Está seguro de que desea eliminar esta inspección?')) {
            console.log('Confirmed deletion');
            setIsDeleting(true);
            setError(null);
            try {
                const response = await fetch(`/api/inspections/${inspection.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Error al eliminar');
                }

                console.log('Delete successful');
                // Force refresh
                window.location.reload();
            } catch (err) {
                console.error('Error calling delete API:', err);
                setError('Error de red o servidor');
            }
            setIsDeleting(false);
        } else {
            console.log('Deletion cancelled');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {error && (
                <div style={{
                    position: 'absolute', bottom: '100%', right: 0,
                    backgroundColor: '#FEE2E2', color: '#DC2626',
                    padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem',
                    whiteSpace: 'nowrap', marginBottom: '0.25rem', zIndex: 30
                }}>
                    {error}
                </div>
            )}
            <button
                onClick={() => setShowMenu(!showMenu)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
            >
                <MoreVertical size={20} className="text-gray-500" />
            </button>

            {showMenu && (
                <>
                    <div
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
                        onClick={() => setShowMenu(false)}
                    />
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        backgroundColor: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        zIndex: 20,
                        minWidth: '150px',
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => {
                                setShowEditModal(true);
                                setShowMenu(false);
                            }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                width: '100%', padding: '0.75rem 1rem',
                                border: 'none', background: 'none', cursor: 'pointer',
                                textAlign: 'left', fontSize: '0.875rem',
                                color: '#374151'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Edit size={16} /> Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                width: '100%', padding: '0.75rem 1rem',
                                border: 'none', background: 'none', cursor: 'pointer',
                                textAlign: 'left', fontSize: '0.875rem',
                                color: '#DC2626'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Trash2 size={16} /> {isDeleting ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </>
            )}

            {showEditModal && (
                <EditInspectionForm inspection={inspection} onClose={() => setShowEditModal(false)} />
            )}
        </div>
    );
}
