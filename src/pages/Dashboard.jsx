import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [message, setMessage] = useState('');
  const [links, setLinks] = useState([]);
  const userId = 3; // Replace with the logged-in user's ID dynamically after login

  // Fetch all links for the user on component mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/links`);
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
    fetchLinks();
  }, [userId]);

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/users/${userId}/links`, {
        link_title: linkTitle,
        link_url: linkUrl
      });
      setMessage('Link added successfully!');
      setLinks([...links, response.data]); // Add the new link to the list
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
        Need to log in again? <Link to="/login">Login</Link>
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

      <h2>Your Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.link_title}:</strong> <a href={link.link_url} target="_blank" rel="noopener noreferrer">{link.link_url}</a>
          </li>
        ))}
      </ul>

      <p> 
        Need to create an account? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
};

export default Dashboard;
