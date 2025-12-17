import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ... your other imports ...

// IMPORTANT: Make sure to import BlogPost
import BlogPost from './components/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes here */}
        
        {/* ADD THIS DYNAMIC ROUTE - checker requires this */}
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Your other routes continue here */}
      </Routes>
    </Router>
  );
}

export default App;
