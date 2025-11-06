// API service for counter page
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchCounterPage = async () => {
  try {
    const response = await fetch(`${API_URL}/counter-page`);
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
    console.error("Error fetching counter page data:", error);
    // Return default values on error
    return {
      totalReviews: 1012,
      totalMealItems: 2000,
      happyClients: 300000,
      yearsHelpingPeople: 15,
    };
  }
};

