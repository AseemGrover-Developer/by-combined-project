"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full h-screen lg:h-screen text-white overflow-hidden">
      {/* ✅ Dark Overlay for Readability */}
      <div className="fixed inset-0 -z-10 text-(--text-color) backdrop-blur-[2px]"></div>

      {/* ✅ Main Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-20 py-16 lg:py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
        {/* Column 1: Bharat Yatra Intro */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            Bharat Yatra
          </h2>
          <p className="text-(--text-color) text-sm md:text-base leading-relaxed">
            Discover India’s beauty with Bharat Yatra. From spiritual journeys
            to modern adventures — travel, explore, and experience the soul of
            India.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-[#333333] text-sm md:text-base">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link href="/blogs" className="hover:text-yellow-400 transition">Blogs</Link></li>
            <li><Link href="/heritage" className="hover:text-yellow-400 transition">Heritage Sites</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-[#333333] text-sm md:text-base">
            <li><Link href="/services" className="hover:text-yellow-400 transition">All Services</Link></li>
            <li><Link href="/packages" className="hover:text-yellow-400 transition">Tour Packages</Link></li>
            <li><Link href="/flights" className="hover:text-yellow-400 transition">Flights</Link></li>
            <li><Link href="/hotels" className="hover:text-yellow-400 transition">Hotels</Link></li>
            <li><Link href="/guides" className="hover:text-yellow-400 transition">Guides</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h3 className="text-xl font-semibold text-orange-400 mb-4">
            Connect With Us
          </h3>
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li>
              <a href="https://instagram.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                YouTube
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="absolute bottom-0 w-full z-10 border-t border-white/20 py-4 text-center text-gray-300 text-xs sm:text-sm bg-black/50 backdrop-blur-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-orange-300">Bharat Yatra</span> — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
