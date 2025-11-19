// API service for Contact Us
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

/**
 * Create a new contact enquiry (Public endpoint)
 * @param {string} fullName - Full name of the contact
 * @param {string} emailAddress - Email address of the contact
 * @param {string} phoneNumber - Phone number (optional)
 * @param {string} subject - Subject of the message (optional)
 * @param {string} message - Message content
 * @returns {Promise<Object>} Response data
 */
export const createContact = async (fullName, emailAddress, phoneNumber, subject, message) => {
  try {
    const url = `${API_URL}/contact`;
    logApiCall(url, 'POST');
    
    const requestBody = {
      fullName: fullName?.trim(),
      emailAddress: emailAddress?.trim().toLowerCase(),
      message: message?.trim(),
    };

    // Add optional fields only if they have values
    if (phoneNumber?.trim()) {
      requestBody.phoneNumber = phoneNumber.trim();
    }
    if (subject?.trim()) {
      requestBody.subject = subject.trim();
    }
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to submit contact enquiry: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('createContact', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Contact enquiry submitted successfully',
    };
  } catch (error) {
    logApiError('createContact', error);
    throw error;
  }
};

/**
 * Get Get In Touch data (Public endpoint)
 * @param {string} id - Optional Get In Touch ID. If not provided, returns the first available record
 * @returns {Promise<Object|null>} Get In Touch data or null if no data exists
 */
export const getGetInTouch = async (id = null) => {
  try {
    const url = id ? `${API_URL}/get-in-touch/${id}` : `${API_URL}/get-in-touch`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch Get In Touch data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getGetInTouch', data);
    
    return {
      success: true,
      data: data.data || null,
      message: data.message || 'Get In Touch data retrieved successfully',
    };
  } catch (error) {
    logApiError('getGetInTouch', error);
    throw error;
  }
};

/**
 * Create or update Get In Touch data (Admin endpoint)
 * @param {string} id - Get In Touch ID (MongoDB ObjectId)
 * @param {Object} getInTouchData - Get In Touch data
 * @param {string} getInTouchData.title - Title
 * @param {string} getInTouchData.officeAddress - Office address
 * @param {string[]} getInTouchData.contactNumbers - Array of contact numbers
 * @param {string[]} getInTouchData.emailAddresses - Array of email addresses
 * @param {string} getInTouchData.careerInfo - Career information
 * @param {string} token - Optional authentication token for admin access
 * @returns {Promise<Object>} Response data
 */
export const upsertGetInTouch = async (id, getInTouchData, token = null) => {
  try {
    const url = `${API_URL}/get-in-touch/${id}`;
    logApiCall(url, 'PUT');
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title: getInTouchData.title?.trim(),
        officeAddress: getInTouchData.officeAddress?.trim(),
        contactNumbers: getInTouchData.contactNumbers || [],
        emailAddresses: getInTouchData.emailAddresses || [],
        careerInfo: getInTouchData.careerInfo?.trim(),
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to save Get In Touch data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('upsertGetInTouch', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Get In Touch data saved successfully',
    };
  } catch (error) {
    logApiError('upsertGetInTouch', error);
    throw error;
  }
};

