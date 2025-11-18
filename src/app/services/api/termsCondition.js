// API service for Terms and Conditions
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const getTermsCondition = async () => {
  try {
    const url = `${API_URL}/terms-conditions`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch Terms and Conditions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getTermsCondition', data);
    
    // Extract content from response (handle both direct object and wrapped response)
    const termsData = data.data || data;
    
    // Return the content, or default if not found
    return termsData?.content || '<p>Terms and Conditions content will be available soon.</p>';
  } catch (error) {
    logApiError('getTermsCondition', error);
    throw error;
  }
};

