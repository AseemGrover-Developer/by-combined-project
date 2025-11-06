"use client";
import { useEffect, useState } from "react";

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("/api/guides");
        const data = await res.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <h1 className="heading">
        Our Professional Guides
      </h1>

      {guides.length === 0 ? (
        <p className="text-center text-gray-500">No guides available yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="bg-amber-100 rounded-sm shadow hover:shadow-lg transition p-4 flex flex-col items-center "
            >
              {guide.image ? (
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-56 object-cover rounded-sm mb-4 bg-amber-50"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <h2 className="text-lg font-semibold">{guide.name}</h2>
              <p className="text-sm text-gray-600">{guide.location}</p>
              <p className="text-sm mt-1">{guide.experience}</p>
              <p className="text-sm text-blue-600 mt-1">{guide.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
