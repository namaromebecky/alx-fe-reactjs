import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1976d2', marginBottom: '1rem' }}>About This Project</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#333' }}>Advanced React Router Features Demonstrated</h2>
        <ul style={{ lineHeight: '1.8', color: '#555' }}>
          <li><strong>Nested Routes:</strong> Profile page contains nested routes for ProfileDetails and ProfileSettings</li>
          <li><strong>Dynamic Routing:</strong> Blog posts use dynamic URLs with parameters (/:postId)</li>
          <li><strong>Protected Routes:</strong> Dashboard and Profile require authentication</li>
          <li><strong>Route Parameters:</strong> Accessing route parameters with useParams() hook</li>
          <li><strong>Navigation:</strong> Using Link and Navigate components for navigation</li>
          <li><strong>404 Handling:</strong> Custom NotFound component for undefined routes</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#e3f2fd', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #1976d2' }}>
        <h3 style={{ color: '#1976d2', marginTop: 0 }}>How to Test</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Click "Profile" to see nested routes (Profile Details and Settings)</li>
          <li>Click "Dashboard" without logging in - you'll be redirected to Login</li>
          <li>Login with any credentials (demo mode)</li>
          <li>Visit /blog/post-1 and /blog/post-2 to see dynamic routing</li>
          <li>Try accessing a non-existent route to see 404 page</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
