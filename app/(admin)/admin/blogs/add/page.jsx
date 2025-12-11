// app/admin/blogs/add/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image"; // Import Image

export default function AddBlogPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 📤 Upload image to ImageKit (Logic unchanged)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select an image");
    setUploading(true);
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: base64,
          fileName: file.name,
          folderName: "Blogs",
        }),
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
        alert("✅ Image uploaded successfully!");
      } else {
        alert("❌ Image upload failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // 📝 Submit form (create blog) (Logic unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.imageUrl) {
      return alert("Please fill all required fields!");
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("✅ Blog added successfully!");
        window.location.href = "/admin/blogs";
      } else {
        alert("❌ Failed to add blog");
      }
    } catch (err) {
      console.error("Error adding blog:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // ✅ Styled for B&W theme
    <div className="p-6 text-black max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">Add New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Content *</label>
          <textarea
            rows="6"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-2.5 rounded-md bg-white border border-gray-300 text-black focus:ring-2 focus:ring-black focus:border-black outline-none resize-vertical"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
          />
          {uploading && <p className="text-sm text-black mt-1">Uploading image...</p>}
          {form.imageUrl && (
            <Image
              src={form.imageUrl}
              alt="Preview"
              width={500}
              height={250}
              className="w-full h-48 object-cover rounded-md mt-3 border border-gray-200"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full py-2.5 rounded-md bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Saving..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";

// export default function AddBlogPage() {
//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     content: "",
//     imageUrl: "",
//   });
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // 📤 Upload image to ImageKit
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return alert("Please select an image");

//     setUploading(true);

//     const base64 = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = (err) => reject(err);
//     });

//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           file: base64,
//           fileName: file.name,
//           folderName: "Blogs",
//         }),
//       });

//       const data = await res.json();
//       if (data.url) {
//         setForm((prev) => ({ ...prev, imageUrl: data.url }));
//         alert("✅ Image uploaded successfully!");
//       } else {
//         alert("❌ Image upload failed");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 📝 Submit form (create blog)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title || !form.content || !form.imageUrl) {
//       return alert("Please fill all required fields!");
//     }

//     setSubmitting(true);

//     try {
//       const res = await fetch("/api/blogs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         alert("✅ Blog added successfully!");
//         window.location.href = "/admin/blogs";
//       } else {
//         alert("❌ Failed to add blog");
//       }
//     } catch (err) {
//       console.error("Error adding blog:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6 text-white max-w-2xl mx-auto">
//       <h1 className="text-2xl font-semibold text-orange-400 mb-4">Add New Blog</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block mb-1 text-sm text-gray-300">Title *</label>
//           <input
//             type="text"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full p-2 rounded bg-neutral-800 border border-gray-700 focus:border-orange-500 outline-none"
//             required
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block mb-1 text-sm text-gray-300">Category</label>
//           <input
//             type="text"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//             className="w-full p-2 rounded bg-neutral-800 border border-gray-700 focus:border-orange-500 outline-none"
//           />
//         </div>

//         {/* Content */}
//         <div>
//           <label className="block mb-1 text-sm text-gray-300">Content *</label>
//           <textarea
//             rows="6"
//             value={form.content}
//             onChange={(e) => setForm({ ...form, content: e.target.value })}
//             className="w-full p-2 rounded bg-neutral-800 border border-gray-700 focus:border-orange-500 outline-none resize-none"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block mb-1 text-sm text-gray-300">Upload Image *</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full text-sm text-gray-400"
//           />
//           {uploading && <p className="text-sm text-orange-400 mt-1">Uploading image...</p>}
//           {form.imageUrl && (
//             <img
//               src={form.imageUrl}
//               alt="Preview"
//               className="w-full h-48 object-cover rounded mt-3 border border-gray-700"
//             />
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 disabled:opacity-50"
//         >
//           {submitting ? "Saving..." : "Add Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }
