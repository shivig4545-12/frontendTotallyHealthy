// API Configuration with environment-based conditionals

/**
 * Environment Detection:
 * - DEVELOPMENT: When running `npm run dev` → NODE_ENV = 'development'
 * - PRODUCTION: When running `npm run build` or `npm run start` → NODE_ENV = 'production'
 */

// Detect environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Get API URL from .env file
// Priority: NEXT_PUBLIC_API_URL from .env file > fallback to localhost for development
const getApiUrl = () => {
  // Use NEXT_PUBLIC_API_URL from .env file
  // - Production: Uses URL from .env file (https://totally-helth.vercel.app/v1/api)
  // - Development: Uses URL from .env.local file (http://localhost:5050/v1/api) which overrides .env
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback to localhost only if no .env is set (shouldn't happen in normal usage)
  return 'http://localhost:5050/v1/api';
};

// Export API URL
export const API_URL = getApiUrl();

// Export environment flags
export const IS_PRODUCTION = isProduction;
export const IS_DEVELOPMENT = isDevelopment;

// Export current environment name
export const ENVIRONMENT = isProduction ? 'production' : 'development';

// Helper function to log API calls (only in development)
export const logApiCall = (url, method = 'GET') => {
  if (IS_DEVELOPMENT) {
    console.log(`[API ${method}] ${url}`);
  }
};

// Helper function to log API responses (only in development)
export const logApiResponse = (endpoint, data) => {
  if (IS_DEVELOPMENT) {
    console.log(`[API Response] ${endpoint}:`, data);
  }
};

// Helper function to log API errors (always log errors)
export const logApiError = (endpoint, error) => {
  console.error(`[API Error] ${endpoint}:`, error);
};

/**
 * Conditional Rendering Helpers
 * Use these in your components to show/hide features based on environment
 */

// Show component/element only in development
export const showInDevelopment = (component) => {
  return IS_DEVELOPMENT ? component : null;
};

// Show component/element only in production
export const showInProduction = (component) => {
  return IS_PRODUCTION ? component : null;
};

// Hide component/element in development (show only in production)
export const hideInDevelopment = (component) => {
  return IS_PRODUCTION ? component : null;
};

// Hide component/element in production (show only in development)
export const hideInProduction = (component) => {
  return IS_DEVELOPMENT ? component : null;
};

// Get environment-specific value
export const getEnvValue = (devValue, prodValue) => {
  return IS_DEVELOPMENT ? devValue : prodValue;
};

// Log current environment info (useful for debugging)
export const logEnvironmentInfo = () => {
  if (IS_DEVELOPMENT) {
    console.log('🔧 Development Mode');
    console.log('📍 API URL:', API_URL);
  } else {
    console.log('🚀 Production Mode');
    console.log('📍 API URL:', API_URL);
  }
};

