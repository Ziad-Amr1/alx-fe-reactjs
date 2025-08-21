import { Outlet, Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Go Back
      </button>
      
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li><Link to="/profile/details" className="text-blue-500 hover:underline">Details</Link></li>
          <li><Link to="/profile/settings" className="text-blue-500 hover:underline">Settings</Link></li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Profile;