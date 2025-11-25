export const dynamic = 'force-dynamic';
import { UserSquare2, Search } from 'lucide-react';

export default function ProfilesPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Hoja de Vida y Certificaciones</h2>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="input" placeholder="Buscar personal..." style={{ paddingLeft: '2.5rem' }} />
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Nombre</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Rango</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Estado</th>
                            <th style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Juan PÃ©rez', rank: 'Sargento', status: 'Activo' },
                            { name: 'Maria Rodriguez', rank: 'Cabo', status: 'Activo' },
                            { name: 'Carlos Gomez', rank: 'Bombero', status: 'Vacaciones' },
                        ].map((person, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                <td style={{ padding: '0.75rem', fontWeight: 500 }}>{person.name}</td>
                                <td style={{ padding: '0.75rem' }}>{person.rank}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        backgroundColor: person.status === 'Activo' ? '#D1FAE5' : '#FEF3C7',
                                        color: person.status === 'Activo' ? '#065F46' : '#92400E'
                                    }}>
                                        {person.status}
                                    </span>
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                    <button style={{ color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Ver Perfil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

