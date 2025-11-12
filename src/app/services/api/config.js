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
// Priority: NEXT_PUBLIC_API_URL from .env file > fallback based on environment
const getApiUrl = () => {
  // Use NEXT_PUBLIC_API_URL from .env file
  // - Production: Uses URL from Vercel environment variables (e.g., https://totally-helth.vercel.app/v1/api)
  // - Development: Uses URL from .env.local file (https://totally-helth.vercel.app/v1/api) which overrides .env
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback based on environment
  if (isProduction) {
    // In production, if NEXT_PUBLIC_API_URL is not set, this will cause issues
    // Log a warning so it's visible in production logs
    console.error('⚠️ NEXT_PUBLIC_API_URL is not set in production! API calls will fail.');
    console.error('Please set NEXT_PUBLIC_API_URL in Vercel environment variables.');
    // Return a placeholder that will obviously fail - this helps identify the issue
    return 'https://api-url-not-configured/v1/api';
  }
  
  // Development fallback
  return 'https://totally-helth.vercel.app/v1/api';
};

// Export API URL
export const API_URL = getApiUrl();

// Export environment flags
export const IS_PRODUCTION = isProduction;
export const IS_DEVELOPMENT = isDevelopment;

// Export current environment name
export const ENVIRONMENT = isProduction ? 'production' : 'development';

// Helper function to log API calls
// Log in production too to help debug API issues
export const logApiCall = (url, method = 'GET') => {
  if (IS_DEVELOPMENT) {
    console.log(`[API ${method}] ${url}`);
  } else {
    // In production, log to help debug
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
// Always log in production to help debug API issues
export const logEnvironmentInfo = () => {
  if (IS_DEVELOPMENT) {
    console.log('🔧 Development Mode');
    console.log('📍 API URL:', API_URL);
  } else {
    console.log('🚀 Production Mode');
    console.log('📍 API URL:', API_URL);
    console.log('📍 NEXT_PUBLIC_API_URL env var:', process.env.NEXT_PUBLIC_API_URL || 'NOT SET');
  }
};

// Log API URL on module load (helps debug production issues)
if (typeof window !== 'undefined') {
  // Only log in browser (client-side)
  if (IS_PRODUCTION) {
    console.log('🌐 Client-side API URL:', API_URL);
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error('❌ NEXT_PUBLIC_API_URL environment variable is not set!');
      console.error('This will cause API calls to fail. Please configure it in Vercel.');
    }
  }
}

