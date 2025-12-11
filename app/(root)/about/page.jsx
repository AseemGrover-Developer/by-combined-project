"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://ik.imagekit.io/allmyimages/bharat_yatra/about/about.png?updatedAt=1762348390343"
            alt="Bharat Yatra - About Us"
            className="w-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div>
          <h1 className="heading">
            About Bharat Yatra
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 mx-5">
            <strong>Bharat Yatra</strong> is your ultimate travel companion, designed to help you
            discover the rich cultural heritage, natural wonders, and timeless traditions of India.
            Our mission is to connect travelers with the heart of Bharat — its people, stories,
            and unforgettable destinations.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 mx-5">
            Whether you're planning a spiritual retreat, an adventurous trek, or a heritage tour,
            Bharat Yatra ensures every journey is meaningful, safe, and memorable. Our curated
            packages, professional guides, and detailed travel resources help you explore India
            like never before.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mx-5">
            Together, let’s celebrate India’s beauty and diversity — one trip at a time.
          </p>

          <div className="mt-8">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 mx-5">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
