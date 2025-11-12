"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { fetchLogos } from "@/app/services/api/logos";

// Fallback static data in case API fails
const brandsData = [
  { id: 1, img: "/img/brands/1.png" },
  { id: 2, img: "/img/brands/2.png" },
  { id: 3, img: "/img/brands/3.png" },
  { id: 4, img: "/img/brands/4.png" },
  { id: 5, img: "/img/brands/5.png" },
];

const Brands = () => {
  const [logos, setLogos] = useState(brandsData);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const loadLogos = async () => {
      try {
        setIsLoading(true);
        const apiLogos = await fetchLogos('active');
        
        // Use API logos if available, otherwise fall back to static data
        if (apiLogos && apiLogos.length > 0) {
          setLogos(apiLogos);
        } else {
          // Keep static data as fallback
          setLogos(brandsData);
        }
      } catch (error) {
        console.error("Error loading logos:", error);
        // Fall back to static data on error
        setLogos(brandsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogos();
  }, []);

  const handleImageError = (brandId) => {
    setImageErrors(prev => ({ ...prev, [brandId]: true }));
  };

  // Don't render until we have data (prevents flash of empty content)
  if (isLoading && logos.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-[#f2fef2] border-b border-dotted">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={logos.length > 0}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
        >
          {logos.map((brand) => {
            // Use fallback image if this one failed to load
            const imageSrc = imageErrors[brand.id] ? "/img/brands/1.png" : brand.img;
            const isExternalUrl = brand.img?.startsWith('http');
            
            return (
              <SwiperSlide key={brand.id} className="flex justify-center">
                {isExternalUrl ? (
                  <img
                    src={imageSrc}
                    alt={`Brand ${brand.id}`}
                    width={100}
                    height={100}
                    className="object-contain w-15 h-15"
                    onError={() => handleImageError(brand.id)}
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={`Brand ${brand.id}`}
                    width={100}
                    height={100}
                    className="object-contain w-15 h-15"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
