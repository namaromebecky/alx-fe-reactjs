import React from 'react';

const ProfileSettings = () => {
  return (
    <div>
      <h1 style={{ color: '#1976d2', marginTop: 0 }}>Profile Settings</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>This is a nested route under /profile/settings</p>
      
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px solid #ffcc80'
      }}>
        <h3>Account Settings</h3>
        <form style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Notifications</label>
            <select style={{ padding: '0.5rem', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input type="checkbox" /> Two-Factor Authentication
            </label>
          </div>
          <button type="submit" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Save Settings
          </button>
        </form>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
        <h4>Nested Route Demo</h4>
        <p>Notice how the URL changes to /profile/settings but the sidebar navigation remains visible.</p>
        <p>This is achieved using React Router's nested routing feature.</p>
      </div>
    </div>
  );
};

export default ProfileSettings;
