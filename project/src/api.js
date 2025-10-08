// API configuration
const API_BASE_URL = 'https://neatseed-b.onrender.com';

// API endpoints
const API_ENDPOINTS = {
  login: '/admin_login',
  signup: '/admin_signup'
};

// Helper function to get full endpoint URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}`;
};

export default {
  baseUrl: API_BASE_URL,
  endpoints: API_ENDPOINTS,
  getApiUrl
};
