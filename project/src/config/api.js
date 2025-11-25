// This is the SAME backend URL as your admin app
const API_BASE_URL = 'https://neatseed-b.onrender.com';

// These keys now point to your CLIENT routes
const API_ENDPOINTS = {
  login: '/client/login',
  signup: '/client/signup',
  verify_otp: '/client/verify-otp'
};

// This function doesn't need to change
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}`;
};

export default {
  baseUrl: API_BASE_URL,
  endpoints: API_ENDPOINTS,
  getApiUrl
};