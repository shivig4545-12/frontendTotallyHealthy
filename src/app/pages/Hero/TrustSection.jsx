"use client";

import Image from "next/image";

const TrustSection = ({ googleReviewCount, certLogo }) => {
  // Format the review count (add + if >= 1000, otherwise just show the number)
  const formatReviewCount = (count) => {
    if (!count && count !== 0) return "1012+"; // Default fallback
    return count >= 1000 ? `${count}+` : count.toString();
  };

  return (
    <div className="flex flex-col items-center gap-4 md:items-start md:flex-row md:justify-between md:gap-10 px-4 py-6">
      {/* Top Section: Google Rating + Tabby */}
      <div className="flex items-center flex-wrap gap-2 text-sm md:text-base">
        <Image
          src="/img/icons/1.webp" // replace with your actual path
          alt="Google"
          width={20}
          height={20}
        />
        <span className="text-gray-800 font-medium">{formatReviewCount(googleReviewCount)}</span>
        <div className="flex text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="text-gray-500">|</span>
        <span className="text-gray-800">Split payment with</span>
        <Image
          src="/img/logo.png" // replace with your actual path
          alt="Tabby"
          width={60}
          height={20}
        />
      </div>

      {/* Bottom Section: Certifications */}
      <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
        {certLogo ? (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-1.5 md:p-2 shadow-md border-2 border-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={certLogo}
              alt="Certification Logo"
              className="w-full h-full rounded-full object-cover"
              style={{ 
                aspectRatio: '1/1',
                objectFit: 'cover'
              }}
              onError={(e) => {
                // Fallback to static image if certLogo fails
                e.target.src = "/img/icons/2.webp";
              }}
            />
          </div>
        ) : (
          <Image
            src="/img/icons/2.webp"
            alt="Certification"
            width={100}
            height={50}
          />
        )}
      </div>
    </div>
  );
};

export default TrustSection;
