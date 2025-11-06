import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbconnect";
import Hotel from "../../../../lib/models/Hotel";
import imagekit from "../../../../lib/imagekit";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const formData = await req.formData();

    const updateData = {
      name: formData.get("name"),
      location: formData.get("location"),
      price: formData.get("price"),
      description: formData.get("description"),
    };

    const file = formData.get("image");
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "Hotels",
      });
      updateData.imageUrl = uploadRes.url;
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, updatedHotel });
  } catch (error) {
    console.error("Error updating hotel:", error);
    return NextResponse.json({ success: false, message: "Error updating hotel" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    await Hotel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json({ success: false, message: "Error deleting hotel" }, { status: 500 });
  }
}
