// API service for counter page
import { API_URL, logApiCall, logApiError } from './config';

export const fetchCounterPage = async () => {
  try {
    const url = `${API_URL}/counter-page`;
    logApiCall(url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch counter page data");
    
    const data = await response.json();
    // Handle both direct data and wrapped response formats
    const counterData = data.data || data;
    
    return {
      totalReviews: counterData.totalReviews || 0,
      totalMealItems: counterData.totalMealItems || 0,
      happyClients: counterData.happyClients || 0,
      yearsHelpingPeople: counterData.yearsHelpingPeople || 0,
    };
  } catch (error) {
    logApiError('fetchCounterPage', error);
    // Return default values on error
    return {
      totalReviews: 1012,
      totalMealItems: 2000,
      happyClients: 300000,
      yearsHelpingPeople: 15,
    };
  }
};

