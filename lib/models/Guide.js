// lib/models/Guide.js
import mongoose from "mongoose";

const GuideSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    experience: String,
    contact: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Guide || mongoose.model("Guide", GuideSchema);
