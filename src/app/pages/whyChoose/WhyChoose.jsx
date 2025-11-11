"use client";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { fetchWhyChoose } from "../../services/api/whyChoose";

// Fallback data in case API fails
const fallbackData = {
  title: "Why Choose Totally Healthy Meal Plans?",
  subTitle: "A few of the many reasons people choose Totally Healthy.",
  benefits: [
    {
      title: "Health & Nutrition",
      icon: "/img/whychoose/1.png",
      points: [
        "Calorie-controlled meals",
        "Macro-calculated dishes",
        "Nutritionist-certified",
        "Prepared by professional chefs",
      ],
    },
    {
      title: "Time Saving",
      icon: "/img/whychoose/2.png",
      points: [
        "No planning or shopping",
        "No cooking or cleaning",
        "Take and eat anywhere",
        "No worrying",
      ],
    },
    {
      title: "Lifestyle",
      icon: "/img/whychoose/3.png",
      points: [
        "More energy",
        "Weight loss",
        "Clearer thinking",
        "Allergy-friendly",
      ],
    },
  ],
};

const WhyChoose = () => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWhyChoose = async () => {
      try {
        console.log("Loading why choose...");
        const apiData = await fetchWhyChoose();
        console.log("Received why choose data:", apiData);
        
        if (apiData) {
          setData(apiData);
          console.log("Why choose set successfully");
        } else {
          console.warn("No why choose received, using fallback");
          setData(fallbackData);
        }
      } catch (error) {
        console.error("Error loading why choose:", error);
        // Use fallback data on error
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadWhyChoose();
  }, []);

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {data.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.subTitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 border border-green-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  unoptimized={item.icon.startsWith("http")}
                />
                <h4 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h4>
              </div>

              <ul className="space-y-2 mt-4 text-center">
                {item.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-800"
                  >
                    <FaCheck className="text-green-500 mt-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
