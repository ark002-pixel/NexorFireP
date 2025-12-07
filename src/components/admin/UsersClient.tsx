'use client';

import { useState } from 'react';
import { UserPlus, Pencil, Trash2, Search, Shield, User } from 'lucide-react';
import UserForm from './UserForm';
import { deleteUser } from '@/actions/users';
import { useRouter } from 'next/navigation';

interface UsersClientProps {
    users: any[];
}

export default function UsersClient({ users }: UsersClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
            setDeletingId(id);
            await deleteUser(id);
            setDeletingId(null);
            // Revalidation happens automatically via server action
        }
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Gestión de Usuarios</h2>
                <div className="flex gap-4">
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                        <input
                            className="input"
                            placeholder="Buscar usuarios..."
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
                        <UserPlus size={20} />
                        Nuevo Usuario
                    </button>
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Usuario</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Rol</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Fecha Registro</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ padding: '0.75rem' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'COMMANDER' ? 'bg-red-100 text-red-800' :
                                                    'bg-green-100 text-green-800'}`}>
                                            {user.role === 'ADMIN' && <Shield size={12} />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem', color: '#6B7280', fontSize: '0.875rem' }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="p-1 hover:bg-gray-100 rounded text-blue-600 transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                disabled={deletingId === user.id}
                                                className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors disabled:opacity-50"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <UserForm
                    user={selectedUser}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => {
                        router.refresh();
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}
