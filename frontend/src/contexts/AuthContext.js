import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async ({ username, password }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    // Decode minimal payload from JWT to get role
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    setToken(data.token);
    setUser({ id: payload.userId, role: payload.role, username });
    return { token: data.token, role: payload.role };
  };

  const signup = async ({ username, password, email, fullName, role }) => {
    const mappedRole = roleMap(role);
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, fullName, role: mappedRole })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    signup,
    logout
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function roleMap(role) {
  if (role === 'farmer') return 'exporter';
  if (role === 'qa') return 'qa_agency';
  if (role === 'buyer') return 'importer';
  return role;
}


