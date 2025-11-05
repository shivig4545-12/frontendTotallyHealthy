"use client";

import Image from "next/image";

const TrustSection = ({ googleReviewCount, certLogo }) => {
  // Format the review count (add + if >= 1000, otherwise just show the number)
  const formatReviewCount = (count) => {
    if (!count && count !== 0) return "1012+"; // Default fallback
    return count >= 1000 ? `${count}+` : count.toString();
  };

  return (
    <div className="flex items-center flex-wrap gap-2 text-sm md:text-base px-4 py-6">
      <Image
        src="/img/icons/1.webp"
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
        src="/img/logo.png"
        alt="Tabby"
        width={60}
        height={20}
      />
      {/* Certification Logo - Inline with other elements */}
      {certLogo ? (
        <div className="flex items-center ml-20 mb-10">
          <img
            src={certLogo}
            alt="Certification Logo"
            className="h-8 md:h-6 w-auto object-contain"
            style={{ verticalAlign: 'middle' }}
            onError={(e) => {
              // Fallback to static image if certLogo fails
              e.target.src = "/img/icons/2.webp";
            }}
          />
        </div>
      ) : (
        <div className="flex items-center ml-2">
          <Image
            src="/img/icons/2.webp"
            alt="Certification"
            width={80}
            height={40}
            style={{ verticalAlign: 'middle' }}
          />
        </div>
      )}
    </div>
  );
};

export default TrustSection;
