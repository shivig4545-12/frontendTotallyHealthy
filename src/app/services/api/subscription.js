// API service for subscriptions
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const createSubscription = async (fullName, email) => {
  try {
    const url = `${API_URL}/subscriptions`;
    logApiCall(url, 'POST');
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName?.trim(),
        email: email?.trim().toLowerCase(),
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create subscription: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('createSubscription', data);
    
    return {
      success: true,
      data: data.data || data,
      message: data.message || 'Subscription created successfully',
    };
  } catch (error) {
    logApiError('createSubscription', error);
    throw error;
  }
};

