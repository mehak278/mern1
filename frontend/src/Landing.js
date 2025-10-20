import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="landing-container">
      <h1>Welcome{user ? `, ${user.name}` : ''}!</h1>
      <p>This is the landing page after login or signup.</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Landing;
