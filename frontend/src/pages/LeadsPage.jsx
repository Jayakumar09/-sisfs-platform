import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/format';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  source: '',
  notes: '',
  status: 'NEW',
};

export default function LeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const authHeader = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/leads', { headers: authHeader });
      setLeads(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId('');
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      city: form.city || null,
      source: form.source || null,
      notes: form.notes || null,
      status: form.status || 'NEW',
    };

    try {
      if (editingId) {
        await api.put(`/leads/${editingId}`, payload, { headers: authHeader });
        setMessage('Lead updated successfully');
      } else {
        await api.post('/leads', payload, { headers: authHeader });
        setMessage('Lead created successfully');
      }
      resetForm();
      await loadLeads();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setForm({
      name: lead.name || '',
      phone: lead.phone || '',
      email: lead.email || '',
      city: lead.city || '',
      source: lead.source || '',
      notes: lead.notes || '',
      status: lead.status || 'NEW',
    });
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this lead?');
    if (!confirmed) return;
    try {
      await api.delete(`/leads/${id}`, { headers: authHeader });
      setMessage('Lead deleted successfully');
      await loadLeads();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete lead');
    }
  };

  return (
    <section className="page-section">
      <div className="grid-two">
        <div className="card">
          <h2>{editingId ? 'Edit Lead' : 'Create Lead'}</h2>
          <p className="muted">Add and manage customer enquiries for SISFS.</p>

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              <span>City</span>
              <input name="city" value={form.city} onChange={handleChange} />
            </label>
            <label>
              <span>Source</span>
              <input name="source" value={form.source} onChange={handleChange} placeholder="Website / Call / Referral" />
            </label>
            <label>
              <span>Status</span>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="NEW">NEW</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="LOST">LOST</option>
              </select>
            </label>
            <label className="full-width">
              <span>Notes</span>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" />
            </label>

            {message ? <div className="alert success full-width">{message}</div> : null}
            {error ? <div className="alert error full-width">{error}</div> : null}

            <div className="button-row full-width">
              <button className="btn" disabled={submitting}>{submitting ? 'Saving...' : editingId ? 'Update Lead' : 'Create Lead'}</button>
              {editingId ? <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button> : null}
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Lead Summary</h2>
          <p className="muted">Quick overview of your pipeline.</p>
          <div className="stats-grid compact">
            <article className="stat-box"><span>Total</span><strong>{leads.length}</strong></article>
            <article className="stat-box"><span>New</span><strong>{leads.filter((l) => (l.status || '').toUpperCase() === 'NEW').length}</strong></article>
            <article className="stat-box"><span>Qualified</span><strong>{leads.filter((l) => (l.status || '').toUpperCase() === 'QUALIFIED').length}</strong></article>
            <article className="stat-box"><span>Contacted</span><strong>{leads.filter((l) => (l.status || '').toUpperCase() === 'CONTACTED').length}</strong></article>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-header">
          <div>
            <h2>Leads List</h2>
            <p className="muted">All lead records from backend.</p>
          </div>
          <button className="btn btn-secondary" onClick={loadLeads}>Refresh</button>
        </div>

        {loading ? (
          <div className="muted">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="muted">No leads found.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Source</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.name}</strong>
                      <div className="tiny muted">{lead.email || '-'}</div>
                    </td>
                    <td>{lead.phone}</td>
                    <td>{lead.city || '-'}</td>
                    <td><span className="status-pill">{lead.status || 'NEW'}</span></td>
                    <td>{lead.source || '-'}</td>
                    <td>{formatDate(lead.createdAt)}</td>
                    <td>
                      <div className="button-row">
                        <button className="btn btn-small btn-secondary" onClick={() => handleEdit(lead)}>Edit</button>
                        <button className="btn btn-small btn-danger" onClick={() => handleDelete(lead.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
