"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { createSubscription } from "@/app/services/api/subscription";

const Subscribe = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await createSubscription(fullName, email);
      setSuccess(true);
      setButtonText("Subscription");
      setFullName("");
      setEmail("");
      
      // Reset button text after 5 seconds (optional)
      setTimeout(() => {
        setButtonText("Subscribe");
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "Failed to subscribe. Please try again.");
      setButtonText("Subscribe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#f8fdf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Subscribe & Save
          </h2>
          <Image
            src="/img/sub.png"
            alt="Envelope Icon"
            width={48}
            height={48}
            className="inline-block"
          />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10">
          Sign-up to the Totally Health Life mailing list to receive the latest
          news and exclusive offers from Totally Health.
        </p>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl sm:rounded-full px-4 py-5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-3 w-full"
          suppressHydrationWarning
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm"
            suppressHydrationWarning
            disabled={isLoading}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm"
            suppressHydrationWarning
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer sm:w-auto bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 text-sm transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            } ${success ? "bg-green-600" : ""}`}
            suppressHydrationWarning
          >
            <FaPaperPlane className="text-sm" />
            {isLoading ? "Subscribing..." : buttonText}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 text-sm">{error}</p>
        )}

        {/* Success Message */}
        {success && (
          <p className="mt-4 text-green-600 text-sm font-semibold">
            Thank you for subscribing! You've been added to our mailing list.
          </p>
        )}
      </div>
    </section>
  );
};

export default Subscribe;
