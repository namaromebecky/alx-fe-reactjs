import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Navigation Header */}
        <nav style={{
          backgroundColor: '#1976d2',
          padding: '1rem 2rem',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.5rem' }}>React Router Advanced</h1>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  Home
                </Link>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  About
                </Link>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  Profile
                </Link>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  Dashboard
                </Link>
                <Link to="/blog/post-1" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  Blog Post 1
                </Link>
                <Link to="/blog/post-2" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  Blog Post 2
                </Link>
              </div>
            </div>
            <div>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: '1px solid white',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}>
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '2rem auto',
          padding: '0 2rem'
        }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dynamic Routing for Blog Posts */}
            <Route path="/blog/:postId" element={<BlogPost />} />
            
            {/* Protected Routes */}
            <Route path="/profile/*" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '2rem',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p>React Router Advanced Demo - Demonstrating Nested, Dynamic, and Protected Routes</p>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>
              <p>Features demonstrated:</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <li>✓ Nested Routes</li>
                <li>✓ Dynamic Routing</li>
                <li>✓ Protected Routes</li>
                <li>✓ Authentication Simulation</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
