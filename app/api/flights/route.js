import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbconnect";
import Flight from "../../../lib/models/Flight";
import imagekit from "../../../lib/imagekit";

// ✅ Fetch all flights
export async function GET() {
  try {
    await connectDB();
    const flights = await Flight.find().sort({ createdAt: -1 });
    return NextResponse.json(flights);
  } catch (error) {
    console.error("GET Flights Error:", error);
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}

// ✅ Create a new flight
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const file = formData.get("file");
    const airline = formData.get("airline");
    const source = formData.get("source");
    const destination = formData.get("destination");
    const price = formData.get("price");
    const duration = formData.get("duration");

    let imageUrl = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "bharat_yatra/Flights",
      });
      imageUrl = uploadResponse.url;
    }

    const flight = await Flight.create({
      airline,
      source,
      destination,
      price,
      duration,
      image: imageUrl,
    });

    return NextResponse.json(flight);
  } catch (error) {
    console.error("POST Flights Error:", error);
    return NextResponse.json({ error: "Failed to upload flight" }, { status: 500 });
  }
}

