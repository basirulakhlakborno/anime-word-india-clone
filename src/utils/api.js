// Get API base URL from environment variable
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  // In development, use relative URL if proxy is configured, otherwise use absolute URL
  const isDev = import.meta.env.DEV;
  const fallbackUrl = isDev ? '/api' : 'http://localhost:3001/api';
  
  if (envUrl) {
    // If env URL is provided, use it (could be relative or absolute)
    const url = envUrl;
    console.log('[API] Using API Base URL from .env:', url);
    return url;
  } else {
    console.warn('[API] VITE_API_BASE_URL not found, using fallback:', fallbackUrl);
    return fallbackUrl;
  }
};

const API_BASE_URL = getApiBaseUrl();

/**
 * API service for making requests to the backend
 */
class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    console.log('[API Service] Initialized with base URL:', this.baseUrl);
  }
  
  /**
   * Get the current base URL (for debugging)
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Make a GET request
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get homepage data
   */
  async getHome() {
    return this.get('/home');
  }

  /**
   * Get category/type data
   */
  async getCategory(type, page = 1) {
    return this.get(`/category/${type}`, { page });
  }

  /**
   * Get letter data
   */
  async getLetter(letter, page = 1) {
    return this.get(`/letter/${letter}`, { page });
  }

  /**
   * Get series/movie info
   */
  async getInfo(id) {
    return this.get(`/info/${id}`);
  }

  /**
   * Get episodes for a series/movie
   */
  async getEpisodes(id, season) {
    return this.get(`/episodes/${id}/${season}`);
  }

  /**
   * Get embed player links
   */
  async getEmbed(id) {
    return this.get(`/embed/${id}`);
  }

  /**
   * Search suggestions
   */
  async searchSuggestions(query) {
    return this.get('/search', { suggestion: query });
  }

  /**
   * Full search
   */
  async search(query) {
    return this.get('/search', { q: query });
  }

  /**
   * Test API connection (for debugging)
   */
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/home`);
      return {
        success: response.ok,
        status: response.status,
        baseUrl: this.baseUrl,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        baseUrl: this.baseUrl,
      };
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();

// Log API configuration on module load (only in development)
if (import.meta.env.DEV) {
  console.log('[API] Configuration:', {
    baseUrl: apiService.getBaseUrl(),
    envVar: import.meta.env.VITE_API_BASE_URL,
    mode: import.meta.env.MODE,
  });
}

export default apiService;
