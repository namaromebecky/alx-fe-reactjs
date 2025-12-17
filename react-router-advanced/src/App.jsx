import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="app">
      <nav>
        <h1>React Router Advanced</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/blog">Blog</Link>
          <button onClick={isAuthenticated ? logout : login}>
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
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile/*" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div className="page">
      <h2>Welcome to Advanced React Router Demo</h2>
      <p>This project demonstrates advanced React Router features.</p>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p className="protected-message">✅ Protected route using useAuth hook</p>
    </div>
  );
}

// Profile Component with Nested Routes
function Profile() {
  return (
    <div className="page">
      <h2>Profile Management</h2>
      <p className="protected-message">✅ Protected route with nested navigation</p>
      
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
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h3>Profile Settings</h3>
      <p>Theme: Dark Mode</p>
      <p>Notifications: Enabled</p>
    </div>
  );
}

// Blog List Component
function BlogList() {
  return (
    <div className="page">
      <h2>Blog Posts</h2>
      <p className="dynamic-route-info">🔗 Dynamic routing: /blog/:id</p>
      <ul className="blog-list">
        <li><Link to="/blog/1">Post 1</Link></li>
        <li><Link to="/blog/2">Post 2</Link></li>
        <li><Link to="/blog/3">Post 3</Link></li>
      </ul>
    </div>
  );
}

// Blog Post Component
function BlogPost() {
  const { id } = require('react-router-dom').useParams();
  return (
    <div className="page">
      <h2>Blog Post {id}</h2>
      <p>Dynamic route: /blog/{id}</p>
    </div>
  );
}

export default App;
