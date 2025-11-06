// app/admin/hotels/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    price: "", // Set to empty string for controlled component
    rating: "", // Set to empty string
    image: null,
  });

  // Logic functions (unchanged)
  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      const res = await fetch("/api/hotels");
      const data = await res.json();
      if (data.success) setHotels(data.hotels);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.image) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    try {
      setLoading(true);
      const res = await fetch("/api/hotels", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Hotel added successfully!");
        setForm({
          name: "", location: "", description: "", price: "", rating: "", image: null,
        });
        e.target.reset(); // Reset file input
        fetchHotels();
      } else {
        alert(data.message || "Failed to upload hotel");
      }
    } catch (err) {
      console.error("Error uploading hotel:", err);
      alert("Error uploading hotel!");
    } finally {
      setLoading(false);
    }
  }

  async function deleteHotel(id) {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      const res = await fetch(`/api/hotels/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setHotels((prev) => prev.filter((hotel) => hotel._id !== id));
        alert("Hotel deleted successfully!");
      } else {
        alert(data.message || "Failed to delete hotel");
      }
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  }

  return (
    // ✅ Styled for B&W theme
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold text-black mb-8">
        Manage Hotels
      </h1>

      {/* ✅ Add Hotel Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4 mb-10"
      >
        <h2 className="text-xl font-semibold text-black mb-4">Add Hotel</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none h-24 resize-vertical"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price per night"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer sm:col-span-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Hotel"}
        </button>
      </form>

      {/* ✅ Hotel List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          All Hotels
        </h2>

        {hotels.length === 0 ? (
          <p className="text-center text-gray-600">No hotels added yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <Image
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  width={400}
                  height={200}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                  <p className="text-gray-600 mt-1 line-clamp-2 text-sm">
                    {hotel.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-black font-semibold">
                      ₹{hotel.price}
                    </span>
                    <span className="text-yellow-500 font-medium text-sm">
                      ⭐ {hotel.rating}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteHotel(hotel._id)}
                    className="w-full mt-3 bg-red-600 text-white py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm"
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

// export default function AdminHotelsPage() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     location: "",
//     description: "",
//     price: Number,
//     rating: "",
//     image: null,
//   });

//   // Fetch hotels
//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   async function fetchHotels() {
//     try {
//       const res = await fetch("/api/hotels");
//       const data = await res.json();
//       if (data.success) setHotels(data.hotels);
//     } catch (err) {
//       console.error("Error fetching hotels:", err);
//     }
//   }

//   // Handle input change
//   function handleChange(e) {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setForm((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   }

//   // Handle submit
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.image) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });

//     try {
//       setLoading(true);
//       const res = await fetch("/api/hotels", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (data.success) {
//         alert("Hotel added successfully!");
//         setForm({
//           name: "",
//           location: "",
//           description: "",
//           price: "",
//           rating: "",
//           image: null,
//         });
//         fetchHotels();
//       } else {
//         alert(data.message || "Failed to upload hotel");
//       }
//     } catch (err) {
//       console.error("Error uploading hotel:", err);
//       alert("Error uploading hotel!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Delete hotel
//   async function deleteHotel(id) {
//     if (!confirm("Are you sure you want to delete this hotel?")) return;

//     try {
//       const res = await fetch(`/api/hotels/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         setHotels((prev) => prev.filter((hotel) => hotel._id !== id));
//         alert("Hotel deleted successfully!");
//       } else {
//         alert(data.message || "Failed to delete hotel");
//       }
//     } catch (err) {
//       console.error("Error deleting hotel:", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
//         🏨 Manage Hotels
//       </h1>

//       {/* Add Hotel Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4"
//       >
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Hotel</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Hotel Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded-md w-full"
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={form.location}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded-md w-full"
//           />
//         </div>

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//           className="p-2 border rounded-md w-full h-24 resize-none"
//         />

//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//           <input
//             type="number"
//             name="price"
//             placeholder="Price per night"
//             value={form.price}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded-md"
//           />
//           <input
//             type="number"
//             name="rating"
//             placeholder="Rating (0-5)"
//             value={form.rating}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded-md"
//           />
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             required
//             className="p-2 border rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
//         >
//           {loading ? "Uploading..." : "Add Hotel"}
//         </button>
//       </form>

//       {/* Hotel List */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           All Hotels
//         </h2>

//         {hotels.length === 0 ? (
//           <p className="text-center text-gray-600">No hotels added yet.</p>
//         ) : (
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {hotels.map((hotel) => (
//               <div
//                 key={hotel._id}
//                 className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//               >
//                 <img
//                   src={hotel.imageUrl}
//                   alt={hotel.name}
//                   className="h-40 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {hotel.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">{hotel.location}</p>
//                   <p className="text-gray-600 mt-1 line-clamp-2">
//                     {hotel.description}
//                   </p>
//                   <div className="flex justify-between items-center mt-3">
//                     <span className="text-orange-600 font-semibold">
//                       ₹{hotel.price}
//                     </span>
//                     <span className="text-yellow-500 font-medium">
//                       ⭐ {hotel.rating}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => deleteHotel(hotel._id)}
//                     className="w-full mt-3 bg-red-500 text-white py-1.5 rounded-md hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
