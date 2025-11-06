// app/admin/blogs/page.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image for better optimization

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Update preview image when form.image changes
  useEffect(() => {
    if (form.image instanceof File) {
      setPreviewImage(URL.createObjectURL(form.image));
    } else if (typeof form.image === "string") {
      setPreviewImage(form.image);
    } else {
      setPreviewImage(null);
    }
  }, [form.image]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  // Upload image to ImageKit (Logic unchanged)
  const uploadToImageKit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  // Handle Create or Update (Logic unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = form.image;
      if (form.image instanceof File) {
        imageUrl = await uploadToImageKit(form.image);
      }
      const method = editingBlog ? "PUT" : "POST";
      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          imageUrl,
        }),
      });
      if (res.ok) {
        fetchBlogs();
        setForm({ title: "", content: "", image: null });
        setEditingBlog(null);
        setPreviewImage(null);
      } else {
        console.error("Error saving blog");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  // Handle Delete (Logic unchanged)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Handle Edit (Logic unchanged)
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      image: blog.imageUrl, // Set image URL for preview
    });
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingBlog(null);
    setForm({ title: "", content: "", image: null });
    setPreviewImage(null);
  };

  return (
    // ✅ Removed min-h-screen and bg-gray-100
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">
        {editingBlog ? "Edit Blog" : "Add New Blog"}
      </h1>

      {/* ✅ Blog Form - Styled for B&W theme */}
        <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-10 space-y-4 max-w-2xl mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            placeholder="Blog Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md h-32 text-black bg-white focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
          />
        </div>

        {/* ✅ Image Preview */}
        {previewImage && (
          <div className="mt-4">
            <Image
              src={previewImage}
              alt="Preview"
              width={200}
              height={100}
              className="w-full h-48 object-cover rounded-md border border-gray-200"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
          </button>
          {editingBlog && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-white hover:bg-gray-100 border border-gray-300 text-black px-6 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ Blog List */}
      <h2 className="text-2xl font-bold text-black mb-4">All Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden flex flex-col"
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-black mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                  {blog.content}
                </p>
                {/* ✅ Added Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-white text-black border border-gray-300 hover:bg-gray-100 px-4 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 text-white hover:bg-red-700 px-4 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";

// export default function AdminBlogsPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     image: null,
//   });
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch blogs on load
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await fetch("/api/blogs");
//       const data = await res.json();
//       setBlogs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     }
//   };

//   // Upload image to ImageKit
//   const uploadToImageKit = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     return data.url;
//   };

//   // Handle Create or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imageUrl = form.image;
//       if (form.image instanceof File) {
//         imageUrl = await uploadToImageKit(form.image);
//       }

//       const method = editingBlog ? "PUT" : "POST";
//       const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: form.title,
//           content: form.content,
//           imageUrl,
//         }),
//       });

//       if (res.ok) {
//         fetchBlogs();
//         setForm({ title: "", content: "", image: null });
//         setEditingBlog(null);
//       } else {
//         console.error("Error saving blog");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }

//     setLoading(false);
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
//       if (res.ok) fetchBlogs();
//     } catch (err) {
//       console.error("Error deleting blog:", err);
//     }
//   };

//   // Handle Edit
//   const handleEdit = (blog) => {
//     setEditingBlog(blog);
//     setForm({
//       title: blog.title,
//       content: blog.content,
//       image: blog.imageUrl,
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold mb-6">
//         {editingBlog ? "Edit Blog" : "Add New Blog"}
//       </h1>

//       {/* Blog Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-lg p-6 mb-10"
//       >
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full p-3 border mb-3 rounded"
//           required
//         />
//         <textarea
//           placeholder="Blog Content"
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//           className="w-full p-3 border mb-3 rounded h-32"
//           required
//         ></textarea>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           className="w-full p-3 border mb-3 rounded"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//         >
//           {loading
//             ? "Saving..."
//             : editingBlog
//             ? "Update Blog"
//             : "Create Blog"}
//         </button>
//       </form>

//       {/* Blog List */}
//       <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
//       {blogs.length === 0 ? (
//         <p>No blogs available.</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden"
//             >
//               <img
//                 src={blog.imageUrl}
//                 alt={blog.title}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
//                 <p className="text-gray-600 mb-3 line-clamp-3">
//                   {blog.content}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
