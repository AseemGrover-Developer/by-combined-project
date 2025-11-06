import { connectDB } from "../../../../lib/dbconnect.js";
import Blog from "../../../../lib/models/Blog.js";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { title, content, imageUrl } = await req.json();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, imageUrl },
      { new: true }
    );

    if (!updatedBlog)
      return Response.json({ error: "Blog not found" }, { status: 404 });

    return Response.json(updatedBlog);
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted)
      return Response.json({ error: "Blog not found" }, { status: 404 });

    return Response.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
