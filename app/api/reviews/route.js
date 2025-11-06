import { connectDB } from "@/lib/dbconnect";
import Review from "../../../lib/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const reviews = await Review.find().sort({ createdAt: -1 });
  return NextResponse.json(reviews);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newReview = new Review(body);
    await newReview.save();
    return NextResponse.json({ success: true, review: newReview });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
