// API service for testimonials
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchTestimonials = async () => {
  try {
    const url = `${API_URL}/testimonials/public/active`;
    console.log("Fetching testimonials from:", url);
    
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
    console.log("Testimonials API response:", data);
    
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
    
    console.log("Processed testimonials:", filteredTestimonials);
    return filteredTestimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

