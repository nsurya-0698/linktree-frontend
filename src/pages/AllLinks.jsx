import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AllLinks = () => {
  const [links, setLinks] = useState([]);
  const [userName, setUserName] = useState('');
  const [uniqueLink, setUniqueLink] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/'); // Redirect if user is not logged in
      return;
    }

    const fetchUserAndLinks = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUserName(userResponse.data.username);

        const linksResponse = await axios.get(`http://localhost:3000/api/users/${userId}/links`);
        setLinks(linksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserAndLinks();
  }, [userId, navigate]);

  const handleGenerateLink = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/users/${userId}/generateLink`);
      setUniqueLink(`${window.location.origin}/links/${response.data.uniqueLink}`);
    } catch (error) {
      console.error('Error generating unique link:', error);
    }
  };

  return (
    <div>
      <h1>Hi, I am {userName}</h1>
      <h2>All my links are:</h2>
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

      <button onClick={handleGenerateLink}>Generate Unique Link</button>

      {uniqueLink && (
        <div>
          <p>Your unique link:</p>
          <a href={uniqueLink} target="_blank" rel="noopener noreferrer">
            {uniqueLink}
          </a>
        </div>
      )}

      <p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </p>
    </div>
  );
};

export default AllLinks;