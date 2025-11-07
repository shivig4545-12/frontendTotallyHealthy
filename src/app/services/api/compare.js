// API service for compare
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchCompare = async () => {
  try {
    const response = await fetch(`${API_URL}/compare?status=active`);
    if (!response.ok) throw new Error("Failed to fetch compare data");
    
    const data = await response.json();
    // Handle both direct data and wrapped response formats
    const compareData = data.data || data;
    
    // Return null if no compare data found
    if (!compareData || !compareData.compareItems || compareData.compareItems.length === 0) {
      return null;
    }
    
    return {
      title: compareData.title || "Let's Compare",
      compareItems: compareData.compareItems || [],
      image1: compareData.image1 || "/img/compare/2.jpg",
      image2: compareData.image2 || "/img/compare/1.webp",
    };
  } catch (error) {
    console.error("Error fetching compare data:", error);
    return null;
  }
};

