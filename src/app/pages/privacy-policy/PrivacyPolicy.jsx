"use client";
import React, { useState, useEffect } from "react";
import { getPrivacyPolicy } from "@/app/services/api/privacyPolicy";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        const data = await getPrivacyPolicy();
        setContent(data || '<p>Privacy Policy content will be available soon.</p>');
      } catch (error) {
        console.error("Error fetching Privacy Policy:", error);
        // On error, set default content
        setContent('<p>Unable to load Privacy Policy at the moment. Please try again later.</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <section className="py-16 bg-[#f8f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
        <div className="bg-white shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line ">
            Privacy Policy
          </h3>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">Loading Privacy Policy...</p>
            </div>
          ) : (
            <div 
              className="text-sm text-gray-500 text-justify leading-loose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
