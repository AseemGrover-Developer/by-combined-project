import { connectDB } from "../../../lib/dbconnect.js";
import Blog from "../../../lib/models/Blog.js";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { title, content, imageUrl } = await req.json();

    if (!title || !content || !imageUrl)
      return Response.json({ error: "All fields required" }, { status: 400 });

    const blog = new Blog({ title, content, imageUrl });
    await blog.save();
    return Response.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
