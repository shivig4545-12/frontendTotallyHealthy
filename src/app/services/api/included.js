// API service for included meals
import { API_URL, logApiCall, logApiError } from './config';

export const fetchIncludedMeals = async () => {
  try {
    const url = `${API_URL}/included?status=active`;
    logApiCall(url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch included meals");
    
    const data = await response.json();
    const meals = Array.isArray(data) ? data : (data.data || []);
    
    // Filter active meals and sort by order
    return meals
      .filter(meal => 
        meal.status?.toLowerCase() === "active" && 
        !meal.isDeleted && 
        meal.title && 
        meal.image_url
      )
      .sort((a, b) => {
        // Sort by order first, then by createdAt
        if (a.order !== b.order) {
          return (a.order || 0) - (b.order || 0);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  } catch (error) {
    logApiError('fetchIncludedMeals', error);
    return [];
  }
};

