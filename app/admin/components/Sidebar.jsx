// app/admin/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const path = usePathname();

  // Sidebar links — (No changes to logic)
  const links = [
    { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { key: "blogs", label: "Blogs", href: "/admin/blogs", icon: "✍️" },
    { key: "slides", label: "Slides", href: "/admin/slides", icon: "🖼️" },
    { key: "packages", label: "Tour Packages", href: "/admin/packages", icon: "🧳" },
    { key: "flights", label: "Flights", href: "/admin/flights", icon: "✈️" },
    { key: "hotels", label: "Hotels", href: "/admin/hotels", icon: "🏨" },
    { key: "guides", label: "Guides", href: "/admin/guides", icon: "🧭" },
  ];

  // close sidebar when path changes (mobile)
  useEffect(() => {
    onClose();
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* ✅ Main Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 
        bg-black border-r border-neutral-800 
        transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:sticky md:top-0 md:h-screen md:translate-x-0 md:flex-shrink-0`}
        // ✅ ^ Above: Changed to bg-black, md:sticky, md:h-screen
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-neutral-800 h-16">
          {/* ✅ Updated header text color */}
          <div className="text-lg font-semibold text-white">Admin Menu</div>
          {/* ✅ Updated close button styling */}
          <button onClick={onClose} className="md:hidden p-1 rounded-md hover:bg-neutral-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {links.map((l) => {
            const active = path?.startsWith(l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                // ✅ Updated link styles: less rounded, new active state
                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                  active
                    ? "bg-white text-black" // Active: White background, black text
                    : "text-gray-300 hover:bg-neutral-800" // Inactive
                }`}
              >
                <span className="text-lg">{l.icon}</span>
                <span className="font-medium text-sm">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-neutral-800">
          <div className="text-xs text-gray-400">Workspace</div>
          <div className="mt-1 text-sm text-gray-300">bharat-yatra</div>
        </div>
      </aside>
    </>
  );
}
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// export default function Sidebar({ isOpen = false, onClose = () => {} }) {
//   const path = usePathname();

//   // Sidebar links — add new items here to extend admin sections
//   const links = [
//     { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
//     { key: "blogs", label: "Blogs", href: "/admin/blogs", icon: "✍️" },
//     { key: "slides", label: "Slides", href: "/admin/slides", icon: "🖼️" },
//     { key: "packages", label: "Tour Packages", href: "/admin/packages", icon: "🧳" },
//     { key: "hotels", label: "Hotels", href: "/admin/hotels", icon: "🏨" },
//     { key: "guides", label: "Guides", href: "/admin/guides", icon: "🧭" },
//     // add more sections here
//   ];

//   // close sidebar when path changes (mobile)
//   useEffect(() => {
//     onClose();
//   }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <>
//       {/* Backdrop for mobile when sidebar open */}
//       <div
//         className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${
//           isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//       />

//       <aside
//         className={`fixed left-0 top-0 z-40 h-full w-72 bg-neutral-900 border-r border-neutral-800 transform transition-transform
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:top-auto md:left-auto md:h-auto`}
//       >
//         {/* Header */}
//         <div className="p-4 flex items-center justify-between border-b border-neutral-800">
//           <div className="text-sm font-semibold text-orange-400">Admin Menu</div>
//           <button onClick={onClose} className="md:hidden p-1 rounded hover:bg-neutral-800">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M6 6l12 12M6 18L18 6"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="p-4 space-y-2">
//           {links.map((l) => {
//             const active = path?.startsWith(l.href);
//             return (
//               <Link
//                 key={l.key}
//                 href={l.href}
//                 className={`flex items-center gap-3 p-3 rounded-lg transition ${
//                   active ? "bg-orange-500 text-black" : "text-gray-300 hover:bg-neutral-800"
//                 }`}
//               >
//                 <span className="text-lg">{l.icon}</span>
//                 <span className="font-medium">{l.label}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="mt-auto p-4 border-t border-neutral-800">
//           <div className="text-xs text-gray-400">Workspace</div>
//           <div className="mt-2 text-sm text-gray-300">bharat-yatra</div>
//         </div>
//       </aside>
//     </>
//   );
// }
