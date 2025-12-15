import React from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', minHeight: '500px' }}>
        {/* Sidebar for nested navigation */}
        <div style={{ width: '250px', backgroundColor: '#f8f9fa', borderRight: '1px solid #e0e0e0', padding: '2rem' }}>
          <h2 style={{ color: '#1976d2', marginTop: 0 }}>Profile</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Manage your account settings</p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link 
              to="details" 
              style={{ 
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                color: '#333',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className={({ isActive }) => isActive ? 'active-nav' : ''}
            >
              👤 Profile Details
            </Link>
            <Link 
              to="settings" 
              style={{ 
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                color: '#333',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className={({ isActive }) => isActive ? 'active-nav' : ''}
            >
              ⚙️ Account Settings
            </Link>
            <Link 
              to="/" 
              style={{ 
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                color: '#666',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2rem'
              }}
            >
              ← Back to Home
            </Link>
          </nav>
          
          <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
            <h4 style={{ color: '#2e7d32', marginTop: 0 }}>Nested Routes Demo</h4>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>
              This profile page uses nested routing. The URL changes but the main layout stays.
            </p>
          </div>
        </div>
        
        {/* Nested routes content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
