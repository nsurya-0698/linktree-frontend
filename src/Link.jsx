import React from 'react';

function Link({ linkTitle, linkUrl }) {
  return (
    <li>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        {linkTitle}
      </a>
    </li>
  );
}

export default Link;
