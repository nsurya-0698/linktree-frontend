import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [message, setMessage] = useState('');
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // console.log('Retrieved UserID:', userId); // Debug log

    if (!userId) {
      navigate('/'); // Redirect to login if userId is not found
      return;
    }

    const fetchLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/links`);
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, [navigate]);

  const handleAddLink = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      navigate('/'); // Safety check
      return;
    }

    try {
      const userId = 3; // Replace with dynamic user ID once logged-in user data is available
      const response = await axios.post(`http://localhost:3000/api/users/${userId}/links`, {
        link_title: linkTitle,
        link_url: linkUrl,
      });
      setMessage('Link added successfully!');
      setLinks([...links, response.data]);
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

      <h2>Your Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.link_title}:</strong>{' '}
            <a href={link.link_url} target="_blank" rel="noopener noreferrer">
              {link.link_url}
            </a>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/all-links')}>View All Links</button>

      <p>
        Need to create an account? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
};

export default Dashboard;
