'use client';

import { useState } from 'react';
import { ClipboardList, Send, Clock } from 'lucide-react';

export default function PMULog({ incidentId }: { incidentId: string }) {
    const [logs, setLogs] = useState([
        { id: 1, time: '10:00 AM', message: 'Puesto de Mando Unificado establecido.', author: 'Cmdt. Rios' },
        { id: 2, time: '10:05 AM', message: 'Solicitud de apoyo aéreo enviada.', author: 'Ops. Jefe' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const addLog = () => {
        if (!newMessage.trim()) return;
        const newLog = {
            id: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: newMessage,
            author: 'Despacho' // Mock author
        };
        setLogs([newLog, ...logs]);
        setNewMessage('');
    };

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardList size={20} />
                Bitácora del PMU
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {logs.map((log) => (
                    <div key={log.id} style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', borderLeft: '3px solid #3B82F6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6B7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={12} /> {log.time}
                            </span>
                            <span style={{ fontWeight: 600 }}>{log.author}</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', margin: 0 }}>{log.message}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    className="input"
                    placeholder="Registrar novedad..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addLog()}
                />
                <button className="btn btn-primary" onClick={addLog}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
