import React from 'react';

const Footer = () => {
  return (
    <footer 
      style={{ 
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '15px',
        borderTop: '3px solid #ff6b35',
        marginTop: 'auto'
      }}
    >
      <p style={{ margin: 0, fontSize: '1rem' }}>
        &copy; 2024 My Favorite Cities App. All rights reserved.
      </p>
      <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#bdc3c7' }}>
        Explore the world, one city at a time!
      </p>
    </footer>
  );
};

export default Footer;
