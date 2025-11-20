'use client';

import React, { useState, useEffect } from "react";
import { FaDumbbell, FaLeaf } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import Image from "next/image"; // only for Next.js
import CustomBtn from "@/app/components/CustomBtn";
import { getAboutUsDetails } from "../../services/api/aboutUsDetails";

// Fallback data in case API fails
const fallbackData = {
  headline: "Change Your Life in the next 90 Days of Practice",
  description: "Founded in 2010, Totally Healthyhas transformed healthy eating in the UAE. We've created a destination where simple, nutritious, and wholesome food is accessible to everyone. At Totally healthy, we believe the choices we make about what we eat and how it's prepared should empower healthier lifestyles.",
  image: "/img/about/1.png",
  services: [
    {
      title: "Personalized Nutrition Plan",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      title: "Personalized Exercises Plan",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ],
};

// Icon mapping for services
const serviceIcons = [GiMeal, FaDumbbell, FaLeaf];

const About = () => {
  const [aboutData, setAboutData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAboutUsDetails();
        
        // Handle successful response with data
        if (response.success && response.data) {
          const data = response.data;
          setAboutData({
            headline: data.headline || fallbackData.headline,
            description: data.description || fallbackData.description,
            image: data.image || fallbackData.image,
            services: data.services && Array.isArray(data.services) && data.services.length > 0
              ? data.services
              : fallbackData.services,
          });
        } else {
          // API returned success but no data (null) or failed - use fallback
          console.warn("No about us details found in API response, using fallback data");
          // Keep fallback data - already set as initial state
        }
      } catch (error) {
        console.warn("Failed to fetch about us details from API, using fallback data:", error);
        // Keep fallback data on error - already set as initial state
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="relative bg-white py-16 px-6 md:px-16 overflow-hidden">
      {/* Floating Leaves */}
      <div className="absolute left-2 top-1/4 animate-pulse z-0">
        <Image
          src="/img/hero/shape2.png"
          alt="shape"
          width={10}
          height={10}
          className="w-10 h-10 animate-pulse"
        />
      </div>
      <div className="absolute left-8 bottom-4 animate-bounce z-0">
        <Image
          src="/img/hero/shape4.png"
          alt="shape"
          width={50}
          height={50}
          className="w-16 h-16 animate-pulse"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 md:pr-8">
          <p className="text-green-700 font-semibold mb-2">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {aboutData.headline}
          </h2>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            {aboutData.description}
          </p>

          {/* Dynamic Feature Cards */}
          {aboutData.services && aboutData.services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {aboutData.services.map((service, index) => {
                const IconComponent = serviceIcons[index % serviceIcons.length];
                return (
                  <div key={service._id || index} className="flex items-start space-x-4">
                    <div className="bg-[#61844c] text-white p-3 rounded-full">
                      <IconComponent className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-2 text-gray-800">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center relative">
          <Image
            src={aboutData.image}
            alt="About Us"
            width={500}
            height={400}
            className="w-full h-auto max-w-md animate-pulse"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
