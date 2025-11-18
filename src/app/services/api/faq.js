// API service for FAQs
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const getAllFAQs = async (activeOnly = true) => {
  try {
    const url = `${API_URL}/faqs${activeOnly ? '?active=true' : ''}`;
    logApiCall(url, 'GET');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch FAQs: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('getAllFAQs', data);
    
    // Extract FAQs from response (handle both direct array and wrapped response)
    const faqs = Array.isArray(data) ? data : (data.data || []);
    
    // Filter out deleted FAQs and sort by order
    return faqs
      .filter(faq => !faq.isDeleted)
      .sort((a, b) => {
        // Sort by order first, then by createdAt (newest first)
        if (a.order !== b.order) {
          return (a.order || 0) - (b.order || 0);
        }
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  } catch (error) {
    logApiError('getAllFAQs', error);
    throw error;
  }
};

