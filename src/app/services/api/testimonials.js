// API service for testimonials
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const fetchTestimonials = async () => {
  try {
    const url = `${API_URL}/testimonials/public/active`;
    logApiCall(url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('fetchTestimonials', data);
    
    // Handle the response structure from your backend
    const testimonials = Array.isArray(data) ? data : (data.data || []);
    
    if (!testimonials || testimonials.length === 0) {
      console.warn("No testimonials found in API response");
      return [];
    }
    
    // Filter active testimonials and sort by order
    const filteredTestimonials = testimonials
      .filter(testimonial => 
        testimonial.status?.toLowerCase() === "active" && 
        !testimonial.isDeleted && 
        testimonial.quote && 
        testimonial.authorName
      )
      .sort((a, b) => {
        // Sort by order first, then by createdAt
        if (a.order !== b.order) {
          return (a.order || 0) - (b.order || 0);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map(testimonial => ({
        quote: testimonial.quote,
        name: testimonial.authorName,
        role: testimonial.authorProfession || "",
      }));
    
    logApiResponse('fetchTestimonials (processed)', filteredTestimonials);
    return filteredTestimonials;
  } catch (error) {
    logApiError('fetchTestimonials', error);
    return [];
  }
};

