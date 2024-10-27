import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    console.log('Logging in with:', { email, password }); // Log the email and password
  
    try {
        console.log('Logging in with:', { email, password });
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      console.log('Login successful:', response.data); // Log the response data
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
      console.log('Login successful:', response.data); // Log the response data
    } catch (error) {
      console.error('Login error:', error.response); // Log the error response
      setError('Invalid email or password');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      {/* Add a button to navigate to the Sign Up page */}
      <div>
        <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
      </div>
    </div>
  );
};

export default Login;
