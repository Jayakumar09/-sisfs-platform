import { useState, useEffect } from 'react';
import { getLeads, createLead, updateLead, deleteLead } from '../services/lead.service';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    notes: ''
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await updateLead(editingLead.id, formData);
      } else {
        await createLead(formData);
      }
      setShowModal(false);
      setEditingLead(null);
      setFormData({ name: '', phone: '', email: '', city: '', notes: '' });
      fetchLeads();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name || '',
      phone: lead.phone || '',
      email: lead.email || '',
      city: lead.city || '',
      notes: lead.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        fetchLeads();
      } catch (err) {
        alert(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setFormData({ name: '', phone: '', email: '', city: '', notes: '' });
    setShowModal(true);
  };

  return (
    <div className="page-section">
      <div className="table-header">
        <h1 className="page-title">Leads</h1>
        <button onClick={openCreateModal} className="btn">
          + Add Lead
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <div className="page-center">Loading...</div>
      ) : leads.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <svg style={{ width: '48px', height: '48px', color: '#94a3b8', margin: '0 auto 16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium">No leads yet</h3>
          <p className="muted">Create your first lead to get started</p>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 500 }}>{lead.name}</td>
                    <td>{lead.phone || '-'}</td>
                    <td>{lead.email || '-'}</td>
                    <td>{lead.city || '-'}</td>
                    <td className="muted">{lead.notes || '-'}</td>
                    <td>
                      <div className="button-row">
                        <button onClick={() => handleEdit(lead)} className="btn btn-small" style={{ background: '#3b82f6', color: 'white' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(lead.id)} className="btn btn-small btn-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px', zIndex: 50
        }}>
          <div className="card" style={{ width: 'min(100%, 480px)' }}>
            <h2 className="text-lg font-semibold" style={{ marginBottom: '16px' }}>
              {editingLead ? 'Edit Lead' : 'Create Lead'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Name *
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  Phone *
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                  City
                  <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </label>
                <label className="full-width">
                  Notes
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
                </label>
              </div>
              <div className="button-row" style={{ marginTop: '16px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn">
                  {editingLead ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
