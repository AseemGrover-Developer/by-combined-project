// app/admin/components/AdminCard.jsx
"use client";

export default function AdminCard({ title, value, children }) {
  return (
    // ✅ Updated Card Style:
    // - White background, light border, clean shadow
    // - Less rounded (rounded-lg)
    // - Fits on the main white content area
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      {/* ✅ Icon styling */}
      <div className="text-3xl mb-3 text-black">{children}</div>
      {/* ✅ Title styling: subdued color, uppercase */}
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h3>
      {/* ✅ Value styling: large and bold */}
      <p className="text-black text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
// "use client";

// export default function AdminCard({ title, value, children }) {
//   return (
//     <div className="bg-neutral-900 p-5 rounded-2xl shadow-lg border border-neutral-800 hover:border-orange-500 transition-all duration-300">
//       <div className="text-3xl mb-3">{children}</div>
//       <h3 className="text-lg font-semibold text-orange-400">{title}</h3>
//       <p className="text-gray-300 text-xl font-bold mt-1">{value}</p>
//     </div>
//   );
// }
