import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicLinks = () => {
  const { uniqueLink } = useParams();
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/links/${uniqueLink}`);
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching public links:', error);
        setError('Failed to load links.');
      }
    };

    fetchLinks();
  }, [uniqueLink]);

  return (
    <div>
      <h1>Public Links</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
    </div>
  );
};

export default PublicLinks;