import { useState, useEffect } from 'react';
import { isAuthenticated, logout as authLogout, getMe } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    authLogout();
    setUser(null);
    navigate('/login');
  };

  return { user, loading, isAuthenticated: !!user, logout: handleLogout };
};
