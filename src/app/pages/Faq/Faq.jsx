"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import { getAllFAQs } from "@/app/services/api/faq";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const data = await getAllFAQs(true); // Fetch only active FAQs
        setFaqs(data || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // On error, set empty array to prevent crashes
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/img/pricing/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-6xl mx-auto  px-4">
          <h3 className="text-2xl font-medium mb-4">
            Frequently Asked Questions
          </h3>
          <p className=" font-medium text-sm">
            Here, you can find out everything you need to know about Totally
            HealthyMeal Plans. If you have any other questions, you can contact
            us here or call 800-39872.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f5f0] py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid  md:grid-cols-[1fr_2fr] grid-cols-1 gap-12">
            <div className="bg-white shadow-sm p-3">
              <Image src="/img/faq.jpg" alt="faq" width={500} height={500} />
            </div>
            <div className="">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <p className="text-gray-500">Loading FAQs...</p>
                </div>
              ) : faqs.length === 0 ? (
                <div className="flex justify-center items-center py-12">
                  <p className="text-gray-500">No FAQs available at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={faq._id || faq.id || index}
                      className="border border-gray-200  bg-white shadow-xs"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-4  tracking-wider font-bold text-sm cursor-pointer text-gray-800 hover:text-[#aa8453] transition flex justify-between items-center"
                      >
                        {faq.question}
                        <span className="ml-2 text-xl">
                          {openIndex === index ? "−" : "+"}
                        </span>
                      </button>

                      {openIndex === index && (
                        <div className="px-4 pb-4 text-xs leading-loose  text-gray-500 tracking-widest">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
