import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './auth.css';

function roleToPath(role) {
  if (role === 'exporter' || role === 'farmer') return '/farmer';
  if (role === 'qa_agency' || role === 'qa') return '/qa';
  if (role === 'importer' || role === 'buyer') return '/buyer';
  return '/';
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { role } = await login(form);
      navigate(roleToPath(role), { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Access your portal</p>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" value={form.username} onChange={onChange} required placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" value={form.password} onChange={onChange} required placeholder="Enter your password" />
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="auth-footer">
          <span>Don’t have an account?</span> <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}


