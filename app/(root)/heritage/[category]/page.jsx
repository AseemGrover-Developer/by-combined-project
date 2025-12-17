// /app/heritage/[category]/page.jsx

import SiteCard from "@/components/SiteCard";
import { heritageDataMap } from "@/lib/heritage-data";
import { notFound } from "next/navigation";

// 'params' is passed as a prop, but in some concurrent
// rendering modes, it can be a Promise.
export default async function CategoryPage({ params }) {
  
  // --- THIS IS THE FIX ---
  // The error message is literal: you must await the params
  // promise to get the resolved object *before* destructuring.
  const resolvedParams = await params;
  const { category } = resolvedParams;
  // --- END FIX ---


  console.log("--- DEBUGGING ---");
  // This will now correctly log 'ancient-sites' (or whichever category)
  console.log("Category from URL:", category);

  const categoryInfo = heritageDataMap[category];
  console.log("Data found in map:", categoryInfo ? "Found" : "Not Found");

  // This check will now work
  if (!categoryInfo) {
    notFound();
  }

  // Await the data by calling the dynamic import function
  const data = await categoryInfo.getData();
  const title = categoryInfo.title;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-16">
      <div className="text-center p-12 bg-[#ff7f00] text-white shadow-md">
        <div className="mt-5">
          <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-lg">Explore India’s UNESCO World Heritage marvels</p>
        </div>
      </div>

      <div className="w-full mt-12">
        {data.length > 0 ? (
          data.map((site, index) => (
            <SiteCard
              key={index}
              site={site}
              reverse={index % 2 !== 0} 
            />
          ))
        ) : (
          <div className="text-center text-gray-600">
            <h2 className="text-2xl font-semibold">No sites found.</h2>
            <p>Check back later for updates in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}