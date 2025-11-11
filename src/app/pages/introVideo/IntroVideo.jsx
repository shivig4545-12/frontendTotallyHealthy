"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";
import { fetchVideo } from "../../services/api/video";

const IntroVideo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadVideo = async () => {
      try {
        console.log("Loading video data...");
        const data = await fetchVideo();
        console.log("Received video data:", data);
        
        if (data && data.videoUrl) {
          setVideoData(data);
        } else {
          console.warn("No video data received, using fallback");
          // Fallback to default video if API fails
          setVideoData({
            videoUrl: "https://www.youtube.com/embed/izWRBNSVlc0",
            brandLogo: null,
          });
        }
      } catch (error) {
        console.error("Error loading video:", error);
        // Use fallback video on error
        setVideoData({
          videoUrl: "https://www.youtube.com/embed/izWRBNSVlc0",
          brandLogo: null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, []);

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-[95%] md:max-w-4xl">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] overflow-hidden bg-white" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[95%] md:max-w-4xl">
        {/* Video Thumbnail Section */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] overflow-hidden bg-white">
          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-white">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            </div>
          )}

          {/* Overlay Shape */}
          {!loading && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Image
                src="/img/video/2.png"
                alt="Overlay Shape"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Dynamic Brand Logo as Background - Only show after loading */}
          {!loading && videoData?.brandLogo && (
            <img
              src={videoData.brandLogo}
              alt="Brand Logo"
              className="absolute inset-0 w-full h-full object-cover z-0"
              onError={(e) => {
                console.error("Failed to load brand logo:", videoData.brandLogo);
                // Fallback to static image if brand logo fails
                e.target.src = "/img/video/1.jpg";
              }}
            />
          )}
          {/* Fallback to static image only if loading is complete and no brand logo */}
          {!loading && videoData && !videoData.brandLogo && (
            <Image
              src="/img/video/1.jpg"
              alt="Video Background"
              fill
              className="object-cover z-0"
            />
          )}

          {/* play btn */}
          {!loading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 ">
              <button
                onClick={() => setIsOpen(true)}
                disabled={!videoData?.videoUrl}
                className="relative w-16 cursor-pointer h-16 md:w-20 md:h-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Animated wave ring */}
                <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping z-0" />

                {/* Icon */}
                <FaPlay className="ml-1 z-10 relative text-lg md:text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && videoData?.videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative w-full max-w-3xl aspect-video bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 z-10"
            >
              <FaTimes />
            </button>
            
            {/* Video iframe */}
            <iframe
              className="w-full h-full"
              src={videoData.videoUrl}
              title="Intro Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default IntroVideo;
