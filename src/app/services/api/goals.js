// API service for goals
import { API_URL, logApiCall, logApiError } from './config';

export const fetchGoal = async () => {
  try {
    const url = `${API_URL}/goals?status=active`;
    logApiCall(url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch goal data");
    
    const data = await response.json();
    // Handle both direct data and wrapped response formats
    const goalData = data.data || data;
    
    // Return null if no goal found
    if (!goalData || !goalData.sections || goalData.sections.length === 0) {
      return null;
    }
    
    return {
      title: goalData.title || "What is Your Goal?",
      subtitle: goalData.subtitle || "",
      sections: goalData.sections || [],
    };
  } catch (error) {
    logApiError('fetchGoal', error);
    return null;
  }
};

