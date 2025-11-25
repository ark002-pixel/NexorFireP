import PublicRequestForm from '@/components/public/PublicRequestForm';

export default function PublicRequestsPage() {
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Trámites en Línea</h2>
                <p style={{ fontSize: '1.125rem', color: '#4B5563', maxWidth: '600px', margin: '0 auto' }}>
                    Realiza tus solicitudes de inspección, certificados y otros servicios de manera rápida y digital.
                </p>
            </div>
            <PublicRequestForm />
        </div>
    );
}
