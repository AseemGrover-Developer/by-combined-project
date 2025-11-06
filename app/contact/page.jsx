"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Content and Form */}
        <div className="flex flex-col space-y-8">
          {/* Heading */}
          <div>
            <h1 className="heading">
              Contact Us
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mx-5">
              Have a question or want to connect with us?  
              Reach out through our social platforms or drop us a message below — we’d love to hear from you!
            </p>
          </div>

          {/* Social Media Handles */}
          <div className="flex flex-wrap gap-6 mt-4 mx-5">
            <a
              href="https://instagram.com"
              target="_blank"
              className="flex items-center gap-2 text-gray-800 hover:text-orange-600 transition-all duration-300"
            >
              {/* <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" /> */}
              <span>@bharatyatra</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="flex items-center gap-2 text-gray-800 hover:text-orange-600 transition-all duration-300"
            >
              {/* <img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" /> */}
              <span>/BharatYatraOfficial</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="flex items-center gap-2 text-gray-800 hover:text-orange-600 transition-all duration-300"
            >
              {/* <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" /> */}
              <span>@bharatyatra.fb</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="flex items-center gap-2 text-gray-800 hover:text-orange-600 transition-all duration-300"
            >
              {/* <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" /> */}
              <span>@bharat_yatra</span>
            </a>
          </div>

          {/* Contact Form */}
          <form className="bg-[#FEE5BC] border border-gray-200 shadow-md rounded-md p-6 flex flex-col space-y-4 mt-6 mx-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-white/90 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-white/90 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 bg-white/90 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://ik.imagekit.io/allmyimages/bharat_yatra/about/about.png?updatedAt=1762349357545"
            alt="Contact Bharat Yatra"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
