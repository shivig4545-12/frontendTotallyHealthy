"use client";
import React, { useState, useEffect } from "react";
import { createContact, getGetInTouch } from "@/app/services/api/contact";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [getInTouchData, setGetInTouchData] = useState(null);
  const [isLoadingGetInTouch, setIsLoadingGetInTouch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    // Reset errors
    setError("");

    // Validate full name
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (formData.fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters");
      return false;
    }

    // Validate email
    if (!formData.emailAddress.trim()) {
      setError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress.trim())) {
      setError("Please provide a valid email address");
      return false;
    }

    // Validate phone number (if provided)
    if (formData.phoneNumber.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        setError("Please provide a valid phone number");
        return false;
      }
    }

    // Validate subject (if provided)
    if (formData.subject.trim() && formData.subject.trim().length > 200) {
      setError("Subject cannot exceed 200 characters");
      return false;
    }

    // Validate message
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters");
      return false;
    }
    if (formData.message.trim().length > 2000) {
      setError("Message cannot exceed 2000 characters");
      return false;
    }

    return true;
  };

  // Fetch Get In Touch data on component mount
  useEffect(() => {
    const fetchGetInTouch = async () => {
      try {
        setIsLoadingGetInTouch(true);
        const response = await getGetInTouch();
        if (response.success && response.data) {
          setGetInTouchData(response.data);
        }
      } catch (err) {
        // Silently fail - will use fallback/default values
        console.error('Failed to fetch Get In Touch data:', err);
      } finally {
        setIsLoadingGetInTouch(false);
      }
    };

    fetchGetInTouch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await createContact(
        formData.fullName,
        formData.emailAddress,
        formData.phoneNumber,
        formData.subject,
        formData.message
      );
      
      setSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "Failed to submit contact enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#f8f5f0] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span>Contact Us</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line">
              Send Message
            </h3>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Contact enquiry submitted successfully! We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#aa8453]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Email: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#aa8453]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#aa8453]"
                  placeholder="(optional)"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#aa8453]"
                  placeholder="(optional)"
                  maxLength={200}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message: <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#aa8453] resize-none"
                  required
                  maxLength={2000}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/2000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`default-btn px-4 py-2 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line">
              Get In Touch
            </h3>
            
            {isLoadingGetInTouch ? (
              <div className="text-sm text-gray-600 mb-6">
                Loading contact information...
              </div>
            ) : (
              <>
                {getInTouchData?.title && (
                  <p className="text-sm text-gray-600 mb-6 tracking-wider">
                    {getInTouchData.title}
                  </p>
                )}

                <div className="space-y-5 text-sm text-gray-700">
                  {getInTouchData?.officeAddress && (
                    <div>
                      <h6 className="font-semibold text-lg mb-3 text-black">
                        Office Address :
                      </h6>
                      <p className="tracking-wider">
                        {getInTouchData.officeAddress}
                      </p>
                    </div>
                  )}

                  {getInTouchData?.contactNumbers && getInTouchData.contactNumbers.length > 0 && (
                    <div>
                      <h6 className="font-semibold text-lg mb-3 text-black">
                        Contact Number :
                      </h6>
                      <p className="tracking-wider">
                        {getInTouchData.contactNumbers.join(', ')}
                      </p>
                    </div>
                  )}

                  {getInTouchData?.emailAddresses && getInTouchData.emailAddresses.length > 0 && (
                    <div>
                      <h6 className="font-semibold text-lg mb-3 text-black">
                        Email Address :
                      </h6>
                      <p className="tracking-wider">
                        {getInTouchData.emailAddresses.join(', ')}
                      </p>
                    </div>
                  )}

                  {getInTouchData?.careerInfo && (
                    <div>
                      <h6 className="font-semibold text-lg mb-3 text-black">
                        Career Info
                      </h6>
                      <p className="tracking-wider">
                        {getInTouchData.careerInfo.split(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/).map((part, index) => {
                          // Check if this part is an email address
                          const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part);
                          return isEmail ? (
                            <span key={index} className="text-[#aa8453]">{part}</span>
                          ) : (
                            <span key={index}>{part}</span>
                          );
                        })}
                      </p>
                    </div>
                  )}

                  {/* Fallback to default values if no data is available */}
                  {!getInTouchData && (
                    <>
                      <div>
                        <h6 className="font-semibold text-lg mb-3 text-black">
                          Office Address :
                        </h6>
                        <p className="tracking-wider">
                          Floor 15, Tower X2, Cluster X, Jumeirah Lakes Towers, Dubai,
                          UAE. P.O. Box 391150
                        </p>
                      </div>

                      <div>
                        <h6 className="font-semibold text-lg mb-3 text-black">
                          Contact Number :
                        </h6>
                        <p className="tracking-wider">
                          (+91) 9090909090, (+91) 9876543210
                        </p>
                      </div>

                      <div>
                        <h6 className="font-semibold text-lg mb-3 text-black">
                          Email Address :
                        </h6>
                        <p className="tracking-wider">
                          Info@mealplans.com, support@mealplans.com
                        </p>
                      </div>

                      <div>
                        <h6 className="font-semibold text-lg mb-3 text-black">
                          Career Info
                        </h6>
                        <p className="tracking-wider">
                          If you're interested in employment opportunities at Unicoder,
                          please email us:
                          <br />
                          <span className="text-[#aa8453]">support@mealplans.com</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
