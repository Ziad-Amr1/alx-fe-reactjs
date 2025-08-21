import { useQuery } from 'react-query';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use React Query's useQuery hook to fetch data
  const { 
    data, 
    error, 
    isLoading, 
    isError, 
    refetch, 
    isFetching 
  } = useQuery('posts', fetchPosts, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Display loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
      
      {isFetching && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <p>Updating data in the background...</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
            <div className="mt-4 text-sm text-gray-500">
              Post ID: {post.id} | User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">React Query Features Demonstrated:</h2>
        <ul className="list-disc list-inside">
          <li>Automatic caching of API responses</li>
          <li>Background data refetching</li>
          <li>Loading and error states handling</li>
          <li>Manual refetching capability</li>
          <li>Stale-time configuration (data is fresh for 5 minutes)</li>
        </ul>
        <p className="mt-2 text-sm">
          Try navigating away from this component and returning to see how React Query serves data from cache.
        </p>
      </div>
    </div>
  );
};

export default PostsComponent;