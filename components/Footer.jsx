"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full h-screen text-white overflow-hidden">
      {/* ✅ Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/agra.jpg')" }}
      ></div>

      {/* ✅ Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* ✅ Main Content */}
      <div className="absolute bottom-15 w-full px-10 z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:ml-20">
        {/* Column 1: Bharat Yatra Intro */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            Bharat Yatra
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover India’s beauty with Bharat Yatra.  
            From spiritual journeys to modern adventures — 
            travel, explore, and experience the soul of India.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-lg font-semibold text-orange-300 mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link href="/blogs" className="hover:text-yellow-400 transition">Blogs</Link></li>
            <li><Link href="/heritage" className="hover:text-yellow-400 transition">Heritage Sites</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="text-lg font-semibold text-orange-300 mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/services" className="hover:text-yellow-400 transition">All Services</Link></li>
            <li><Link href="/packages" className="hover:text-yellow-400 transition">Tour Packages</Link></li>
            <li><Link href="/flights" className="hover:text-yellow-400 transition">Flights</Link></li>
            <li><Link href="/hotels" className="hover:text-yellow-400 transition">Hotels</Link></li>
            <li><Link href="/guides" className="hover:text-yellow-400 transition">Guides</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h3 className="text-lg font-semibold text-orange-300 mb-4">
            Connect With Us
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="https://instagram.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                {/* <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" /> */}
                Instagram
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                {/* <img src="/icons/youtube.svg" alt="YouTube" className="w-5 h-5" /> */}
                YouTube
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                {/* <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" /> */}
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" className="flex items-center gap-3 hover:text-yellow-400 transition">
                {/* <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" /> */}
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="absolute bottom-0 w-full z-10 border-t border-white/20 py-4 text-center text-gray-300 text-sm bg-black/40 backdrop-blur-sm">
        <p>
          © {new Date().getFullYear()} 
          <span className="font-semibold text-orange-300">Bharat Yatra</span> — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
