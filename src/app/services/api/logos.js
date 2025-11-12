// API service for logos
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const fetchLogos = async (status = 'active') => {
  try {
    const url = `${API_URL}/logos${status ? `?status=${status}` : ''}`;
    logApiCall(url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch logos: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('fetchLogos', data);
    
    // Handle the response structure from your backend
    const logos = Array.isArray(data) ? data : (data.data || []);
    
    if (!logos || logos.length === 0) {
      console.warn("No logos found in API response");
      return [];
    }
    
    // Filter active logos and sort by order
    const filteredLogos = logos
      .filter(logo => 
        logo.status?.toLowerCase() === "active" && 
        !logo.isDeleted && 
        logo.image
      )
      .sort((a, b) => {
        // Sort by order first, then by createdAt
        if (a.order !== b.order) {
          return (a.order || 0) - (b.order || 0);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map(logo => ({
        id: logo._id,
        img: logo.image,
        order: logo.order || 0,
      }));
    
    logApiResponse('fetchLogos (processed)', filteredLogos);
    return filteredLogos;
  } catch (error) {
    logApiError('fetchLogos', error);
    return [];
  }
};

