import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('devprep_access_token') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('devprep_refresh_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user details on mount if token is present
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('devprep_access_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('Session expired or invalid, attempting token refresh...');
          const storedRefreshToken = localStorage.getItem('devprep_refresh_token');
          if (storedRefreshToken) {
            try {
              const refreshRes = await api.post('/auth/refresh', { refreshToken: storedRefreshToken });
              if (refreshRes.data.success) {
                const newToken = refreshRes.data.accessToken;
                localStorage.setItem('devprep_access_token', newToken);
                setToken(newToken);
                const meRes = await api.get('/auth/me', {
                  headers: { Authorization: `Bearer ${newToken}` },
                });
                if (meRes.data.success) {
                  setUser(meRes.data.user);
                }
              }
            } catch (refreshErr) {
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (name, email, password) => {
    setError(null);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      if (res.data.success) {
        const { accessToken, refreshToken: newRefreshToken, user: userData } = res.data;
        localStorage.setItem('devprep_access_token', accessToken);
        localStorage.setItem('devprep_refresh_token', newRefreshToken);
        setToken(accessToken);
        setRefreshToken(newRefreshToken);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create account';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { accessToken, refreshToken: newRefreshToken, user: userData } = res.data;
        localStorage.setItem('devprep_access_token', accessToken);
        localStorage.setItem('devprep_refresh_token', newRefreshToken);
        setToken(accessToken);
        setRefreshToken(newRefreshToken);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('devprep_access_token');
    localStorage.removeItem('devprep_refresh_token');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        refreshProfile,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
