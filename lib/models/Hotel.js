import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
