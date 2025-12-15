import React from 'react';

const ProfileDetails = () => {
  return (
    <div>
      <h1 style={{ color: '#1976d2', marginTop: 0 }}>Profile Details</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>This is a nested route under /profile/details</p>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px dashed #ccc'
      }}>
        <h3>User Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Email:</strong> john@example.com
          </div>
          <div>
            <strong>Member Since:</strong> January 2024
          </div>
          <div>
            <strong>Account Type:</strong> Premium
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h4>Nested Route Information</h4>
        <p>Current URL: /profile/details</p>
        <p>This component is rendered inside the Profile component using React Router's nested routes.</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
