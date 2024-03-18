import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd'; 
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      message.error('Please enter your name.');
      return;
    }

    if (!email.trim()) {
      message.error('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      message.error('Please enter your password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/user', {
        name,
        email,
        password
      });

      console.log(response.data); 

      message.success('Signup successful!please login'); 
      setError('');
    } catch (error) {
      console.error('Error signing up:', error);
      message.error('Signup failed. Please try again.'); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded">
            <h2 className="mb-4">Signup</h2>
            <div className="form-group">
              <label htmlFor='name'><strong>Name</strong></label>
              <input type='text' value={name} onChange={handleNameChange} className="form-control" placeholder='Enter Name' />
            </div>
            <div className="form-group">
              <label htmlFor='email'><strong>Email</strong></label>
              <input type='email' value={email} onChange={handleEmailChange} className="form-control" placeholder='Enter Email' />
            </div>
            <div className="form-group">
              <label htmlFor='password'><strong>Password</strong></label>
              <input type='password' value={password} onChange={handlePasswordChange} className="form-control" placeholder='Enter Password' />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary"><strong>Sign up</strong></button>
            <p><input type='checkbox' /> You agree to our terms and policies (optional)</p>
            <p>Already have an account? <Link to="/" className="font-weight-bold">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
