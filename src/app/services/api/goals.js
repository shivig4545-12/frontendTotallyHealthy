// API service for goals
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchGoal = async () => {
  try {
    const response = await fetch(`${API_URL}/goals?status=active`);
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
    console.error("Error fetching goal data:", error);
    return null;
  }
};

