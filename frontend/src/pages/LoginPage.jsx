import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { phone, password });
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Login"
      subtitle="Sign in to access dashboard and leads"
      footer={<span>New user? <Link to="/register">Register here</Link></span>}
    >
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          <span>Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </label>
        {error ? <div className="alert error">{error}</div> : null}
        <button className="btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </AuthCard>
  );
}
