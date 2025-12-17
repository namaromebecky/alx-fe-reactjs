import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Blog Post {id}</h2>
      <p>This is blog post with ID: {id}</p>
      <p>Dynamic routing example - URL shows: /blogs/{id}</p>
    </div>
  );
}

export default BlogPost;
