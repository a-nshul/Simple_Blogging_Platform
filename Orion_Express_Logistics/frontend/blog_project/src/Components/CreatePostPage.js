import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let isValid = true;
    setTitleError('');
    setContentError('');

    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    }

    if (content.trim() === '') {
      setContentError('Content is required');
      isValid = false;
    }

    if (isValid) {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.post('http://localhost:3001/api/blog', {
          title,
          content
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        console.log('Post created:', response.data);
        message.success('Post created successfully'); 
        navigate('/getPost'); 
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Post</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className={`form-control ${titleError && 'is-invalid'}`} 
            id="title" 
            placeholder="Enter title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          {titleError && <div className="invalid-feedback">{titleError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea 
            className={`form-control ${contentError && 'is-invalid'}`} 
            id="content" 
            rows="6" 
            placeholder="Enter content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          ></textarea>
          {contentError && <div className="invalid-feedback">{contentError}</div>}
        </div>
        <button type="button" className="btn btn-primary mr-2" onClick={handleSubmit}>Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
