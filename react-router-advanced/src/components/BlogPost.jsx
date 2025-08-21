import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Post {id}</h1>
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Home</Link>
      <p>This is the content of blog post {id}.</p>
    </div>
  );
};

export default BlogPost;