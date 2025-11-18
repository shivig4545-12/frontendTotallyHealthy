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

