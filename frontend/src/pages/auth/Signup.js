import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, roleMap } from '../../contexts/AuthContext';
import './auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'farmer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      // auto-login after signup
      await login({ username: form.username, password: form.password });
      const mapped = roleMap(form.role);
      navigate(mapped === 'exporter' ? '/farmer' : mapped === 'qa_agency' ? '/qa' : '/buyer', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Sign up to continue</p>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={form.username} onChange={onChange} required placeholder="Choose a username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={form.password} onChange={onChange} required placeholder="Create a password" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">Sign up as</label>
            <select id="role" name="role" value={form.role} onChange={onChange}>
              <option value="farmer">Farmer</option>
              <option value="qa">QA Agency</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span> <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}


