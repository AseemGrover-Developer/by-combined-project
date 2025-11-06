// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-transparent shadow-md z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-orange-600">
//           Bharat<span className="text-black">Yatra</span>
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-gray-100 font-medium">
//           <li><Link href="/slides" className="hover:text-orange-600 transition">Home</Link></li>
//           <li><Link href="/services" className="hover:text-orange-600 transition">Services</Link></li>
//           <li><Link href="/consultant" className="hover:text-orange-600 transition">Consultant</Link></li>
//           <li><Link href="/about" className="hover:text-orange-600 transition">About</Link></li>
//           <li><Link href="/contact" className="hover:text-orange-600 transition">Contact</Link></li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 rounded-md text-gray-100 hover:text-orange-600"
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white shadow-inner">
//           <ul className="flex flex-col items-center space-y-4 py-4 text-gray-100 font-medium">
//             <li><Link href="/slides" onClick={() => setOpen(false)} className="hover:text-orange-600 transition">Home</Link></li>
//             <li><Link href="/services" onClick={() => setOpen(false)} className="hover:text-orange-600 transition">Services</Link></li>
//             <li><Link href="/consultant" onClick={() => setOpen(false)} className="hover:text-orange-600 transition">Consultant</Link></li>
//             <li><Link href="/about" onClick={() => setOpen(false)} className="hover:text-orange-600 transition">About</Link></li>
//             <li><Link href="/contact" onClick={() => setOpen(false)} className="hover:text-orange-600 transition">Contact</Link></li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Consultant", path: "/consultant" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#ff7f00]">
          Bharat<span className="text-white"> Yatra</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="hover:text-orange-500 transition-ease duration-100"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-inner"
          >
            <ul className="flex flex-col items-center space-y-4 py-4 text-gray-800 font-medium">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
