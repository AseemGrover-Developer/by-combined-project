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

  // Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent shadow-md z-50 ">
      <div className="flex items-center justify-between px-6 py-4 h-[7vh]">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#ff7f00]">
          Bharat<span className="text-gray-600"> Yatra</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-(--text-color) font-semibold">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-(--heading-color)"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden fixed inset-0 bg-orange-600 text-white flex items-center overflow-hidden z-50 px-6"
          >
            <motion.ul
              variants={listVariants}
              className="flex flex-col gap-20"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className="text-white text-6xl font-extrabold tracking-wide"
                  >
                    {link.name}
                    <div className="w-[100vw] mt-3 h-[1px] bg-white"></div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Close Button Inside Fullscreen Menu */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white p-2"
            >
              <X size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

