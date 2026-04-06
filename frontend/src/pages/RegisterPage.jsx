import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/register', form);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Register"
      subtitle="Create SISFS account"
      footer={<span>Already registered? <Link to="/login">Login here</Link></span>}
    >
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter name" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        </label>
        {error ? <div className="alert error">{error}</div> : null}
        <button className="btn" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
      </form>
    </AuthCard>
  );
}
