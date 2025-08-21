import { useState } from 'react'
import { searchUsers, fetchUserData } from '../services/githubService'

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchType, setSearchType] = useState('basic') // 'basic' أو 'advanced'

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      let data
      if (searchType === 'advanced' && (searchParams.location || searchParams.minRepos)) {
        // بحث متقدم
        data = await searchUsers(searchParams)
      } else {
        // بحث أساسي
        data = await fetchUserData(searchParams.username)
        data = [data] // تحويل إلى مصفوفة للتوافق مع عرض النتائج
      }
      setResults(Array.isArray(data) ? data : [data])
    } catch (err) {
      setError(err.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => setSearchType('basic')}
          className={`mr-2 px-4 py-2 rounded ${
            searchType === 'basic' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`px-4 py-2 rounded ${
            searchType === 'advanced' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Advanced Search
        </button>
      </div>

      <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={searchParams.username}
            onChange={(e) => setSearchParams({...searchParams, username: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter GitHub username"
          />
        </div>

        {searchType === 'advanced' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Filter by location"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Minimum Repositories
              </label>
              <input
                type="number"
                value={searchParams.minRepos}
                onChange={(e) => setSearchParams({...searchParams, minRepos: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Minimum number of repositories"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="mt-8">
        {results.map(user => (
          <div key={user.id} className="bg-white shadow-md rounded p-6 mb-4">
            <div className="flex items-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{user.login}</h3>
                <p className="text-gray-600">{user.name || 'No name provided'}</p>
                <p>Location: {user.location || 'Not specified'}</p>
                <p>Repositories: {user.public_repos}</p>
                <p>Followers: {user.followers}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search