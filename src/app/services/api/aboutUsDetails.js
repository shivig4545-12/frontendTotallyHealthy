// API service for About Us Details
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

/**
 * Get About Us Details (Public endpoint)
 * @returns {Promise<Object>} Response data with about us details
 */
export const getAboutUsDetails = async () => {
  try {
    const url = `${API_URL}/about-us/details`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Handle 404 gracefully - return null data instead of throwing
    if (response.status === 404) {
      logApiResponse('getAboutUsDetails', { data: null, message: 'Not found' });
      return {
        success: true,
        data: null,
        message: 'About Us Details not found',
      };
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch about us details: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getAboutUsDetails', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'About Us Details retrieved successfully',
    };
  } catch (error) {
    logApiError('getAboutUsDetails', error);
    // Return a graceful response instead of throwing
    return {
      success: false,
      data: null,
      message: error.message || 'Failed to fetch about us details',
    };
  }
};


