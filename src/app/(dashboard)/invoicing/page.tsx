import { getInvoices } from '@/actions/invoicing';
import { FileText, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default async function InvoicingPage() {
    const invoices = await getInvoices();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Facturación</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gestión de Facturas y Pagos</p>
                </div>
            </div>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Número</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Concepto</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Fecha</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Vencimiento</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Total</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                        No hay facturas registradas.
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((invoice) => (
                                    <tr key={invoice.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{invoice.number}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {invoice.permit ? `Permiso: ${invoice.permit.permitType?.name}` :
                                                invoice.inspection ? `Inspección: ${invoice.inspection.building.name}` : 'Otro'}
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{new Date(invoice.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>${invoice.total.toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px',
                                                backgroundColor: invoice.status === 'Paid' ? '#D1FAE5' : invoice.status === 'Overdue' ? '#FEE2E2' : '#F3F4F6',
                                                color: invoice.status === 'Paid' ? '#065F46' : invoice.status === 'Overdue' ? '#991B1B' : '#374151'
                                            }}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
