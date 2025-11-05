// API service for included meals
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchIncludedMeals = async () => {
  try {
    const response = await fetch(`${API_URL}/included?status=active`);
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
    console.error("Error fetching included meals:", error);
    return [];
  }
};

