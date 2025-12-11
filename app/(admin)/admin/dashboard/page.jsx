// app/admin/dashboard/page.jsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// Note: You might want to use the <AdminCard> component here
// but I've restyled the existing nav cards to match the new theme.

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      // ✅ Updated loading screen for white background
      <div className="flex justify-center items-center h-full p-10 bg-white text-black">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // session check remains the same
  if (!session) return null;

  return (
    // ✅ Main content wrapper: white background, black text
    <div className="flex-grow p-6 bg-white text-black">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">
          Welcome, {session.user?.username || "Admin"}
        </h1>
        <p className="text-gray-500">
          Select a category below to manage your site content.
        </p>
      </div>

      {/* ✅ Main Content Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example card: "Manage Blogs" */}
        {/* ✅ Updated Card Style: white bg, border, less rounded, clean shadow */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg transition-shadow hover:shadow-md">
          <h2 className="text-xl font-semibold text-black mb-2">
            Manage Blogs
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Upload, edit, and delete blogs easily from this section.
          </p>
          {/* ✅ Updated Button Style: Black & White theme */}
          <button 
          onClick={() => router.push('/admin/blogs')}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
            Go to Blogs
          </button>
        </div>

        {/* Example card: "Manage Slides" */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg transition-shadow hover:shadow-md">
          <h2 className="text-xl font-semibold text-black mb-2">
            Manage Slides
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Add or update homepage sliders.
          </p>
          <button 
          onClick={() => router.push('/admin/slides')}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
            Go to Slides
          </button>
        </div>

        {/* Example card: "Manage Tour Packages" */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg transition-shadow hover:shadow-md">
          <h2 className="text-xl font-semibold text-black mb-2">
            Manage Tour Packages
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Upload and organize your travel packages.
          </p>
          <button 
          onClick={() => router.push('/admin/packages')}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
            Go to Packages
          </button>
        </div>

        {/* app/admin/dashboard/page.jsx */}

      {/* ... (inside the <main> grid) */}

      {/* ✅ Add this card for "Manage Flights" */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg transition-shadow hover:shadow-md">
        <h2 className="text-xl font-semibold text-black mb-2">
          Manage Flights
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Upload and delete flight information.
        </p>
        <button 
        onClick={() => router.push('/admin/flights')}
        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors">
          Go to Flights
        </button>
      </div>

      {/* ... (rest of your cards) */}
      </main>
    </div>
  );
}


