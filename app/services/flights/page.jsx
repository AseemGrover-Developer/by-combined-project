"use client";
import { useEffect, useState } from "react";

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    try {
      const res = await fetch("/api/flights");
      if (!res.ok) throw new Error("Failed to fetch flights");
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("❌ Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-orange-500 text-xl">
        ✈️ Loading flights...
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-gray-400 text-lg">
        No flights available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="heading">
        Available Flights
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 border border-gray-800"
          >
            <img
              src={flight.image}
              alt={flight.airline}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-orange-400">
                {flight.airline}
              </h2>
              <p className="mt-2 text-gray-300">
                {flight.source} → {flight.destination}
              </p>
              {flight.duration && (
                <p className="text-gray-400 text-sm mt-1">
                  Duration: {flight.duration}
                </p>
              )}
              <p className="text-orange-500 font-bold mt-3 text-lg">
                ₹{flight.price}
              </p>
              <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
