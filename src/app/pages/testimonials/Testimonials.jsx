"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { fetchTestimonials } from "../../services/api/testimonials";
import "swiper/css";
import "swiper/css/pagination";

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
    name: "Selina Gomez",
    role: "Artist",
  },
  {
    quote:
      "Totally Healthy has changed my routine. Meals are tasty and the time I save is priceless!",
    name: "John Smith",
    role: "Entrepreneur",
  },
  {
    quote:
      "Best meal service I've ever tried. It fits perfectly into my diet and schedule!",
    name: "Emily Clark",
    role: "Fitness Coach",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        console.log("Loading testimonials...");
        const data = await fetchTestimonials();
        console.log("Received testimonials data:", data);
        
        if (data && data.length > 0) {
          setTestimonials(data);
          console.log("Testimonials set successfully:", data.length, "items");
        } else {
          console.warn("No testimonials received, using fallback");
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
        // Use fallback testimonials on error
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Use fallback if no testimonials loaded
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section
      className="py-20  relative overflow-hidden"
      style={{
        backgroundImage: "url(/img/testimonials-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-green-600 font-semibold mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Customer Satisfaction
        </h2>

        {displayTestimonials.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 5000 }}
            //   pagination={{ clickable: true }}
            loop={displayTestimonials.length > 1}
            className="w-full"
          >
            {displayTestimonials.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <FaQuoteLeft className="text-4xl text-[#121a2f] mx-auto mb-6" />
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {item.quote}
                </p>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h4>
                <p className="text-green-600 font-medium text-sm">{item.role}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-gray-500">Loading testimonials...</div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
