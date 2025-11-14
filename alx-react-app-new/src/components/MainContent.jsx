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
    <main style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <div>
        <h2>Welcome to My Travel Blog</h2>
        <p>I love to visit New York, Paris, and Tokyo.</p>
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
