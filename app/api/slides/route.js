// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/dbconnect";
// import Slide from "@/lib/models/Slide";
// import imagekit from "@/lib/imagekit";

// // ✅ GET all slides
// export async function GET() {
//   try {
//     await connectDB();
//     const slides = await Slide.find().sort({ createdAt: -1 });
//     return NextResponse.json(slides);
//   } catch (err) {
//     console.error("❌ Error fetching slides:", err);
//     return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
//   }
// }

// // ✅ POST new slide
// export async function POST(req) {
//   try {
//     await connectDB();
//     const formData = await req.formData();

//     const title = formData.get("title");
//     const description = formData.get("description");
//     const imageFile = formData.get("image");

//     if (!title || !imageFile)
//       return NextResponse.json({ error: "Title and image required" }, { status: 400 });

//     const bytes = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadResponse = await imagekit.upload({
//       file: buffer.toString("base64"),
//       fileName: `slide_${Date.now()}.jpg`,
//       folder: "/Slides",
//     });

//     const newSlide = await Slide.create({
//       title,
//       description,
//       imageUrl: uploadResponse.url,
//     });

//     return NextResponse.json(newSlide, { status: 201 });
//   } catch (error) {
//     console.error("❌ Slide Upload Error:", error);
//     return NextResponse.json({ error: "Failed to upload slide" }, { status: 500 });
//   }
// }
// app/api/slides/route.js
import { connectDB } from "../../../lib/dbconnect";
import Slide from "../../../lib/models/Slide";
import imagekit from "../../../lib/imagekit";

// ✅ GET all slides
export async function GET() {
  try {
    await connectDB();
    const slides = await Slide.find().sort({ createdAt: -1 });
    return Response.json(slides);
  } catch (error) {
    console.error("❌ Error fetching slides:", error);
    return Response.json({ message: "Error fetching slides", error }, { status: 500 });
  }
}

// ✅ POST a new slide
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const description = formData.get("description");

    let imageUrl = "";

    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to ImageKit
      const uploadRes = await imagekit.upload({
        file: buffer.toString("base64"), // Convert buffer to base64
        fileName: file.name || `slide_${Date.now()}.jpg`,
        folder: "bharat_yatra/Slides",
      });

      imageUrl = uploadRes.url;
    }

    // Save new slide
    const slide = new Slide({
      title,
      description,
      imageUrl,
    });

    await slide.save();
    return Response.json({ message: "✅ Slide added successfully!" });
  } catch (error) {
    console.error("❌ Error adding slide:", error);
    return Response.json({ message: "Error adding slide", error }, { status: 500 });
  }
}
