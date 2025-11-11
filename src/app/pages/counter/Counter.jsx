"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaBellConcierge, FaUsers } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { fetchCounterPage } from "@/app/services/api/counterPage";

const Counter = () => {
  const [counterData, setCounterData] = useState({
    totalReviews: 1012,
    totalMealItems: 2000,
    happyClients: 300000,
    yearsHelpingPeople: 15,
  });
  const dataFetchedRef = useRef(false);

  // Format number with commas and add + sign
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0+";
    return num.toLocaleString("en-US") + "+";
  };

  // Fetch counter data once
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      fetchCounterPage()
        .then((data) => {
          if (data) {
            setCounterData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching counter page data:", error);
          // Keep default values on error
        });
    }
  }, []);

  const stats = [
    {
      icon: FaStar,
      number: formatNumber(counterData.totalReviews),
      label: "Reviews",
    },
    {
      icon: FaBellConcierge,
      number: formatNumber(counterData.totalMealItems),
      label: "Meal Items",
    },
    {
      icon: FaSmile,
      number: formatNumber(counterData.happyClients),
      label: "Happy Clients",
    },
    {
      icon: FaUsers,
      number: formatNumber(counterData.yearsHelpingPeople),
      label: "Years Helping People",
    },
  ];

  return (
    <section className="py-10 bg-green-50 border border-green-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="px-4 py-6">
                <div className="flex flex-col items-center">
                  <Icon className="text-2xl text-green-700 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counter;
