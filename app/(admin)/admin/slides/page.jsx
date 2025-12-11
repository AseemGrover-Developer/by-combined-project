// app/admin/slides/page.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image

export default function SlidesAdmin() {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  // ✅ Fetch all slides (Logic unchanged)
  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/slides");
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      console.error("❌ Error fetching slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // ✅ Upload new slide (Logic unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const res = await fetch("/api/slides", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("✅ Slide Uploaded!");
      setForm({ title: "", description: "", image: null });
      e.target.reset(); // Reset file input
      fetchSlides();
    } else {
      alert("❌ Failed to upload slide");
    }
  };

  // ✅ Delete slide (Logic unchanged)
  const handleDelete = async (id) => {
    if (!confirm("🗑️ Delete this slide?")) return;
    const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchSlides();
    } else {
      alert("❌ Failed to delete slide");
    }
  };

  return (
    // ✅ Styled for B&W theme
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold text-black mb-6">Manage Slides</h1>

      {/* ✅ Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-10 max-w-2xl mx-auto space-y-4"
      >
        <h2 className="text-xl font-semibold text-black mb-4">Add Slide</h2>
        <input
          type="text"
          placeholder="Slide Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          required
        />
        <textarea
          placeholder="Slide Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none h-24 resize-vertical"
          required
        ></textarea>
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
          Upload Slide
        </button>
      </form>

      {/* ✅ Slide Preview Cards */}
      <h2 className="text-2xl font-bold text-black mb-4">All Slides</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow"
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-bold text-black">{slide.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{slide.description}</p>
            
            {/* ✅ Added Delete Button */}
            <button
              onClick={() => handleDelete(slide._id)}
              className="mt-4 bg-red-600 text-white hover:bg-red-700 px-4 py-1.5 rounded-md text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// // "use client";
// // import { useEffect, useState } from "react";

// // export default function ManageSlides() {
// //   const [slides, setSlides] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchSlides = async () => {
// //     const res = await fetch("/api/slides");
// //     const data = await res.json();
// //     setSlides(data);
// //     setLoading(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData(e.target);
// //     const res = await fetch("/api/slides", { method: "POST", body: formData });
// //     if (res.ok) {
// //       alert("✅ Slide uploaded successfully!");
// //       e.target.reset();
// //       fetchSlides();
// //     } else {
// //       alert("❌ Failed to upload slide");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //   if (!confirm("Are you sure you want to delete this slide?")) return;
// //   try {
// //     const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
// //     const data = await res.json();

// //     if (!res.ok) throw new Error(data.error || "Delete failed");

// //     alert("✅ Slide deleted successfully");
// //     setSlides((prev) => prev.filter((s) => s._id !== id));
// //   } catch (err) {
// //     console.error("❌ Delete error:", err);
// //     alert("Failed to delete slide");
// //   }
// // };


// //   useEffect(() => {
// //     fetchSlides();
// //   }, []);

// //   // if (loading) return <p className="p-6">Loading slides...</p>;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Manage Slides</h1>

// //       {/* Upload Form */}
// //       <form
// //         onSubmit={handleSubmit}
// //         className="space-y-3 mb-6 border p-4 rounded-lg shadow-md bg-gray-50"
// //       >
// //         <input
// //           name="title"
// //           placeholder="Title"
// //           required
// //           className="border w-full p-2 rounded"
// //         />
// //         <textarea
// //           name="description"
// //           placeholder="Description"
// //           className="border w-full p-2 rounded"
// //         />
// //         <input
// //           type="file"
// //           name="image"
// //           accept="image/*"
// //           required
// //           className="border w-full p-2 rounded"
// //         />
// //         <button
// //           type="submit"
// //           className="bg-green-600 text-white px-4 py-2 rounded"
// //         >
// //           Upload Slide
// //         </button>
// //       </form>

// //       {/* Slides List */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {slides.map((slide) => (
// //           <div key={slide._id} className="border rounded-lg p-3 shadow">
// //             <img
// //               src={slide.imageUrl}
// //               alt={slide.title}
// //               className="w-full h-40 object-cover rounded"
// //             />
// //             <h2 className="font-bold mt-2">{slide.title}</h2>
// //             <p className="text-sm">{slide.description}</p>
// //             <button
// //               onClick={() => handleDelete(slide._id)}
// //               className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";

// export default function SlidesAdmin() {
//   const [slides, setSlides] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   // ✅ Fetch all slides
//   const fetchSlides = async () => {
//     try {
//       const res = await fetch("/api/slides");
//       const data = await res.json();
//       setSlides(data);
//     } catch (error) {
//       console.error("❌ Error fetching slides:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSlides();
//   }, []);

//   // ✅ Upload new slide
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     const res = await fetch("/api/slides", {
//       method: "POST",
//       body: formData,
//     });

//     if (res.ok) {
//       alert("✅ Slide Uploaded!");
//       setForm({ title: "", description: "", image: null });
//       fetchSlides();
//     } else {
//       alert("❌ Failed to upload slide");
//     }
//   };

//   // ✅ Delete slide
//   const handleDelete = async (id) => {
//     if (!confirm("🗑️ Delete this slide?")) return;
//     const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
//     if (res.ok) {
//       fetchSlides();
//     } else {
//       alert("❌ Failed to delete slide");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d1117] text-white p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">🖼️ Manage Slides</h1>

//       {/* ✅ Upload Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#161b22] p-6 rounded-2xl shadow-xl mb-10 max-w-2xl mx-auto space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Slide Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         />
//         <textarea
//           placeholder="Slide Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="w-full p-2 rounded bg-transparent border border-gray-600"
//           required
//         ></textarea>
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
//           Upload Slide
//         </button>
//       </form>

//       {/* ✅ Slide Preview Cards */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {slides.map((slide) => (
//           <div
//             key={slide._id}
//             className="bg-[#161b22] p-4 rounded-xl shadow-lg relative group hover:scale-105 transition-transform"
//           >
//             <img
//               src={slide.imageUrl}
//               alt={slide.title}
//               className="w-full h-48 object-cover rounded-lg mb-3"
//             />
//             <h2 className="text-xl font-bold">{slide.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{slide.description}</p>

           
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
