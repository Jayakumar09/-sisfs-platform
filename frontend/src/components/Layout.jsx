import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">SISFS</div>
          <p className="muted small">Solar Financing Platform</p>
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/leads" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Leads
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar card">
          <div>
            <h1 className="page-title">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
            <p className="muted">Role: {user?.role || 'CLIENT'}</p>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
