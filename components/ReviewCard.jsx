"use client";
import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-(--bg-color) rounded-md shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-orange-100 flex gap-5 items-center text-left">
      <img
        src={review.image}
        alt={review.name}
        className="w-20 h-20 rounded-lg object-cover border-2 border-yellow-400"
      />
      <div>
        <h3 className="text-xl font-semibold text-orange-600">{review.name}</h3>
        <div className="flex justify-left ">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 text-sm">{review.content}</p>
      </div>
    </div>
  );
}
