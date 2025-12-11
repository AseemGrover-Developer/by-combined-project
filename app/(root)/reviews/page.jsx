"use client";
import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    content: "",
    rating: 5,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  // ✅ Upload image to ImageKit
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bharat_yatra_uploads"); // optional if you set presets in ImageKit dashboard

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setReviews([data.review, ...reviews]);
      setFormData({ name: "", image: "", content: "", rating: 5 });
      setShowForm(false);
    }
  };

  return (
    <section className="min-h-screen py-16">
        <h1 className="heading">
          Traveller Reviews
        </h1>
      <div className="text-center px-5">

        {/* Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-orange-100 shadow-md rounded-2xl p-6 mb-10 w-full text-left"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            {/* ✅ File Upload */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Upload Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700"
              />
              {uploading && (
                <p className="text-orange-500 text-sm mt-2">Uploading...</p>
              )}
              {formData.image && !uploading && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mt-3 border-2 border-yellow-400 object-cover"
                />
              )}
            </div>

            <textarea
              placeholder="Your Review"
              className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="4"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            ></textarea>

            <label className="block mb-2 text-gray-700 font-medium">
              Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-20 mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold hover:opacity-90 transition"
              disabled={uploading}
            >
              {uploading ? "Please wait..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? reviews : reviews.slice(0, 6)).map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>

        {/* Add Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          {showForm ? "Close Form" : "Give a Review"}
        </button>

        {/* View More Button */}
        {reviews.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        )}
      </div>
    </section>
  );
}
