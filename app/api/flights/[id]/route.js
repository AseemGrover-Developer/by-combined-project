import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbconnect";
import Flight from "../../../../lib/models/Flight";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    await Flight.findByIdAndDelete(id);
    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error("DELETE Flights Error:", error);
    return NextResponse.json({ error: "Failed to delete flight" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    try {
      await connectDB();
      const { id } = params;
      const { airline, source, destination, price, duration, image } = await req.json();
  
      const updatedFlight = await Flight.findByIdAndUpdate(
        id,
        { airline, source, destination, price, duration, image },
        { new: true }
      );
  
      if (!updatedFlight)
        return NextResponse.json({ error: "Flight not found" }, { status: 404 });
  
      return NextResponse.json(updatedFlight);
    } catch (error) {
      console.error("PUT Error:", error);
      return NextResponse.json({ error: "Failed to update flight" }, { status: 500 });
    }
  }
