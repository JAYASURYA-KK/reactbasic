import React, { useState } from 'react';
import './Signup.css';
import { useNavigate,Link } from 'react-router-dom';
import Image from "./assets/hi.png";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    gender: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    const { name, email, password, gender } = formData;

    // Frontend validation
    if (!name || !email || !password || !gender) {
      setMessage('All fields are required!');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Invalid email format!');
      return;
    }

    try {
      const res = await fetch('https://localhost:3002/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Signup failed!');
        return;
      }

      setMessage('Signup successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="signup-page">
    <div className="signup-left-image">
            <img src={Image}  alt="signup Left"/>
          </div>
    
    <div className="signup-container">
      <h2 style={{color:'green'}}>Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        onChange={handleChange}
      />
      <button onClick={handleSignup}>Signup</button>
      <p style={{ color: 'white' }}>{message}</p>
      <p style={{ color: 'white' }}>Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Login here</Link></p>

    </div>
     <div className="signup-right-image">
            <img src={Image} alt="signup Right" />
          </div>
        </div>
  );
};

export default Signup;
