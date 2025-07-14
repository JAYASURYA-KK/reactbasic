import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
<header>
  <div className="header-container">
    <h1 className="text">Glass Bridge Game</h1>
    <div className="auth-buttons">
      <button className="auth-btn" ><Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link></button>
      <button className="auth-btn"><Link to="signup" style={{ textDecoration: 'none', color: 'blue' }}>Signup</Link></button>
    </div>
  </div>
</header>


  )
}

export default Header
