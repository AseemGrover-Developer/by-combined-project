"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="text-center text-orange-500 text-lg mt-20 animate-pulse">
        Loading blogs...
      </div>
    );

  return (
    <section className="min-h-screen mt-10 pt-0 pb-16">
      <h1 className="heading">
        Travel & Tourism Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No blogs available</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-5">
          {blogs.map((blog) => (
            <Link
              href={`/blogs/${blog._id}`}
              key={blog._id}
              className="group bg-(--bg-color) border border-orange-100 shadow-lg rounded-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full p-1 rounded-lg h-46 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 to-yellow-100/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl"></div>

                <h2 className="text-2xl font-semibold text-orange-600 mb-3 line-clamp-1">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {blog.content}
                </p>
                <div className="text-xs text-gray-500">
                  📅 {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <button className="mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:opacity-90 transition">
                  Read More
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
