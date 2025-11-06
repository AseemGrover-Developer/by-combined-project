import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbconnect";
import Flight from "../../../lib/models/Flight";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

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
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const uploadResponse = await imagekit.upload({
        file: base64,
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

// ✅ Delete a flight by ID
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    await Flight.findByIdAndDelete(id);
    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error("DELETE Flights Error:", error);
    return NextResponse.json({ error: "Failed to delete flight" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { connectDB } from "../../../lib/dbconnect";
// import Flight from "../../../lib/models/Flight";
// import imagekit from "../../../lib/imagekit";

// export async function GET() {
//   await connectDB();
//   const flights = await Flight.find();
//   return NextResponse.json(flights);
// }

// export async function POST(req) {
//   await connectDB();
//   try {
//     const formData = await req.formData();
//     const file = formData.get("image");
//     const airline = formData.get("airline");
//     const source = formData.get("source");
//     const destination = formData.get("destination");
//     const price = formData.get("price");
//     const duration = formData.get("duration");

//     // Convert image to Base64
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64 = buffer.toString("base64");

//     // Upload to ImageKit
//     const uploadRes = await imagekit.upload({
//       file: base64,
//       fileName: `${airline}-${Date.now()}.jpg`,
//       folder: "/Flights",
//     });

//     // Save to MongoDB
//     const newFlight = await Flight.create({
//       airline,
//       source,
//       destination,
//       price,
//       duration,
//       image: uploadRes.url,
//     });

//     return NextResponse.json({ success: true, flight: newFlight });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
//   }
// }
