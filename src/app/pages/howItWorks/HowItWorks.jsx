"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchMealPlanWork } from "../../services/api/mealPlanWork";

// Fallback data in case API fails
const fallbackData = {
  title: "How Totally Healthy Meal Plans Work",
  subtitle: "Three Steps to Better Health and Happiness",
  banner1: "/img/howwork/2.jpg",
  banner2: "/img/howwork/3.png",
  steps: [
    {
      no: "1",
      title: "Select Your Meal Plan",
      description:
        "Choose from one of our highly customisable meal plans that feels right for you.",
    },
    {
      no: "2",
      title: "Customise your Meal Plan",
      description:
        "Fully customise your calorie range, plan duration and payment options to suit you.",
    },
    {
      no: "3",
      title: "Order Your Meals and Enjoy!",
      description:
        "Choose from over 800 meals, select your delivery time and address, and your freshly prepared meals will be delivered to your door.",
    },
  ],
};

const HowItWorks = () => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMealPlanWork = async () => {
      try {
        console.log("Loading meal plan work...");
        const apiData = await fetchMealPlanWork();
        console.log("Received meal plan work data:", apiData);
        
        if (apiData) {
          setData(apiData);
          console.log("Meal plan work set successfully");
        } else {
          console.warn("No meal plan work received, using fallback");
          setData(fallbackData);
        }
      } catch (error) {
        console.error("Error loading meal plan work:", error);
        // Use fallback data on error
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadMealPlanWork();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="md:flex items-start justify-between gap-10">
          {/* Left Steps */}
          <div className="w-full md:w-1/2 space-y-6">
            {data.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-green-50 p-5 rounded-md shadow-sm"
              >
                {/* Number Badge */}
                <div
                  className="min-w-[64px] min-h-[64px] flex items-center justify-center text-white text-xl font-bold bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: "url(/img/howwork/1.png)",
                  }}
                >
                  {step.no}
                </div>

                {/* Step Info */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex items-center justify-center">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={data.banner1}
                alt="Phone with food"
                fill
                className="object-cover rounded-xl"
                unoptimized={data.banner1.startsWith("http")}
              />

              {/* Overlay Image */}
              <div className="absolute -bottom-0 -right-0 w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl animate-pulse">
                <Image
                  src={data.banner2}
                  alt="Food plate"
                  fill
                  className="object-cover"
                  unoptimized={data.banner2.startsWith("http")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
