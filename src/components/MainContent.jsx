import React from 'react';
import UserProfile from './UserProfile';

const MainContent = () => {
  const users = [
    {
      name: "John Doe",
      age: 28,
      bio: "Travel enthusiast and photography lover. Always exploring new cities and cultures."
    },
    {
      name: "Jane Smith",
      age: 32,
      bio: "Food blogger and urban explorer. Documenting hidden gems in every city I visit."
    },
    {
      name: "Mike Johnson",
      age: 25,
      bio: "Architecture student passionate about city planning and sustainable urban development."
    }
  ];

  return (
    <main 
      style={{ 
        padding: '20px',
        backgroundColor: '#ecf0f1',
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <div 
        style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ 
          color: '#2c3e50', 
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '2rem'
        }}>
          Our Travel Community
        </h2>
        
        {users.map((user, index) => (
          <UserProfile 
            key={index}
            name={user.name}
            age={user.age}
            bio={user.bio}
          />
        ))}
      </div>
    </main>
  );
};

export default MainContent;