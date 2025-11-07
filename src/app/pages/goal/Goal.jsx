"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { fetchGoal } from "@/app/services/api/goals";

// Default static data - fallback if API fails or no data
const defaultFeatures = [
  {
    icon: "/img/icons/3.webp",
    title: "Daily Exercise",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
  {
    icon: "/img/icons/4.webp",
    title: "Natural Foods",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
  {
    icon: "/img/icons/5.webp",
    title: "Nutrition Plans",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
];

const Goal = () => {
  const [goalData, setGoalData] = useState({
    title: "What is Your Goal?",
    subtitle: "Use the body assessment tool below to find out exactly what your body needs to achieve your transformation goals.",
    sections: defaultFeatures,
  });
  const dataFetchedRef = useRef(false);

  // Fetch goal data once (useEffect only runs on client side)
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      fetchGoal()
        .then((data) => {
          if (data && data.sections && data.sections.length > 0) {
            // Transform API sections to match component format
            const transformedSections = data.sections.map((section) => ({
              icon: section.icon,
              title: section.title,
              text: section.description,
              leaf: "/img/icons/shape5.png",
              url: "body-assessment",
            }));
            
            setGoalData({
              title: data.title,
              subtitle: data.subtitle,
              sections: transformedSections,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching goal data:", error);
          // Keep default data on error - static layout remains
        });
    }
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {goalData.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {goalData.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalData.sections.map((item, index) => (
            <div
              key={index}
              className="relative border border-green-300 p-6 rounded-lg bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:bg-green-100 cursor-pointer"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={30}
                    height={30}
                    className="object-contain"
                    onError={(e) => {
                      // Fallback to default icon if image fails to load
                      e.target.src = `/img/icons/${index + 3}.webp`;
                    }}
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{item.text}</p>

              {/* Link */}
              <Link
                href={item.url}
                className="text-green-600 font-semibold hover:underline text-sm"
              >
                Find my meal Plan
              </Link>

              {/* Decorative Leaf */}
              <Image
                src={item.leaf}
                alt="Decorative Leaf"
                width={50}
                height={50}
                className="absolute top-4 right-4 opacity-80 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goal;
