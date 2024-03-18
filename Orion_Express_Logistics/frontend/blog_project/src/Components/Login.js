import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      message.error('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      message.error('Please enter your password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', {
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      console.log(response.data);

      message.success('Login successful!');
      navigate('/getPost');
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="border p-4 rounded">
          <h2 className="mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' value={email} onChange={handleEmailChange} className="form-control" placeholder='Enter Email' />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' value={password} onChange={handlePasswordChange} className="form-control" placeholder='Enter Password' />
          </div>
          <button type="submit" className="btn btn-primary"><strong>Log in</strong></button>
          <p className="mt-2"><input type='checkbox' /> You agree to our terms and policies (optional)</p>
          <p>Don't have an account? <Link to="/signup" className="font-weight-bold">Create Account</Link></p>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login;
