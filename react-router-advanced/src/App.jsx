import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import BlogPost from './components/BlogPost';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        <nav>
          <h1>React Router Advanced</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/blogs">Blogs</Link>
            <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
            <span className="auth-status">
              Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}
            </span>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/*" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}

// Home Component
function Home() {
  return (
    <div className="page">
      <h2>Welcome to Advanced React Router Demo</h2>
      <div className="instructions">
        <h3>Features Implemented:</h3>
        <ul>
          <li><strong>Nested Routes:</strong> Profile → Details/Settings</li>
          <li><strong>Dynamic Routes:</strong> /blogs/:id</li>
          <li><strong>Protected Routes:</strong> Dashboard & Profile require login</li>
        </ul>
        <h3>How to Test:</h3>
        <ol>
          <li>Click "Login" button to authenticate</li>
          <li>Try accessing Dashboard or Profile</li>
          <li>Click on Profile to see nested routes</li>
          <li>Go to Blogs and click on any post</li>
          <li>Logout and try accessing protected routes</li>
        </ol>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p className="protected-message">✅ This is a protected route - only visible when logged in</p>
      <p>Dashboard content goes here...</p>
    </div>
  );
}

// Profile Component with Nested Routes
function Profile() {
  return (
    <div className="page">
      <h2>Profile Management</h2>
      <p className="protected-message">✅ This is a protected route with nested navigation</p>
      
      <nav className="profile-nav">
        <Link to="details">👤 Details</Link>
        <Link to="settings">⚙️ Settings</Link>
      </nav>
      
      <div className="profile-content">
        <Routes>
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="/" element={<ProfileDetails />} />
        </Routes>
      </div>
    </div>
  );
}

function ProfileDetails() {
  return (
    <div>
      <h3>Profile Details</h3>
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <p>Location: New York</p>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h3>Profile Settings</h3>
      <p>Theme: Dark Mode</p>
      <p>Notifications: Enabled</p>
      <p>Language: English</p>
    </div>
  );
}

// Blog List Component
function BlogList() {
  return (
    <div className="page">
      <h2>Blog Posts</h2>
      <p className="dynamic-route-info">🔗 Click any post to see dynamic routing in action</p>
      <ul className="blog-list">
        <li><Link to="/blogs/1">Getting Started with React Router</Link></li>
        <li><Link to="/blogs/2">Advanced State Management</Link></li>
        <li><Link to="/blogs/3">TypeScript with React</Link></li>
        <li><Link to="/blogs/4">Testing React Applications</Link></li>
      </ul>
      <div className="route-info">
        <p><strong>Dynamic Route Pattern:</strong> <code>/blogs/:id</code></p>
        <p>Each link above will navigate to a different URL based on the ID</p>
      </div>
    </div>
  );
}

export default App;
