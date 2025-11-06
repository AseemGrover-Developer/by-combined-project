"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs`);
        const data = await res.json();
        const found = Array.isArray(data)
          ? data.find((item) => item._id === id)
          : null;
        setBlog(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-orange-400 text-lg mt-10">
        Loading blog...
      </div>
    );

  if (!blog)
    return (
      <div className="text-center text-gray-400 mt-10">
        Blog not found.
        <button
          onClick={() => router.back()}
          className="ml-2 text-orange-400 underline"
        >
          Go back
        </button>
      </div>
    );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-orange-400 mb-4">{blog.title}</h1>
      <p className="text-gray-400 text-sm mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-gray-200 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>
    </article>
  );
}
