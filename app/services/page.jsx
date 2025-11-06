"use client";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      name: "Tour Packages",
      description:
        "Discover curated tours and explore India's most beautiful destinations.",
      path: "/services/tours",
      color: "from-orange-500 to-yellow-400",
    },
    {
      name: "Flights",
      description:
        "Book domestic and international flights with best offers and smooth booking.",
      path: "/services/flights",
      color: "from-yellow-500 to-orange-400",
    },
    {
      name: "Guides",
      description:
        "Hire professional guides to enhance your travel experience and comfort.",
      path: "/services/guides",
      color: "from-orange-400 to-amber-400",
    },
    {
      name: "Hotels",
      description:
        "Stay at the best hotels offering comfort, safety, and affordability.",
      path: "/services/hotels",
      color: "from-amber-400 to-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Page Heading */}
      <h1 className="heading">
        Our Premium Services
      </h1>
      <div className="flex flex-col items-center justify-center">
        {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full px-5 ">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => router.push(service.path)}
            className="relative cursor-pointer rounded-md p-[2px]" 
          >
            <div className="relative bg-[#FEE5BC] rounded-md p-8 h-full flex flex-col items-center text-center border border-gray-200 shadow-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,165,0,0.3)]">
              {/* Subtle background glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-10 blur-2xl`}
              ></div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-all duration-300 z-10">
                {service.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm mb-6 z-10">
                {service.description}
              </p>

              <button
                className={`relative z-10 px-6 py-2 rounded-md font-semibold bg-gradient-to-r ${service.color} text-white shadow-md hover:opacity-90 transition`}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <p className="text">
        Experience comfort, quality, and excellence through our exclusive travel services.
      </p>
      </div>
      
    </div>
  );
}
