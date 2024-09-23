import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Aos from 'aos';
import 'aos/dist/aos.css'

const Home = () => {
  
  useEffect(()=>{
    Aos.init()
})
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/home', { username, password });
      const { role } = response.data;

      if (role === 'doctor') {
        navigate('/doctor');
      } else if (role === 'patient') {
        navigate('/patient');
      } else if(role === 'technician'){
        navigate('/techmician')
      }
       else {
        setError('Unauthorized role');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='container'>
      <form onSubmit={handleSubmit} data-aos="fade-up"data-aos-duration="1000">
        <h1>Login</h1>
        {error && <div className='error-message'>{error}</div>}
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </div>
        <button className='btn' disabled={loading} type='submit'>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </button>
        <a href='/signup'>Click to sign up</a>
      </form>
    </div>
    </>
  );
};

export default Home;

