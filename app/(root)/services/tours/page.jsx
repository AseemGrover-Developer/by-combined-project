"use client";
import { useEffect, useState } from "react";

export default function ToursPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data);
    })();
  }, []);

  return (
    <div className="min-h-screen text-gray-900 p-8">
      <h1 className="heading">Explore Our Tour Packages</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={pkg.imageUrl}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold">{pkg.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{pkg.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="font-semibold text-orange-600">₹{pkg.price}</span>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
