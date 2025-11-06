"use client";
import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-[#111] text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="h-48 sm:h-56 md:h-60 overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-36">
        <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">{blog.title}</h2>
        <p className="text-gray-400 text-sm line-clamp-2 mt-2">
          {blog.description}
        </p>
        <Link
          href={`/blogs/${encodeURIComponent(blog.title.toLowerCase().replace(/\s+/g, "-"))}`}
          className="mt-3 text-orange-500 hover:text-orange-400 text-sm font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
