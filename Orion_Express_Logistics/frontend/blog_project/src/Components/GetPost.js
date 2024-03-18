import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GetPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          setError('Authentication token not found.');
          return;
        }
        const response = await axios.get('http://localhost:3001/api/blog', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        setPosts(response.data.blogs);
        setFilteredPosts(response.data.blogs);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreatePost = () => {
    navigate('/create');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="container py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mr-2"
        />
        <button onClick={handleCreatePost} className="btn btn-primary">Create Post</button>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <h1>Blog Posts</h1>
      {error && <p>Error: {error}</p>}
      {filteredPosts.map((post) => (
        <div key={post._id} className="border rounded p-4 mb-4">
          <h3 className="mb-3"><strong>Title:</strong> {post.title}</h3>
          <p><strong>Content:</strong> {post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default GetPost;
