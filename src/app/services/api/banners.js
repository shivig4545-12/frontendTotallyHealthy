// Simple API service for banners
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

export const fetchBanners = async () => {
  try {
    const response = await fetch(`${API_URL}/banners?`);
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
    console.error("Error fetching banners:", error);
    return [];
  }
};

export const getDefaultBanner = () => ({
  title: "The tastiest and easiest way to lose weight fast.",
  description: "Cooking up made-to-order meal plans to help you look and feel fantastic! Choose from thousands of meal combinations and get healthy, nutritious and delicious meals delivered straight to your door.",
  image: "/img/hero/1.jpg",
  googleReviewCount: 1012,
});
