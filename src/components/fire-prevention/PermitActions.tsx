'use client';

import { deletePermit, revokePermit } from '@/actions/fire-prevention';
import { Trash2, Ban, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function PermitActions({ id, status }: { id: string, status: string }) {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (confirm('¿Está seguro de que desea eliminar este permiso? Esto también eliminará la factura asociada.')) {
            setIsLoading(true);
            await deletePermit(id);
            setIsLoading(false);
        }
    };

    const handleRevoke = async () => {
        if (confirm('¿Está seguro de que desea revocar este permiso?')) {
            setIsLoading(true);
            await revokePermit(id);
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
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
                        {status !== 'Revoked' && (
                            <button
                                onClick={handleRevoke}
                                disabled={isLoading}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    width: '100%', padding: '0.75rem 1rem',
                                    border: 'none', background: 'none', cursor: 'pointer',
                                    textAlign: 'left', fontSize: '0.875rem',
                                    color: '#D97706'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFFBEB'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <Ban size={16} /> Revocar
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
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
                            <Trash2 size={16} /> Eliminar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
