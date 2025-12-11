// app/admin/packages/page.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "", // Set to empty string
    location: "",
    duration: "",
    image: null,
  });

  // Logic functions (unchanged)
  const fetchPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const res = await fetch("/api/packages", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("✅ Package Uploaded!");
      setForm({ title: "", description: "", price: "", location: "", duration: "", image: null });
      e.target.reset(); // Reset file input
      fetchPackages();
    } else {
      alert("❌ Failed to upload package");
    }
  };

  return (
    // ✅ Styled for B&W theme
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold text-black mb-6">Manage Tour Packages</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-10 max-w-2xl mx-auto space-y-4"
      >
        <h2 className="text-xl font-semibold text-black mb-4">Add Package</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none h-24 resize-vertical"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g. 5 Days / 4 Nights)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 p-2.5 rounded-md font-semibold transition-colors"
        >
          Upload Package
        </button>
      </form>

      {/* ✅ Package List */}
      <h2 className="text-2xl font-bold text-black mb-4">All Packages</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow"
          >
            <Image
              src={pkg.imageUrl}
              alt={pkg.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-bold text-black">{pkg.title}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{pkg.description}</p>
            <p className="mt-2 font-semibold text-black text-lg">₹{pkg.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              📍 {pkg.location} | ⏱️ {pkg.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";

// export default function PackagesAdmin() {
//   const [packages, setPackages] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: Number,
//     location: "",
//     duration: "",
//     image: null,
//   });

//   // Fetch all packages
//   const fetchPackages = async () => {
//     const res = await fetch("/api/packages");
//     const data = await res.json();
//     setPackages(data);
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // Upload new package
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     const res = await fetch("/api/packages", {
//       method: "POST",
//       body: formData,
//     });

//     if (res.ok) {
//       alert("✅ Package Uploaded!");
//       setForm({ title: "", description: "", price: "", location: "", duration: "", image: null });
//       fetchPackages();
//     } else {
//       alert("❌ Failed to upload package");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d1117] text-white p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">🧳 Manage Tour Packages</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#161b22] p-6 rounded-2xl shadow-xl mb-10 max-w-2xl mx-auto space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         ></textarea>
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={form.location}
//           onChange={(e) => setForm({ ...form, location: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Duration (e.g. 5 Days / 4 Nights)"
//           value={form.duration}
//           onChange={(e) => setForm({ ...form, duration: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           className="w-full p-2 bg-[#0d1117] border border-gray-600 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-orange-500 hover:bg-orange-600 p-2 rounded font-semibold transition"
//         >
//           Upload Package
//         </button>
//       </form>

//       <div className="grid md:grid-cols-3 gap-6">
//         {packages.map((pkg) => (
//           <div
//             key={pkg._id}
//             className="bg-[#161b22] p-4 rounded-xl shadow-lg relative group hover:scale-105 transition-transform"
//           >
//             <img
//               src={pkg.imageUrl}
//               alt={pkg.title}
//               className="w-full h-48 object-cover rounded-lg mb-3"
//             />
//             <h2 className="text-xl font-bold">{pkg.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{pkg.description}</p>
//             <p className="mt-2 font-semibold text-orange-400">₹{pkg.price}</p>
//             <p className="text-sm text-gray-500">
//               📍 {pkg.location} | ⏱️ {pkg.duration}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
