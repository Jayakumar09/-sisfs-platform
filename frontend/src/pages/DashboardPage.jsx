import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const response = await api.get('/leads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(response.data);
      } catch {
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [token]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((lead) => (lead.status || '').toUpperCase() === 'NEW').length;
    const qualified = leads.filter((lead) => (lead.status || '').toUpperCase() === 'QUALIFIED').length;
    return { total, newLeads, qualified };
  }, [leads]);

  return (
    <section className="page-section">
      <div className="card hero-card">
        <h2>Dashboard</h2>
        <p className="muted">Simple starter dashboard connected to your SISFS backend.</p>
        <div className="badge-row">
          <span className="badge">User: {user?.name || '-'}</span>
          <span className="badge">Role: {user?.role || '-'}</span>
        </div>
      </div>

      <div className="stats-grid">
        <article className="card stat-card">
          <span className="muted">Total Leads</span>
          <strong>{loading ? '...' : stats.total}</strong>
        </article>
        <article className="card stat-card">
          <span className="muted">New Leads</span>
          <strong>{loading ? '...' : stats.newLeads}</strong>
        </article>
        <article className="card stat-card">
          <span className="muted">Qualified Leads</span>
          <strong>{loading ? '...' : stats.qualified}</strong>
        </article>
      </div>
    </section>
  );
}
