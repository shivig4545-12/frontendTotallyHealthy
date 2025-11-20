// API service for Restaurant Locations
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

/**
 * Get all restaurant locations
 * @returns {Promise<Object>} Response data with locations array
 */
export const getRestaurantLocations = async () => {
  try {
    const url = `${API_URL}/restaurant-locations`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch restaurant locations: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getRestaurantLocations', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Restaurant locations retrieved successfully',
    };
  } catch (error) {
    logApiError('getRestaurantLocations', error);
    throw error;
  }
};

/**
 * Get a single restaurant location by ID
 * @param {string} id - Restaurant location ID (MongoDB ObjectId)
 * @returns {Promise<Object>} Response data with location object
 */
export const getRestaurantLocationById = async (id) => {
  try {
    if (!id) {
      throw new Error('Restaurant location ID is required');
    }
    
    const url = `${API_URL}/restaurant-locations/${id}`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch restaurant location: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getRestaurantLocationById', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Restaurant location retrieved successfully',
    };
  } catch (error) {
    logApiError('getRestaurantLocationById', error);
    throw error;
  }
};

/**
 * Create a new restaurant location (Admin endpoint)
 * @param {Object} locationData - Restaurant location data
 * @param {string} locationData.name - Location name
 * @param {string} locationData.address - Location address
 * @param {string} locationData.image - Location image URL (optional)
 * @param {string} token - Optional authentication token for admin access
 * @returns {Promise<Object>} Response data with created location
 */
export const createRestaurantLocation = async (locationData, token = null) => {
  try {
    const url = `${API_URL}/restaurant-locations`;
    logApiCall(url, 'POST');
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: locationData.name?.trim(),
        address: locationData.address?.trim(),
        image: locationData.image?.trim(),
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create restaurant location: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('createRestaurantLocation', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Restaurant location created successfully',
    };
  } catch (error) {
    logApiError('createRestaurantLocation', error);
    throw error;
  }
};

/**
 * Update a restaurant location (Admin endpoint)
 * @param {string} id - Restaurant location ID (MongoDB ObjectId)
 * @param {Object} locationData - Restaurant location data to update
 * @param {string} locationData.name - Location name (optional)
 * @param {string} locationData.address - Location address (optional)
 * @param {string} locationData.image - Location image URL (optional)
 * @param {string} token - Optional authentication token for admin access
 * @returns {Promise<Object>} Response data with updated location
 */
export const updateRestaurantLocation = async (id, locationData, token = null) => {
  try {
    if (!id) {
      throw new Error('Restaurant location ID is required');
    }
    
    const url = `${API_URL}/restaurant-locations/${id}`;
    logApiCall(url, 'PATCH');
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const requestBody = {};
    if (locationData.name !== undefined) {
      requestBody.name = locationData.name?.trim();
    }
    if (locationData.address !== undefined) {
      requestBody.address = locationData.address?.trim();
    }
    if (locationData.image !== undefined) {
      requestBody.image = locationData.image?.trim();
    }
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update restaurant location: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('updateRestaurantLocation', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Restaurant location updated successfully',
    };
  } catch (error) {
    logApiError('updateRestaurantLocation', error);
    throw error;
  }
};

/**
 * Delete a restaurant location (Admin endpoint)
 * @param {string} id - Restaurant location ID (MongoDB ObjectId)
 * @param {string} token - Optional authentication token for admin access
 * @returns {Promise<Object>} Response data
 */
export const deleteRestaurantLocation = async (id, token = null) => {
  try {
    if (!id) {
      throw new Error('Restaurant location ID is required');
    }
    
    const url = `${API_URL}/restaurant-locations/${id}`;
    logApiCall(url, 'DELETE');
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete restaurant location: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('deleteRestaurantLocation', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Restaurant location deleted successfully',
    };
  } catch (error) {
    logApiError('deleteRestaurantLocation', error);
    throw error;
  }
};

