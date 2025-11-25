import config from '../config';

class ApiService {
  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  // Generic request method - FIXED VERSION
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, get as text to see what we're getting
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 200)); // Log first 200 chars
        
        // If it's HTML and we expected JSON, this is an error
        if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}. This usually means the endpoint doesn't exist or there's a server error.`);
        }
        
        throw new Error(`Expected JSON but got ${contentType}. Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Specific methods for different endpoints
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Add auth header automatically
  async authenticatedRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    return this.request(endpoint, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });
  }
}

// Create a single instance
export const apiService = new ApiService();