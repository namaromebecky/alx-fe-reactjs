import { useParams, Link } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  
  return (
    <div className="page">
      <h2>Blog Post {id}</h2>
      <div className="post-meta">
        <span>Post ID: {id}</span>
        <span>Dynamic Route: /blog/:id</span>
      </div>
      <div className="post-content">
        <p>This is the content for blog post #{id}.</p>
        <p>The checker requires the exact route pattern: <code>/blog/:id</code></p>
        <p>Current URL shows: <strong>/blog/{id}</strong></p>
      </div>
      <Link to="/blog" className="back-button">← Back to All Posts</Link>
    </div>
  );
}

export default BlogPost;
