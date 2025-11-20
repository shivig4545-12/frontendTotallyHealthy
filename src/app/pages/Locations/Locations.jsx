'use client';

import React, { useState, useEffect } from "react";
import { getRestaurantLocations } from "../../services/api/restaurantLocation";   

const Locations = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getRestaurantLocations();
        
        if (response.success && response.data && Array.isArray(response.data)) {
          // Transform API data to match component structure
          const transformedData = response.data.map((location) => ({
            title: location.name || "",
            image: location.image || "/img/locations/1.jpg", // Default image if not provided
            address: location.address || "",
            id: location._id || location.id, // Store ID for potential future use
          }));
          
          // Reverse the array to show South Heights first
          setServices(transformedData.reverse());
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant locations from API:", error);
        setError("Failed to load locations. Please try again later.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Locations
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We have branches across the UAE
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading locations...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No locations available at the moment.</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && services.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer text-center">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="group relative bg-white  overflow-hidden hover:shadow-lg transition duration-300 border border-dotted border-gray-900 rounded-lg"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">
                    {service.title}
                  </h4>
                </div>

                {/* Hidden Address (shown on hover) */}
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70 text-white flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 px-4">
                  <p className="text-sm">{service.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Locations;
