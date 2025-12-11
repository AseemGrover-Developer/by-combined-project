// app/admin/guides/page.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    experience: "",
    contact: "",
    image: null,
  });

  // Logic functions (unchanged)
  const fetchGuides = async () => {
    const res = await fetch("/api/guides");
    const data = await res.json();
    setGuides(data);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("location", form.location);
    fd.append("experience", form.experience);
    fd.append("contact", form.contact);
    if (form.image) fd.append("image", form.image);

    await fetch("/api/guides", {
      method: "POST",
      body: fd,
    });

    setForm({ name: "", location: "", experience: "", contact: "", image: null });
    e.target.reset(); // Reset file input
    fetchGuides();
  };

  const deleteGuide = async (id) => {
    if (!confirm("Are you sure you want to delete this guide?")) return;
    await fetch("/api/guides", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchGuides();
  };

  return (
    // ✅ Styled for B&W theme
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold text-black mb-6">Manage Guides</h1>

      {/* ✅ Form wrapped in a card */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 shadow-sm rounded-lg p-6 mb-10 mx-auto max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Guide Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 5 years)"
            value={form.experience}
            onChange={handleChange}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer md:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2.5 px-6 rounded-md hover:bg-gray-800 transition-colors mt-4"
        >
          Add Guide
        </button>
      </form>

      {/* ✅ Guides List */}
      <h2 className="text-2xl font-bold text-black mb-4">All Guides</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {guides.length > 0 ? (
          guides.map((guide) => (
            <div
              key={guide._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col items-center text-center"
            >
              {guide.image && (
                <Image
                  src={guide.image}
                  alt={guide.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="font-bold text-lg text-black">{guide.name}</h2>
              <p className="text-sm text-gray-600">{guide.location}</p>
              <p className="text-sm text-gray-800">{guide.experience}</p>
              <p className="text-sm text-gray-800">{guide.contact}</p>
              <button
                onClick={() => deleteGuide(guide._id)}
                className="bg-red-600 text-white px-4 py-1.5 mt-3 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No guides available</p>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";

// export default function AdminGuidesPage() {
//   const [guides, setGuides] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     location: "",
//     experience: "",
//     contact: "",
//     image: null,
//   });

//   // Fetch guides
//   const fetchGuides = async () => {
//     const res = await fetch("/api/guides");
//     const data = await res.json();
//     setGuides(data);
//   };

//   useEffect(() => {
//     fetchGuides();
//   }, []);

//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   // Upload guide
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("location", form.location);
//     fd.append("experience", form.experience);
//     fd.append("contact", form.contact);
//     if (form.image) fd.append("image", form.image);

//     await fetch("/api/guides", {
//       method: "POST",
//       body: fd,
//     });

//     setForm({ name: "", location: "", experience: "", contact: "", image: null });
//     fetchGuides();
//   };

//   // Delete guide
//   const deleteGuide = async (id) => {
//     await fetch("/api/guides", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchGuides();
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Manage Guides</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         <input
//           type="text"
//           name="name"
//           placeholder="Guide Name"
//           value={form.name}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="experience"
//           placeholder="Experience (e.g. 5 years)"
//           value={form.experience}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="contact"
//           placeholder="Contact Number"
//           value={form.contact}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//         >
//           Add Guide
//         </button>
//       </form>

//       {/* Guides List */}
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
//         {guides.length > 0 ? (
//           guides.map((guide) => (
//             <div
//               key={guide._id}
//               className="border rounded-lg p-4 shadow bg-white flex flex-col items-center"
//             >
//               {guide.image && (
//                 <img
//                   src={guide.image}
//                   alt={guide.name}
//                   className="w-full h-48 object-cover rounded mb-3"
//                 />
//               )}
//               <h2 className="font-bold text-lg">{guide.name}</h2>
//               <p className="text-sm text-gray-600">{guide.location}</p>
//               <p className="text-sm">{guide.experience}</p>
//               <p className="text-sm text-blue-600">{guide.contact}</p>
//               <button
//                 onClick={() => deleteGuide(guide._id)}
//                 className="bg-red-500 text-white px-4 py-2 mt-3 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">No guides available</p>
//         )}
//       </div>
//     </div>
//   );
// }
