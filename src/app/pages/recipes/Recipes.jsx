"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { fetchIncludedMeals } from "@/app/services/api/included";

const Recipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [expandedTitles, setExpandedTitles] = useState({});
  const dataFetchedRef = useRef(false);
  const TITLE_LIMIT = 30; // Character limit before truncation

  // Transform API data to component format
  const transformMealData = (meal) => {
    return {
      id: meal._id,
      img: meal.image_url,
      title: meal.meal_type,
      subtitle: meal.title,
      Calories: meal.nutrition?.calories?.toFixed(1) || "0.0",
      fat: `${meal.nutrition?.fat_g?.toFixed(1) || "0.0"}g`,
      carbs: `${meal.nutrition?.carbs_g?.toFixed(1) || "0.0"}g`,
      protein: `${meal.nutrition?.protein_g?.toFixed(1) || "0.0"}g`,
      footerTitle: "Allergens",
      footerDesc: meal.allergens && meal.allergens.length > 0 
        ? meal.allergens.join(", ") 
        : "None",
    };
  };

  // Toggle expanded state for a specific title
  const toggleTitle = (itemId) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Fetch dynamic data once
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      fetchIncludedMeals()
        .then((meals) => {
          if (meals && meals.length > 0) {
            const transformedData = meals.map(transformMealData);
            setRecipesData(transformedData);
          }
        })
        .catch((error) => {
          console.error("Error fetching included meals:", error);
        });
    }
  }, []);
  return (
    <section className="py-10 bg-[#f2fef2] border-b border-dotted">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            What’s Included
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See our delicious sample recipes
          </p>
        </div>

        {recipesData.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            //   pagination={{ clickable: true }}
            loop={recipesData.length > 3}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
          >
            {recipesData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden p-3 hover:bg-[#f2fef2] hover:border-dotted border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Left: Image */}
                  <div className="relative w-full sm:w-1/3 aspect-[4/3] rounded overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.subtitle}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>

                  {/* Right: Info */}
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-green-600 font-medium uppercase">
                        {item.title}
                      </span>
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                          {item.subtitle.length > TITLE_LIMIT && !expandedTitles[item.id] ? (
                            <>
                              {item.subtitle.slice(0, TITLE_LIMIT)}...
                              <button
                                onClick={() => toggleTitle(item.id)}
                                className="text-green-600 hover:text-green-700 font-medium text-xs ml-1 underline cursor-pointer"
                              >
                                Read More
                              </button>
                            </>
                          ) : item.subtitle.length > TITLE_LIMIT && expandedTitles[item.id] ? (
                            <>
                              {item.subtitle}
                              <button
                                onClick={() => toggleTitle(item.id)}
                                className="text-green-600 hover:text-green-700 font-medium text-xs ml-1 underline cursor-pointer"
                              >
                                Read Less
                              </button>
                            </>
                          ) : (
                            item.subtitle
                          )}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3 bg-green-50 p-2 rounded">
                        <p>
                          <strong>Calories:</strong> {item.Calories}
                        </p>
                        <p>
                          <strong>Fat:</strong> {item.fat}
                        </p>
                        <p>
                          <strong>Carbs:</strong> {item.carbs}
                        </p>
                        <p>
                          <strong>Protein:</strong> {item.protein}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-3 text-xs text-gray-500 flex justify-between mt-2 flex-wrap gap-1">
                  <strong>{item.footerTitle}:</strong>
                  <p>{item.footerDesc}</p>
                </div>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Loading delicious recipes...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recipes;
