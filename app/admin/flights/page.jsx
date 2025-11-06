// app/admin/flights/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState([]);
  
  // --- Form State (Merged from FlightUploadForm) ---
  const [form, setForm] = useState({
    airline: "",
    source: "",
    destination: "",
    price: "",
    duration: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  // ---------------------------------------------------

  // --- Form Logic (Merged from FlightUploadForm) ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      
      // ✅ This replaces the `onUpload` prop call
      setFlights((prevFlights) => [data, ...prevFlights]); 
      
      setForm({ airline: "", source: "", destination: "", price: "", duration: "", file: null });
      e.target.reset(); // Reset file input
      alert("✅ Flight uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error uploading flight");
    } finally {
      setLoading(false);
    }
  };
  // -------------------------------------------------

  // --- Page Logic (From original flights/page.jsx) ---
  const fetchFlights = async () => {
    const res = await fetch("/api/flights");
    const data = await res.json();
    setFlights(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this flight?")) return;
    try {
      const res = await fetch("/api/flights", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setFlights((prev) => prev.filter((f) => f._id !== id));
        alert("🗑️ Flight deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete flight");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);
  // ---------------------------------------------------

  return (
    // ✅ Main page container
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold text-black mb-6">
        Manage Flights
      </h1>

      {/* ✅ Restyled Form (Merged) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-10 max-w-2xl mx-auto space-y-4"
      >
        <h2 className="text-xl font-semibold text-black text-left mb-4">Upload New Flight ✈️</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="airline"
            type="text"
            placeholder="Airline"
            value={form.airline}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
          <input
            name="duration"
            type="text"
            placeholder="Duration (e.g. 2h 30m)"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="source"
            type="text"
            placeholder="Source"
            value={form.source}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
          <input
            name="destination"
            type="text"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
        </div>
        
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
        />

        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-md transition-colors font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Flight"}
        </button>
      </form>
      {/* End of Merged Form */}

      {/* ✅ Flights List (Restyled) */}
      <div className="border-t border-gray-200 mt-10 pt-6">
        <h2 className="text-2xl font-bold text-black mb-4">All Flights</h2>
        {flights.length === 0 ? (
           <p className="text-center text-gray-500">No flights uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
              <div key={flight._id} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <Image
                  src={flight.image}
                  alt={flight.airline}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black">{flight.airline}</h2>
                  <p className="text-gray-600">{flight.source} → {flight.destination}</p>
                  <p className="text-black font-bold mt-2 text-lg">₹{flight.price}</p>
                  <button
                    onClick={() => handleDelete(flight._id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import FlightUploadForm from "../components/FlightUploadForm";

// export default function AdminFlightsPage() {
//   const [flights, setFlights] = useState([]);

//   const fetchFlights = async () => {
//     const res = await fetch("/api/flights");
//     const data = await res.json();
//     setFlights(data);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this flight?")) return;
//     try {
//       const res = await fetch("/api/flights", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       if (res.ok) {
//         setFlights((prev) => prev.filter((f) => f._id !== id));
//         alert("🗑️ Flight deleted successfully!");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("❌ Failed to delete flight");
//     }
//   };

//   useEffect(() => {
//     fetchFlights();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <h1 className="text-4xl text-center text-orange-500 font-bold mb-10">
//         ✈️ Admin Flight Manager
//       </h1>

//       <FlightUploadForm onUpload={(newFlight) => setFlights([newFlight, ...flights])} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
//         {flights.map((flight) => (
//           <div key={flight._id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
//             <img src={flight.image} alt={flight.airline} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-orange-400">{flight.airline}</h2>
//               <p className="text-gray-300">{flight.source} → {flight.destination}</p>
//               <p className="text-orange-500 font-bold mt-2">₹{flight.price}</p>
//               <button
//                 onClick={() => handleDelete(flight._id)}
//                 className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-md"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";

// export default function AdminFlightsPage() {
//   const [flights, setFlights] = useState([]);
//   const [form, setForm] = useState({
//     airline: "",
//     source: "",
//     destination: "",
//     price: "",
//     duration: "",
//     image: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const fetchFlights = async () => {
//     const res = await fetch("/api/flights");
//     const data = await res.json();
//     setFlights(data || []);
//   };

//   useEffect(() => {
//     fetchFlights();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setForm({ ...form, image: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(form).forEach((key) => formData.append(key, form[key]));

//     const res = await fetch("/api/flights", {
//       method: "POST",
//       body: formData,
//     });

//     setLoading(false);
//     if (res.ok) {
//       alert("✈️ Flight added successfully!");
//       setForm({
//         airline: "",
//         source: "",
//         destination: "",
//         price: "",
//         duration: "",
//         image: null,
//       });
//       fetchFlights();
//     } else {
//       alert("Failed to add flight.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin - Manage Flights</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-5 rounded-2xl"
//       >
//         <input
//           name="airline"
//           placeholder="Airline Name"
//           value={form.airline}
//           onChange={handleChange}
//           required
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <input
//           name="source"
//           placeholder="Source"
//           value={form.source}
//           onChange={handleChange}
//           required
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <input
//           name="destination"
//           placeholder="Destination"
//           value={form.destination}
//           onChange={handleChange}
//           required
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <input
//           name="duration"
//           placeholder="Duration (e.g. 2h 30m)"
//           value={form.duration}
//           onChange={handleChange}
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <input
//           name="image"
//           type="file"
//           accept="image/*"
//           onChange={handleChange}
//           required
//           className="p-3 rounded-md bg-gray-800 text-white"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="col-span-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition"
//         >
//           {loading ? "Uploading..." : "Add Flight"}
//         </button>
//       </form>

//       {/* Flight list */}
//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {flights.map((f) => (
//           <div
//             key={f._id}
//             className="bg-gray-800 rounded-xl overflow-hidden shadow-md"
//           >
//             <img
//               src={f.image}
//               alt={f.airline}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 text-white">
//               <h2 className="text-lg font-semibold">{f.airline}</h2>
//               <p className="text-sm text-gray-400">
//                 {f.source} → {f.destination}
//               </p>
//               <p className="text-sm mt-1">{f.duration}</p>
//               <p className="text-orange-400 font-bold mt-2">₹{f.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
