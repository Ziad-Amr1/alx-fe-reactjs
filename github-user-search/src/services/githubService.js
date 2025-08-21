import axios from 'axios'

const GITHUB_API_URL = 'https://api.github.com'

export const fetchUserData = async (searchParams) => {
  const { username, location, minRepos } = searchParams
  let query = ''

  if (username) query += `user:${username}`
  if (location) query += ` location:${location}`
  if (minRepos) query += ` repos:>${minRepos}`

  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${query}&per_page=10`
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch users from GitHub API')
  }
}