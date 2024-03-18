import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CreatePostPage from './Components/CreatePostPage';
import GetPost from './Components/GetPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/getPost' element={<GetPost />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
