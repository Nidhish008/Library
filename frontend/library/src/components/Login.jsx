import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { role } = data;

      if (role === 'admin') {
        window.location.href = '/admin-home';
      } else if (role === 'user') {
        window.location.href = '/user-home';
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='login' style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className='login-container'>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
