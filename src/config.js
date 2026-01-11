// Proper environment configuration for both development and production
const config = {
  // API Base URL - works in both dev and prod
  API_BASE_URL: getApiBaseUrl(),
  
  // Add other environment variables here as needed
  APP_NAME: 'Jawhat Al Sharq Rent A Car'
};

// Smart function to determine API base URL
function getApiBaseUrl() {
  // 1. First try Vite environment variable (for production)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Fallback to localhost for development
  return 'http://192.168.20.245:3001';
}

// Validation to ensure config is correct
if (!config.API_BASE_URL) {
  console.error('❌ API_BASE_URL is not defined. Check your environment variables.');
}

export default config;
