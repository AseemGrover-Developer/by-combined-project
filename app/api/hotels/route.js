import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbconnect.js";
import Hotel from "../../../lib/models/Hotel.js";
import imagekit from "../../../lib/imagekit.js"; // ✅ default export

// 🧠 GET: Fetch all hotels
export async function GET() {
  try {
    await connectDB();
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch hotels" }, { status: 500 });
  }
}

// 🧠 POST: Upload new hotel with image
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const location = formData.get("location");
    const description = formData.get("description");
    const price = formData.get("price");
    const rating = formData.get("rating");

    if (!file) {
      return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
    }

    // ✅ Convert to base64 for ImageKit
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const uploadRes = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}-${file.name}`,
      folder: "bharat_yatra/Hotels",
    });

    const newHotel = await Hotel.create({
      name,
      location,
      description,
      price,
      rating,
      imageUrl: uploadRes.url,
    });

    return NextResponse.json({ success: true, hotel: newHotel });
  } catch (error) {
    console.error("Error uploading hotel:", error);
    return NextResponse.json({ success: false, message: "Failed to upload hotel" }, { status: 500 });
  }
}
