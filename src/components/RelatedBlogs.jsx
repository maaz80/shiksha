"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RelatedBlogCard from "./Blogs/RelatedBlogCard";
import { useBlogs } from "../context/BlogContext";
import RelatedBlogCardSkeleton from "./Skeletons/RelatedBlogCardSkeleton";

const RelatedBlogs = ({ title }) => {
     const [currentIndex, setCurrentIndex] = useState(0);
     const [itemsPerView, setItemsPerView] = useState(3);
     const { blogs, loading } = useBlogs();

     useEffect(() => {
          let timeout;
          const update = () => {
               clearTimeout(timeout);
               timeout = setTimeout(() => {
                    const w = window.innerWidth;
                    const val = w < 768 ? 1 : w < 1024 ? 2 : 3;
                    setItemsPerView((prev) => (prev !== val ? val : prev));
               }, 120);
          };
          update();
          window.addEventListener("resize", update);
          return () => window.removeEventListener("resize", update);
     }, []);

     const maxIndex = useMemo(
          () => Math.max(0, blogs.length - itemsPerView),
          [blogs.length, itemsPerView]
     );

     // currentIndex ko maxIndex se clamp karo jab resize ho
     useEffect(() => {
          setCurrentIndex((prev) => Math.min(prev, maxIndex));
     }, [maxIndex]);

     const visibleItems = useMemo(
          () => (loading ? Array.from({ length: itemsPerView }) : blogs),
          [loading, blogs, itemsPerView]
     );

     const prev = useCallback(() => {
          setCurrentIndex((p) => Math.max(0, p - 1));
     }, []);

     const next = useCallback(() => {
          setCurrentIndex((p) => Math.min(maxIndex, p + 1));
     }, [maxIndex]);

     // ✅ Yahi main fix hai — cardWidth % se slide karo, itemsPerView se divide karke
     const cardWidthPercent = 100 / itemsPerView;

     return (
          <div className="relative w-full open-sans z-9999">

               <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 px-4 md:px-0">
                    {title || "Related Blogs"}
               </h2>

               <div className="relative">

                    {/* LEFT BUTTON — half bahar, half andar */}
                    <button
                         onClick={prev}
                         aria-label="Previous Blog"
                         disabled={currentIndex === 0}
                         className="absolute left-2 md:-left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-40 border border-gray-100 cursor-pointer"
                    >
                         <ChevronLeft size={18} />
                    </button>

                    {/* RIGHT BUTTON — half bahar, half andar */}
                    <button
                         onClick={next}
                         aria-label="Next Blog"
                         disabled={currentIndex >= maxIndex}
                         className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-40 border border-gray-100 cursor-pointer"
                    >
                         <ChevronRight size={18} />
                    </button>

                    {/* VIEWPORT */}
                    <div className="overflow-hidden px-3 md:px-0">
                         <div
                              className="flex transition-transform duration-300 ease-out will-change-transform "
                              style={{
                                   // ✅ Yahi correct formula — har card apni width ke hisaab se shift hoga
                                   transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
                              }}
                         >
                              {visibleItems.map((blog, index) => (
                                   <div
                                        key={blog?._id || index}
                                        className="shrink-0 px-2"
                                        style={{ width: `${cardWidthPercent}%` }}
                                   >
                                        {blog ? (
                                             <RelatedBlogCard blog={blog} />
                                        ) : (
                                             <RelatedBlogCardSkeleton />
                                        )}
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               {/* DOTS */}
               <div className="flex justify-center mt-6 gap-0">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                         <button
                              key={i}
                              onClick={() => setCurrentIndex(i)}
                              aria-label={`Go to slide ${i + 1}`}
                              className="p-2 md:p-3"
                         >
                              <span
                                   className={`block rounded-full transition-all duration-300 ${currentIndex === i
                                             ? "w-6 h-2 bg-blue-600"
                                             : "w-2 h-2 bg-gray-300"
                                        }`}
                              />
                         </button>
                    ))}
               </div>

          </div>
     );
};

export default RelatedBlogs;