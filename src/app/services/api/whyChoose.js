// API service for why choose
import { API_URL, logApiCall, logApiResponse, logApiError } from './config';

export const fetchWhyChoose = async () => {
  try {
    const url = `${API_URL}/why-choose?status=active`;
    logApiCall(url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch why choose: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiResponse('fetchWhyChoose', data);
    
    // Handle the response structure from your backend
    const whyChoose = data.data || data;
    
    if (!whyChoose || whyChoose.status?.toLowerCase() !== "active" || whyChoose.isDeleted) {
      console.warn("No active why choose found in API response");
      return null;
    }
    
    // Map the API response to component structure
    return {
      title: whyChoose.title || "Why Choose Totally Healthy Meal Plans?",
      subTitle: whyChoose.subTitle || "A few of the many reasons people choose Totally Healthy.",
      benefits: [
        {
          title: whyChoose.card1?.title || "Health & Nutrition",
          icon: whyChoose.card1?.icon || "/img/whychoose/1.png",
          points: whyChoose.card1?.items || [],
        },
        {
          title: whyChoose.card2?.title || "Time Saving",
          icon: whyChoose.card2?.icon || "/img/whychoose/2.png",
          points: whyChoose.card2?.items || [],
        },
        {
          title: whyChoose.card3?.title || "Lifestyle",
          icon: whyChoose.card3?.icon || "/img/whychoose/3.png",
          points: whyChoose.card3?.items || [],
        },
      ],
    };
  } catch (error) {
    logApiError('fetchWhyChoose', error);
    return null;
  }
};

