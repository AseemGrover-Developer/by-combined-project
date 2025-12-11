"use client";
import { useEffect, useState } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/hotels");
        const data = await res.json();
        if (data.success && Array.isArray(data.hotels)) {
          setHotels(data.hotels);
        } else {
          setError("No hotels found.");
        }
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading hotels...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="heading">
        Explore Hotels
      </h1>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-600">No hotels available yet.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hotel.name}
                </h2>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {hotel.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-orange-600 font-semibold">
                    ₹{hotel.price}/night
                  </span>
                  <span className="text-yellow-500 font-medium">
                    ⭐ {hotel.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
