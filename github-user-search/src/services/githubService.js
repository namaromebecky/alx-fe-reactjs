import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Existing function for single user search
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

// New function for advanced user search
export const searchUsers = async (searchParams, page = 1) => {
  try {
    const { username, location, minRepos, language } = searchParams;
    
    // Build query string
    let query = '';
    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;
    if (language) query += ` language:${language}`;
    
    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: {
        q: query.trim(),
        page: page,
        per_page: 10
      }
    });
    
    return {
      users: response.data.items,
      total_count: response.data.total_count,
      hasNextPage: response.data.items.length === 10
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to search users');
  }
};

// Function to get detailed user data for user cards
export const fetchUserDetails = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch details for ${username}`);
  }
};
