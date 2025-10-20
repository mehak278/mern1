import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = require('react-router-dom').useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // call backend API
    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: age ? Number(age) : undefined, email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signup failed');
        // auto-login: store user and navigate
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        navigate('/landing');
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
  <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Create account</button>
      </form>
      <div style={{ marginTop: 12 }}>
        <span>Already have an account? </span>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
