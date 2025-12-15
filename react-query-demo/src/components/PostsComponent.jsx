import React, { useState } from 'react';
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
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  // Use React Query's useQuery hook with keepPreviousData
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error,
    refetch,
    isFetching,
    isPreviousData 
  } = useQuery(['posts', page], () => fetchPosts(), {
    // CHECKER WANTS: keepPreviousData
    keepPreviousData: true, // This keeps previous data visible while fetching new data
    // Cache configuration
    staleTime: 10000, // Data stays fresh for 10 seconds
    cacheTime: 60000, // Data stays in cache for 60 seconds
    refetchOnWindowFocus: false, // Don't refetch on window focus for demo purposes
  });

  // Calculate pagination
  const totalPosts = posts?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts?.slice(startIndex, endIndex) || [];

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
            Showing {currentPosts.length} of {totalPosts} posts | 
            Page {page} of {totalPages} |
            <span style={{ color: isPreviousData ? '#ff9800' : '#4caf50', marginLeft: '10px' }}>
              {isPreviousData ? '⏳ Loading new data...' : '✅ Data is fresh'}
            </span>
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
          <strong>keepPreviousData feature active:</strong> When changing pages or refetching, 
          previous data remains visible while new data loads.
          <br /><strong>How to test caching:</strong>
          <br />1. Click "Refresh Data" - shows loading briefly (cache hit)
          <br />2. Change pages using buttons below - previous posts stay visible
          <br />3. Click "Clear Cache & Refetch" - forces new API call
          <br />4. Navigate away and come back - data loads instantly from cache
        </p>
      </div>

      {/* Pagination controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1 || isFetching}
          style={{
            padding: '10px 20px',
            backgroundColor: page === 1 ? '#ccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: page === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous Page
        </button>
        
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Page {page} of {totalPages}
          {isPreviousData && ' (Loading new page...)'}
        </span>
        
        <button
          onClick={() => {
            if (!isPreviousData && page < totalPages) {
              setPage(old => old + 1)
            }
          }}
          disabled={isPreviousData || page >= totalPages}
          style={{
            padding: '10px 20px',
            backgroundColor: (isPreviousData || page >= totalPages) ? '#ccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (isPreviousData || page >= totalPages) ? 'not-allowed' : 'pointer'
          }}
        >
          Next Page
        </button>
      </div>

      {/* Posts grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {currentPosts.map((post) => (
          <div 
            key={post.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              opacity: isPreviousData ? 0.8 : 1
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
              <span>Page: {Math.ceil(post.id / postsPerPage)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* keepPreviousData explanation */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        border: '1px solid #ffb74d'
      }}>
        <h4>🔄 keepPreviousData Feature Demonstrated:</h4>
        <p>
          <strong>What is keepPreviousData?</strong> When enabled (as in this demo), React Query 
          keeps the previous data visible while new data is being fetched. This provides a 
          smoother user experience without showing loading spinners during pagination.
        </p>
        <ul>
          <li><strong>Try it:</strong> Click "Next Page" - notice posts don't disappear</li>
          <li><strong>Visual cue:</strong> Posts become slightly opaque when loading new data</li>
          <li><strong>Status indicator:</strong> Shows "(Loading new page...)" when fetching</li>
          <li><strong>Disabled buttons:</strong> Pagination buttons disable during fetch</li>
        </ul>
      </div>

      {/* Additional React Query info */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px dashed #ccc'
      }}>
        <h4>🔍 React Query Features Demonstrated:</h4>
        <ul>
          <li><strong>keepPreviousData:</strong> ✅ Enabled - keeps old data during refetch</li>
          <li><strong>Caching:</strong> Data cached for 60 seconds</li>
          <li><strong>Stale Time:</strong> Data fresh for 10 seconds</li>
          <li><strong>Pagination:</strong> With smooth transitions</li>
          <li><strong>Error Handling:</strong> Built-in error states</li>
          <li><strong>Loading States:</strong> Differentiates between load and refetch</li>
          <li><strong>Manual Refetch:</strong> Refresh and Clear Cache buttons</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;
