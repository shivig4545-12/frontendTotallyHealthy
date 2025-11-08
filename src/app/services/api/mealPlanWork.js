// API service for meal plan work
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchMealPlanWork = async () => {
  try {
    const url = `${API_URL}/meal-plan-work?status=active`;
    console.log("Fetching meal plan work from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch meal plan work: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Meal plan work API response:", data);
    
    // Handle the response structure from your backend
    const mealPlanWork = data.data || data;
    
    if (!mealPlanWork || mealPlanWork.status?.toLowerCase() !== "active" || mealPlanWork.isDeleted) {
      console.warn("No active meal plan work found in API response");
      return null;
    }
    
    // Map the API response to component structure
    return {
      title: mealPlanWork.title || "How Totally Healthy Meal Plans Work",
      subtitle: mealPlanWork.subtitle || "Three Steps to Better Health and Happiness",
      banner1: mealPlanWork.banner1 || "/img/howwork/2.jpg",
      banner2: mealPlanWork.banner2 || "/img/howwork/3.png",
      steps: [
        {
          no: "1",
          title: mealPlanWork.step1?.title || "Select Your Meal Plan",
          description: mealPlanWork.step1?.subTitle || "Choose from one of our highly customisable meal plans that feels right for you.",
        },
        {
          no: "2",
          title: mealPlanWork.step2?.title || "Customise your Meal Plan",
          description: mealPlanWork.step2?.subTitle || "Fully customise your calorie range, plan duration and payment options to suit you.",
        },
        {
          no: "3",
          title: mealPlanWork.step3?.title || "Order Your Meals and Enjoy!",
          description: mealPlanWork.step3?.subTitle || "Choose from over 800 meals, select your delivery time and address, and your freshly prepared meals will be delivered to your door.",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching meal plan work:", error);
    return null;
  }
};

