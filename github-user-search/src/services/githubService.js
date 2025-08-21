import axios from 'axios'

const GITHUB_API_URL = 'https://api.github.com'

// دالة للبحث المتقدم عن المستخدمين
export const searchUsers = async (searchParams) => {
  const { username, location, minRepos } = searchParams
  
  // بناء استعلام البحث
  let query = ''
  if (username) query += `user:${username}`
  if (location) query += ` location:${location}`
  if (minRepos) query += ` repos:>${minRepos}`
  
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}&per_page=10`
    )
    
    // الحصول على تفاصيل إضافية لكل مستخدم
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await getUserDetails(user.login)
        return userDetails
      })
    )
    
    return usersWithDetails
  } catch (error) {
    console.error('Error searching users:', error)
    throw new Error('Failed to search users')
  }
}

// دالة للحصول على تفاصيل مستخدم معين
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user details:', error)
    throw new Error('Failed to fetch user details')
  }
}

// دالة للبحث البسيط (للتوافق مع التاسك السابق)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Looks like we cant find the user')
  }
}