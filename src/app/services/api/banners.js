// Simple API service for banners
import { API_URL, logApiCall, logApiError } from './config';

export const fetchBanners = async () => {
  try {
    console.log("API_URL" , API_URL)
    const url = `${API_URL}/banners?`;
    logApiCall(url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch banners");
    
    const data = await response.json();
    const banners = Array.isArray(data) ? data : (data.data || []);
    
    // Filter active banners and sort by order
    return banners
      .filter(banner => 
        banner.status?.toLowerCase() === "active" && 
        !banner.isDeleted && 
        banner.title && 
        banner.image
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    logApiError('fetchBanners', error);
    return [];
  }
};

export const getDefaultBanner = () => ({
  title: "The tastiest and easiest way to lose weight fast.",
  description: "Cooking up made-to-order meal plans to help you look and feel fantastic! Choose from thousands of meal combinations and get healthy, nutritious and delicious meals delivered straight to your door.",
  image: "/img/hero/1.jpg",
  googleReviewCount: 1012,
});
