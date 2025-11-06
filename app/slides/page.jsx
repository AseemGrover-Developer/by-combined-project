"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function SlideShow() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  const currentRef = useRef();
  const prevRef = useRef();

  // ✅ Fetch slides once
  useEffect(() => {
    fetch("/api/slides")
      .then((res) => res.json())
      .then(setSlides)
      .catch((err) => console.error("❌ Failed to fetch slides:", err));
  }, []);

  // ✅ Auto change every 5s
  // useEffect(() => {
  //   if (slides.length === 0) return;
  //   const timer = setInterval(() => nextSlide(), 5000);
  //   return () => clearInterval(timer);
  // }, [slides, index]);

  // ✅ Crossfade Animation
  useEffect(() => {
    if (!currentRef.current) return;

    const tl = gsap.timeline();

    if (prevRef.current) {
      tl.to(prevRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }

    tl.fromTo(
      currentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" },
      "<" // runs at same time for smooth blend
    );
  }, [index]);

  // ✅ Next / Prev Handlers
  const nextSlide = () => {
    if (slides.length === 0) return;
    setPrevIndex(index);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setPrevIndex(index);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0)
    return <p className="text-center p-6 text-gray-600">No slides available</p>;

  const currentSlide = slides[index];
  const prevSlideData = prevIndex !== null ? slides[prevIndex] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Previous Slide (behind) */}
      {prevSlideData && (
        <div
          ref={prevRef}
          key={prevSlideData._id + "_prev"}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${prevSlideData.imageUrl})`,
            zIndex: 0,
          }}
        />
      )}

      {/* Current Slide (on top) */}
      <div
        ref={currentRef}
        key={currentSlide._id + "_current"}
        className="absolute inset-0 bg-cover bg-center flex flex-col  px-4"
        style={{
          backgroundImage: `url(${currentSlide.imageUrl})`,
          zIndex: 1,
        }}
      >
          <h1 className="text-transparent [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:white] text-6xl text-center mt-60 md:text-9xl font-bold drop-shadow-lg">
            {currentSlide.title}
          </h1>
          <p className=" text-lg md:text-xl max-w-2xl drop-shadow-md absolute bottom-15 right-10 text-white">
            {currentSlide.description}
          </p>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 z-10"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 z-10"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setPrevIndex(index);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
