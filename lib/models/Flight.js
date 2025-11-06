import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String },
    image: { type: String }, // ImageKit URL
  },
  { timestamps: true }
);

export default mongoose.models.Flight ||
  mongoose.model("Flight", FlightSchema);


// import mongoose from "mongoose";

// const FlightSchema = new mongoose.Schema({
//   airline: { type: String, required: true },
//   source: { type: String, required: true },
//   destination: { type: String, required: true },
//   price: { type: Number, required: true },
//   duration: { type: String },
//   image: { type: String, required: true }, // ImageKit URL
// });

// export default mongoose.models.Flight || mongoose.model("Flight", FlightSchema);
