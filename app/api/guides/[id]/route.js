import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbconnect";
import Guide from "../../../../lib/models/Guide";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Guide.findByIdAndDelete(id);
    return NextResponse.json({ message: "Guide deleted successfully" });
  } catch (error) {
    console.error("Delete Guide Error:", error);
    return NextResponse.json({ error: "Failed to delete guide" }, { status: 500 });
  }
}
