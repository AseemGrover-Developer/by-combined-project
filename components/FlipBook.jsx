"use client";

import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import { bookData } from "../public/scripts/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FlipBook = () => {
  const bookRef = useRef(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [flipSound, setFlipSound] = useState(null);

  // Load flip sound
  useEffect(() => {
    const sound = new Audio("/flip.mp3");
    setFlipSound(sound);
  }, []);

  // Handle page change
  const onFlip = (e) => {
    setPage(e.data);
    if (flipSound) {
      flipSound.currentTime = 0;
      flipSound.play();
    }
  };

  const nextPage = () => bookRef.current.pageFlip().flipNext();
  const prevPage = () => bookRef.current.pageFlip().flipPrev();

  // Total pages
  useEffect(() => {
    setTotalPages(bookData.pages.length + 1);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Title */}
      <h1
        className="heading"
      >
        Incredible India Flipbook
      </h1>

      {/* Navigation Buttons */}
      <button
        onClick={prevPage}
        className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 
                   bg-white/80 hover:bg-white p-3 md:p-4 rounded-full shadow-md border border-gray-200 
                   transition-all duration-300 hover:scale-105"
      >
        <ChevronLeft className="text-gray-700 w-6 h-6 md:w-7 md:h-7" />
      </button>

      <button
        onClick={nextPage}
        className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 
                   bg-white/80 hover:bg-white p-3 md:p-4 rounded-full shadow-md border border-gray-200 
                   transition-all duration-300 hover:scale-105"
      >
        <ChevronRight className="text-gray-700 w-6 h-6 md:w-7 md:h-7" />
      </button>

      <div className=" flex flex-col justify-center items-center">
        {/* FlipBook */}
        <HTMLFlipBook
          width={380}
          height={520}
          showCover={true}
          maxShadowOpacity={0.5}
          className="shadow-xl rounded-md "
          onFlip={onFlip}
          ref={bookRef}
        >
          {/* ✅ Book Cover */}
          <div className="rounded-md">
            <Image
              src={bookData.coverImage}
              alt="Book Cover"
              width={900}
              height={1200}
              className="object-cover rounded-md shadow-md"
            />
          </div>

          {/* ✅ Dynamic Pages */}
          {bookData.pages.map((pageData, index) => (
            <div
              key={pageData.id}
              className="bg-[#FEE5BC] text-gray-800 p-6 md:p-8 flex flex-col justify-between rounded-md shadow-inner relative"
            >
              {/* Main Image */}
              {pageData.main_image && (
                <div className="flex justify-center items-center w-full relative aspect-[9/12] mb-5">
                  <Image
                    src={pageData.main_image}
                    alt={`Page ${pageData.id}`}
                    className="rounded-md object-cover shadow-md"
                    fill
                  />
                </div>
              )}

              {/* Headings + Paragraph */}
              {(pageData.heading ||
                pageData.sub_heading ||
                pageData.paragraph) && (
                <div className="flex flex-col space-y-2 mb-5">
                  {pageData.heading && (
                    <h2
                      className="text-2xl font-extrabold 
                               bg-gradient-to-r from-orange-400 to-yellow-400 
                               bg-clip-text text-transparent"
                    >
                      {pageData.heading}
                    </h2>
                  )}
                  {pageData.sub_heading && (
                    <h3 className="text-lg font-semibold text-gray-600">
                      {pageData.sub_heading}
                    </h3>
                  )}
                  {pageData.paragraph && (
                    <p className="text-sm leading-relaxed text-gray-700">
                      {pageData.paragraph}
                    </p>
                  )}
                </div>
              )}
              
              {/* Two Images */}
              {(pageData.img1 || pageData.img2) && (
                <div className="flex gap-4 justify-center mt-3 mb-5">
                  {pageData.img1 && (
                    <Image
                      src={pageData.img1}
                      alt="Image 1"
                      width={160}
                      height={30}
                      className="rounded-md object-cover shadow-sm"
                    />
                  )}
                  {pageData.img2 && (
                    <Image
                      src={pageData.img2}
                      alt="Image 2"
                      width={160}
                      height={30}
                      className="rounded-md object-cover shadow-sm"
                    />
                  )}
                </div>
              )}

              {/* ✅ Page Number */}
              <p className="text-xs text-gray-500 absolute bottom-3 left-1/2 -translate-x-1/2">
                Page {index + 1}
              </p>
            </div>
          ))}
        </HTMLFlipBook>

        {/* ✅ Bottom Page Counter */}
        <div className="text-gray-700 text-sm mt-6 font-medium tracking-wide">
          Page {page + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
