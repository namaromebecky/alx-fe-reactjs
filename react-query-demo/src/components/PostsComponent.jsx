import React from 'react';
import { useQuery } from 'react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use React Query's useQuery hook
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error,
    refetch,
    isFetching 
  } = useQuery('posts', fetchPosts, {
    // Cache configuration
    staleTime: 10000, // Data stays fresh for 10 seconds
    cacheTime: 60000, // Data stays in cache for 60 seconds
    refetchOnWindowFocus: false, // Don't refetch on window focus for demo purposes
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
        <h3>Loading posts...</h3>
        <p>Fetching data from JSONPlaceholder API</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>❌</div>
        <h3>Error loading posts</h3>
        <p>{error.message}</p>
        <button 
          onClick={() => refetch()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header with controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div>
          <h2>Posts from JSONPlaceholder</h2>
          <p style={{ color: '#666' }}>
            Total posts: {posts?.length || 0} | 
            Data is cached: React Query will cache this data for 60 seconds
          </p>
        </div>
        
        <div>
          <button 
            onClick={() => refetch()}
            disabled={isFetching}
            style={{
              padding: '10px 20px',
              backgroundColor: isFetching ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isFetching ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
          
          <button 
            onClick={() => {
              // Clear cache by invalidating the query
              // This forces a fresh fetch
              refetch({ force: true });
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Cache & Refetch
          </button>
        </div>
      </div>

      {/* Cache demonstration info */}
      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        borderLeft: '4px solid #1976d2'
      }}>
        <h4>📚 React Query Cache Demonstration:</h4>
        <p>
          <strong>How to test caching:</strong>
          <br />1. Click "Refresh Data" - shows loading briefly (cache hit)
          <br />2. Click "Clear Cache & Refetch" - forces new API call
          <br />3. Navigate away and come back - data loads instantly from cache
          <br />4. Wait 10+ seconds then refresh - data becomes "stale" but still served from cache
        </p>
      </div>

      {/* Posts grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {posts?.slice(0, 12).map((post) => (
          <div 
            key={post.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{ 
              marginTop: '0', 
              color: '#1976d2',
              fontSize: '18px',
              marginBottom: '10px'
            }}>
              {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
            </h3>
            <p style={{ 
              color: '#666',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {post.body.length > 150 ? post.body.substring(0, 150) + '...' : post.body}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '15px',
              fontSize: '12px',
              color: '#999'
            }}>
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional cache info */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px dashed #ccc'
      }}>
        <h4>🔍 React Query Features Demonstrated:</h4>
        <ul>
          <li><strong>Caching:</strong> Data cached for 60 seconds (configurable)</li>
          <li><strong>Stale Time:</strong> Data considered fresh for 10 seconds</li>
          <li><strong>Auto Refetching:</strong> Can be configured on window focus, interval, etc.</li>
          <li><strong>Error Handling:</strong> Built-in error states and retry logic</li>
          <li><strong>Loading States:</strong> Differentiates between initial load and background refetch</li>
          <li><strong>Pagination Ready:</strong> React Query supports pagination, infinite scroll</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;
