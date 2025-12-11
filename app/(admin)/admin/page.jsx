// app/admin/page.jsx
"use client";
import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    {
      name: "Blogs",
      desc: "Manage and upload blogs to website categories and state pages.",
      link: "/admin/blogs",
    },
    {
      name: "Slides",
      desc: "Upload new homepage slides and manage existing ones.",
      link: "/admin/slides",
    },
    {
      name: "Packages",
      desc: "Add and update tour packages for customers.",
      link: "/admin/packages",
    },
    {
      name: "Hotels",
      desc: "Manage and add hotel details for users.",
      link: "/admin/hotels",
    },
    {
      name: "Flights",
      desc: "Add and manage flight listings and deals.",
      link: "/admin/flights",
    },
    {
      name: "Guides",
      desc: "Manage travel guides and assign them to destinations.",
      link: "/admin/guides",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((item) => (
          <div
            key={item.name}
            className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
            <Link
              href={item.link}
              className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Manage {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
