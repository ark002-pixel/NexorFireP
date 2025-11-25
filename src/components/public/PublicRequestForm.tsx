'use client';

import { useState } from 'react';
import { submitPublicRequest } from '@/actions/public-requests';
import { Send, CheckCircle } from 'lucide-react';

export default function PublicRequestForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        await submitPublicRequest(formData);
        setLoading(false);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>¡Solicitud Enviada!</h2>
                <p style={{ color: '#4B5563', marginBottom: '2rem' }}>
                    Hemos recibido tu solicitud correctamente. Un funcionario se pondrá en contacto contigo al correo electrónico proporcionado.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                >
                    Nueva Solicitud
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
                Solicitud de Servicios
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            Nombre del Establecimiento / Razón Social
                        </label>
                        <input name="businessName" required className="input" placeholder="Ej. Restaurante La Fogata" />
                    </div>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            NIT / Cédula
                        </label>
                        <input name="nit" required className="input" placeholder="Ej. 900.123.456-7" />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                        Dirección Completa
                    </label>
                    <input name="address" required className="input" placeholder="Ej. Carrera 50 # 50-50, Itagüí" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            Persona de Contacto
                        </label>
                        <input name="contactName" required className="input" placeholder="Nombre completo" />
                    </div>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            Tipo de Solicitud
                        </label>
                        <select name="requestType" className="input">
                            <option value="Inspection">Inspección de Seguridad (Certificado)</option>
                            <option value="Event">Cobertura de Evento</option>
                            <option value="Training">Capacitación / Simulacro</option>
                            <option value="Complaint">Queja o Reclamo</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            Correo Electrónico
                        </label>
                        <input name="email" type="email" required className="input" placeholder="contacto@empresa.com" />
                    </div>
                    <div>
                        <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', marginBottom: '0.5rem' }}>
                            Teléfono / Celular
                        </label>
                        <input name="phone" type="tel" required className="input" placeholder="Ej. 300 123 4567" />
                    </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        {loading ? 'Enviando...' : (
                            <>
                                <Send size={18} style={{ marginRight: '0.5rem' }} />
                                Enviar Solicitud
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
