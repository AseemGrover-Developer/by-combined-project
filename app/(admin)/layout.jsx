// app/admin/layout.jsx
"use client";

import { useState } from "react";
import Sidebar from "./admin/components/Sidebar";
import Navbar from "./admin/components/Navbar";

// NO SessionProvider import needed here
// NO SessionProvider wrapper needed here

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // No SessionProvider wrapper here. It's already in your root layout.
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
// // app/admin/layout.jsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";

// export default function AdminLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-black text-white transition-all duration-300 flex flex-col`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h2 className={`font-bold text-lg ${!isSidebarOpen && "hidden"}`}>
//             Admin Panel
//           </h2>
//           <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
//             ☰
//           </button>
//         </div>

//         <nav className="flex-1 mt-4 space-y-2">
//           {[
//             "dashboard",
//             "blogs",
//             "slides",
//             "packages",
//             "hotels",
//             "flights",
//             "guides",
//           ].map((item) => (
//             <Link
//               key={item}
//               href={`/admin/${item}`}
//               className="block px-4 py-2 hover:bg-gray-800 rounded transition"
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }
