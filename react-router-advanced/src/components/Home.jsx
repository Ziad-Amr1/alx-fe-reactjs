import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li><Link to="/profile" className="text-blue-500 hover:underline">Profile</Link></li>
          <li><Link to="/blog/1" className="text-blue-500 hover:underline">Blog Post 1</Link></li>
          <li><Link to="/blog/2" className="text-blue-500 hover:underline">Blog Post 2</Link></li>
        </ul>
      </nav>
      <p>Welcome to the home page of our advanced routing example!</p>
    </div>
  );
};

export default Home;