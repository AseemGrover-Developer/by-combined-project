// app/api/guides/route.js
import { connectDB } from "../../../lib/dbconnect";
import Guide from "../../../lib/models/Guide";
import { imagekit } from "../../../lib/imagekit";

export async function GET() {
  try {
    await connectDB();
    const guides = await Guide.find().sort({ createdAt: -1 });
    return Response.json(guides);
  } catch (error) {
    return Response.json({ message: "Error fetching guides", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const location = formData.get("location");
    const experience = formData.get("experience");
    const contact = formData.get("contact");

    let imageUrl = "";

    if (file && typeof file === "object") {
      const buffer = await file.arrayBuffer();
      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "Guides",
      });
      imageUrl = uploadRes.url;
    }

    const guide = new Guide({
      name,
      location,
      experience,
      contact,
      image: imageUrl,
    });

    await guide.save();
    return Response.json({ message: "Guide added successfully!" });
  } catch (error) {
    return Response.json({ message: "Error adding guide", error }, { status: 500 });
  }
}
