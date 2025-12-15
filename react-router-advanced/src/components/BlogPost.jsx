import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();
  
  // Mock blog post data
  const blogPosts = {
    'post-1': {
      title: 'Getting Started with React Router',
      content: 'React Router is the standard routing library for React. It enables navigation between views of different components in a React application...',
      author: 'Jane Smith',
      date: '2024-01-15',
      category: 'React'
    },
    'post-2': {
      title: 'Advanced Routing Techniques',
      content: 'Nested routing allows you to have routes within routes, creating complex navigation structures while keeping your code organized...',
      author: 'John Doe',
      date: '2024-01-20',
      category: 'Advanced'
    },
    'post-3': {
      title: 'Protected Routes and Authentication',
      content: 'Protected routes ensure that only authenticated users can access certain parts of your application...',
      author: 'Alex Johnson',
      date: '2024-01-25',
      category: 'Security'
    }
  };
  
  const post = blogPosts[postId] || {
    title: 'Post Not Found',
    content: 'The requested blog post does not exist.',
    author: 'Unknown',
    date: 'N/A',
    category: 'Error'
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #1976d2' }}>
        <h1 style={{ color: '#1976d2', marginTop: 0 }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '2rem', color: '#666' }}>
          <span>Author: {post.author}</span>
          <span>Date: {post.date}</span>
          <span>Category: {post.category}</span>
        </div>
      </div>
      
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <p>{post.content}</p>
        <p>This is dynamic content loaded based on the URL parameter: {postId}</p>
      </div>
      
      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>Dynamic Routing Information</h3>
        <p><strong>URL Parameter (postId):</strong> {postId}</p>
        <p><strong>Current URL:</strong> /blog/{postId}</p>
        <p><strong>Hook Used:</strong> useParams() to extract the postId from the URL</p>
      </div>
      
      <div>
        <h3>Other Blog Posts</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/blog/post-1" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Post 1
          </Link>
          <Link to="/blog/post-2" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Post 2
          </Link>
          <Link to="/blog/post-3" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Post 3
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
