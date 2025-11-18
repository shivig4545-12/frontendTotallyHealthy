// API service for Privacy Policy
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const getPrivacyPolicy = async () => {
  try {
    const url = `${API_URL}/privacy-policy`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch Privacy Policy: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getPrivacyPolicy', data);
    
    // Extract content from response (handle both direct object and wrapped response)
    const privacyPolicyData = data.data || data;
    
    // Return the content, or default if not found
    return privacyPolicyData?.content || '<p>Privacy Policy content will be available soon.</p>';
  } catch (error) {
    logApiError('getPrivacyPolicy', error);
    throw error;
  }
};

