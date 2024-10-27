import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const userId = 3; // Replace with dynamic user ID once logged-in user data is available
      const response = await axios.post(`http://localhost:3000/api/users/${userId}/links`, {
        link_title: linkTitle,
        link_url: linkUrl
      });
      setMessage('Link added successfully!');
      setLinkTitle('');
      setLinkUrl('');
    } catch (error) {
      console.error('Error adding link:', error);
      setMessage('Failed to add link.');
    }
  };
  

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <p>
        Need to log in again? <Link to="/">Login</Link>
      </p>
      
      <div>
        <h3>Add Your Link</h3>
        <form onSubmit={handleAddLink}>
          <div>
            <label>Link Title:</label>
            <input
              type="text"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Link URL:</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Link</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <p> 
        Need to create an account? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
};

export default Dashboard;
