import React from 'react';

const Header = () => {
  return (
    <header 
      style={{ 
        backgroundColor: 'navy', 
        color: 'white', 
        textAlign: 'center',
        padding: '20px',
        borderBottom: '3px solid #ff6b35'
      }}
    >
      <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
        My Favorite Cities
      </h1>
    </header>
  );
};

export default Header;