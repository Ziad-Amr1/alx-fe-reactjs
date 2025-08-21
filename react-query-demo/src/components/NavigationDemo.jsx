import { useState } from 'react';
import PostsComponent from './PostsComponent';

const NavigationDemo = () => {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => setShowPosts(!showPosts)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showPosts ? 'Hide Posts' : 'Show Posts'}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          Toggle this button to simulate navigation. When you show posts again, 
          React Query will serve data from cache if it's still fresh.
        </p>
      </div>
      
      {showPosts && <PostsComponent />}
    </div>
  );
};

export default NavigationDemo;