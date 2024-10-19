import React from 'react';

function User({ username, email, bio, links }) {
  return (
    <div>
      <h3>{username}</h3>
      <p>{email}</p>
      <p>{bio}</p>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.link_url} target="_blank" rel="noopener noreferrer">
              {link.link_title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
