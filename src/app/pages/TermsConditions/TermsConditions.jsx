"use client";
import React, { useState, useEffect } from "react";
import { getTermsCondition } from "@/app/services/api/termsCondition";

const TermsConditions = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermsCondition = async () => {
      try {
        setLoading(true);
        const data = await getTermsCondition();
        setContent(data || '<p>Terms and Conditions content will be available soon.</p>');
      } catch (error) {
        console.error("Error fetching Terms and Conditions:", error);
        // On error, set default content
        setContent('<p>Unable to load Terms and Conditions at the moment. Please try again later.</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchTermsCondition();
  }, []);

  return (
    <section className="py-16 bg-[#f8f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Terms and Conditions
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span> Terms and Conditions</span>
          </p>
        </div>
        <div className="bg-white shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line ">
            Terms and Conditions
          </h3>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">Loading Terms and Conditions...</p>
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

export default TermsConditions;
