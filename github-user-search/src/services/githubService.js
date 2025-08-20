// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Fetch basic user data
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('An error occurred while fetching user data');
  }
};

// Advanced search for multiple users
export const searchUsers = async (query, options = {}) => {
  try {
    const { page = 1, per_page = 10, sort, order } = options;
    let q = query;
    
    if (options.location) q += `+location:${options.location}`;
    if (options.repos) q += `+repos:>=${options.repos}`;
    if (options.followers) q += `+followers:>=${options.followers}`;
    
    const params = {
      q,
      page,
      per_page,
      sort,
      order
    };
    
    const response = await axios.get(`${BASE_URL}/search/users`, { params });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while searching users');
  }
};

// Fetch detailed user data
export const fetchUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user details');
  }
};