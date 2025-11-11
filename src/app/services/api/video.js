// API service for video
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/v1/api";

/**
 * Converts YouTube URL to embed format if needed
 * @param {string} url - Video URL (can be YouTube URL or embed URL)
 * @returns {string} - Embed URL
 */
const convertToEmbedUrl = (url) => {
  if (!url) return null;
  
  // If already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Handle YouTube watch URLs
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  
  // Handle YouTube short URLs
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  
  // Return as is if it's already an embed URL or other video source
  return url;
};

export const fetchVideo = async () => {
  try {
    const url = `${API_URL}/videos`;
    console.log("Fetching video from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Video API response:", data);
    
    // Handle the response structure from your backend
    const videoData = data.data || data;
    
    if (!videoData || !videoData.videoUrl) {
      console.warn("No video data found in API response");
      return null;
    }
    
    // Convert video URL to embed format if needed
    const embedUrl = convertToEmbedUrl(videoData.videoUrl);
    
    // Handle brandLogo - filter out empty strings
    const brandLogo = videoData.brandLogo && videoData.brandLogo.trim() !== '' 
      ? videoData.brandLogo 
      : null;
    
    return {
      videoUrl: embedUrl,
      brandLogo: brandLogo,
      status: videoData.status || 'active',
    };
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

