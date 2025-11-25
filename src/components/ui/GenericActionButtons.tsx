'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

interface GenericActionButtonsProps {
    id: string;
    onEdit?: () => void;
    onDelete: (id: string) => Promise<void>;
    deleteConfirmMessage?: string;
    customActions?: {
        label: string;
        icon: React.ReactNode;
        onClick: () => void;
        color?: string;
    }[];
}

export default function GenericActionButtons({
    id,
    onEdit,
    onDelete,
    deleteConfirmMessage = '¿Está seguro de que desea eliminar este elemento?',
    customActions = []
}: GenericActionButtonsProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm(deleteConfirmMessage)) {
            setIsDeleting(true);
            try {
                await onDelete(id);
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Error al eliminar el elemento.');
            }
            setIsDeleting(false);
            setShowMenu(false);
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
                        {onEdit && (
                            <button
                                onClick={() => {
                                    onEdit();
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
                        )}

                        {customActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    action.onClick();
                                    setShowMenu(false);
                                }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    width: '100%', padding: '0.75rem 1rem',
                                    border: 'none', background: 'none', cursor: 'pointer',
                                    textAlign: 'left', fontSize: '0.875rem',
                                    color: action.color || '#374151'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {action.icon} {action.label}
                            </button>
                        ))}

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
        </div>
    );
}
