import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Package from "@/lib/models/Package";
import imagekit from "@/lib/imagekit";

// ✅ GET All Packages
export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find().sort({ createdAt: -1 });
    return NextResponse.json(packages);
  } catch (err) {
    console.error("❌ Error fetching packages:", err);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// ✅ POST New Package
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const location = formData.get("location");
    const duration = formData.get("duration");
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert Blob → Buffer → Base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: `package_${Date.now()}.jpg`,
      folder: "bharat_yatra/TourPackages",
    });

    const newPackage = await Package.create({
      title,
      description,
      price,
      location,
      duration,
      imageUrl: uploadResponse.url,
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("❌ Package Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload package" }, { status: 500 });
  }
}
