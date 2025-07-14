import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import Image from "./assets/hi.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const istrue=false;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      // Changed to GET request to fetch users and verify credentials
      const res = await fetch('http://localhost:3002/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const users = await res.json();

      if (res.ok) {
        // Check if user exists with matching email and password
        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        
        if (user) {
          setMessage('Login successful!');
          
          // Optionally store user data in localStorage or context
          localStorage.setItem('currentUser', JSON.stringify(user));
          setTimeout(() => navigate('/',{state:{message:true}}), 1000);
        } else {
          setMessage('Invalid email or password');
        }
      } else {
        setMessage('Unable to fetch user data');
      }
    } catch (error) {
      setMessage('Server error!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left-image">
        <img src={Image}  alt="Login Left" />
      </div>
      
      <div className="login-container">
        <h2 style={{color:'green'}}>Login</h2>
        <input 
          name="email" 
          placeholder="Email" 
          value={loginData.email}
          onChange={handleChange} 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={loginData.password}
          onChange={handleChange} 
        />
        <button onClick={handleLogin}>Login</button>
        <p style={{ color: 'white' }}>{message}</p>
        <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
      </div>
      
      <div className="login-right-image">
        <img src={Image} alt="Login Right" />
      </div>
    </div>
  );
};

export default Login;