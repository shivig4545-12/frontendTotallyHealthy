"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import { fetchCompare } from "@/app/services/api/compare";

// Default static data - fallback if API fails or no data
const defaultFeatures = [
  "9 Customisable Meal Plans",
  "More than 800 Dishes",
  "Expert Nutrition Team",
  "Optimised for Weight Loss",
  "Choose Every Meal",
  "Nutritionist Consultation",
  "Unlimited Menu Changes",
];

const Compare = () => {
  const [compareData, setCompareData] = useState({
    title: "Let's Compare",
    compareItems: defaultFeatures.map((title) => ({ title, included: true })),
    image1: "/img/compare/2.jpg",
    image2: "/img/compare/1.webp",
  });
  const dataFetchedRef = useRef(false);

  // Fetch compare data once (useEffect only runs on client side)
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      fetchCompare()
        .then((data) => {
          if (data && data.compareItems && data.compareItems.length > 0) {
            setCompareData({
              title: data.title,
              compareItems: data.compareItems,
              image1: data.image1,
              image2: data.image2,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching compare data:", error);
          // Keep default data on error - static layout remains
        });
    }
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Left Table */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {compareData.title}
            </h2>

            <table className="min-w-full border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="text-left text-sm font-semibold text-gray-500">
                    INCLUDED
                  </th>
                  <th className="bg-green-300 text-black text-xs font-bold px-6 py-3 rounded-t-md">
                    TOTALLY HEALTH MEAL PLANS
                  </th>
                  <th className="text-xs font-semibold text-gray-500 px-4 py-2">
                    OTHER MEAL PLANS
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareData.compareItems.map((item, idx) => (
                  <tr
                    key={`feature-${idx}`}
                    className="border-t border-gray-300"
                  >
                    <td className="text-sm text-gray-700 py-3">{item.title}</td>
                    <td className="text-center bg-green-100">
                      {item.included ? (
                        <FaCheck
                          className="text-green-500 inline-block"
                          aria-hidden
                        />
                      ) : (
                        <FaTimes
                          className="text-gray-400 inline-block"
                          aria-hidden
                        />
                      )}
                    </td>
                    <td className="text-center">
                      {item.included ? (
                        <FaTimes
                          className="text-gray-400 inline-block"
                          aria-hidden
                        />
                      ) : (
                        <FaCheck
                          className="text-green-500 inline-block"
                          aria-hidden
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px]">
            <Image
              src={compareData.image1}
              alt="Meal Kit"
              fill
              priority
              className="object-cover rounded-xl shadow-lg"
              onError={(e) => {
                // Fallback to default image if image fails to load
                e.target.src = "/img/compare/2.jpg";
              }}
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={compareData.image2}
                alt="Meal Tray"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to default image if image fails to load
                  e.target.src = "/img/compare/1.webp";
                }}
              />
            </div>
          </div>
        </div>

        {/* Animated Shape */}
        <div className="absolute left-4 top-12 z-0 pointer-events-none">
          <Image
            src="/img/hero/shape2.png"
            alt="Animated Shape"
            width={40}
            height={40}
            className="motion-safe:animate-pulse opacity-30"
          />
        </div>
      </div>
    </section>
  );
};

export default Compare;
