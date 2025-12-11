// app/admin/components/Navbar.jsx
"use client";

// <-- 1. Import useSession and signOut
import { useSession, signOut } from "next-auth/react";

export default function Navbar({ onToggleSidebar }) {
  // <-- 2. Get the session data
  const { data: session } = useSession();

  return (
    <header className="w-full bg-black border-b border-neutral-800 p-3 sm:p-4 flex items-center justify-between h-16">
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="md:hidden p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-white">Bharat Yatra — Admin</h1>
        </div>
      </div>

      <div className="flex items-center gap-4"> {/* <-- Increased gap slightly */}

        {/* <-- 3. Updated Profile Section */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center text-black font-bold">
            {/* Use first letter of username/email or 'A' */}
            {session?.user?.username?.[0]?.toUpperCase() || 
             session?.user?.email?.[0]?.toUpperCase() || 
             'A'}
          </div>
          <div className="hidden sm:block text-sm text-white">
            {/* Show username or email */}
            {session?.user?.username || session?.user?.email || "Admin"}
          </div>
        </div>
        
        {/* <-- 4. Added Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })} // Logs out and redirects to login
          className="px-3 py-1.5 text-sm text-white bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors"
          aria-label="Log out"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
// "use client";

// export default function Navbar({ onToggleSidebar }) {
//   return (
//     <header className="w-full bg-neutral-900 border-b border-neutral-800 p-3 sm:p-4 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* Hamburger for mobile */}
//         <button
//           onClick={onToggleSidebar}
//           aria-label="Toggle sidebar"
//           className="md:hidden p-2 rounded bg-neutral-800 hover:bg-neutral-700"
//         >
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//             <path d="M3 6h14M3 10h14M3 14h14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
//           </svg>
//         </button>

//         <div>
//           <h1 className="text-lg sm:text-xl font-semibold text-orange-400">Bharat Yatra — Admin</h1>
//           <p className="text-xs text-gray-400">Manage blogs • slides • packages • hotels • guides</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         {/* Search placeholder (non-functional) */}
//         <div className="hidden sm:flex items-center bg-neutral-800 rounded px-2 py-1 text-sm text-gray-300">
//           <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2">
//             <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//             <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
//           </svg>
//           <input className="bg-transparent outline-none w-36" placeholder="Search admin..." />
//         </div>

//         {/* Profile stub */}
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-neutral-900 font-bold">A</div>
//           <div className="hidden sm:block text-sm text-gray-300">Admin</div>
//         </div>
//       </div>
//     </header>
//   );
// }
