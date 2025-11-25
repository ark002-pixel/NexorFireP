export const dynamic = 'force-dynamic';
import { getDashboardStats, getRecentActivity } from '@/actions/dashboard';
import { Activity, Users, AlertTriangle, CheckCircle, FileText, ClipboardCheck, Flame } from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Panel de Control</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#DC2626' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Incidentes Activos</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.activeIncidents}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#2563EB' }}>
            <Users size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Personal en Turno</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.personnelOnShift}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#D1FAE5', color: '#059669' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Inspecciones Hoy</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.inspectionsToday}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#4B5563' }}>
            <Activity size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Unidades Disponibles</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.availableUnits}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Actividad Reciente</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentActivity.length === 0 ? (
            <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '1rem' }}>No hay actividad reciente.</p>
          ) : (
            recentActivity.map((item) => (
              <div key={`${item.type}-${item.id}`} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: item.type === 'Incident' ? '#FEE2E2' : item.type === 'Inspection' ? '#DBEAFE' : '#D1FAE5',
                  color: item.type === 'Incident' ? '#DC2626' : item.type === 'Inspection' ? '#1E40AF' : '#065F46'
                }}>
                  {item.type === 'Incident' && <Flame size={16} />}
                  {item.type === 'Inspection' && <ClipboardCheck size={16} />}
                  {item.type === 'Permit' && <FileText size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500 }}>{item.title}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {new Date(item.date).toLocaleDateString()} â€¢ {item.details}
                  </p>
                </div>
                <Link href={
                  item.type === 'Incident' ? '/neris' :
                    item.type === 'Inspection' ? '/fire-prevention' :
                      '/fire-prevention'
                } style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
                  Ver
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

