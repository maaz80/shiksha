"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RelatedBlogCard from "./Blogs/RelatedBlogCard";
import { useBlogs } from "../context/BlogContext";

const DEFAULT_RELATED_BLOGS = [
     {
          _id: "default-rel-1",
          title: "The Future of AI in Design & Development",
          description: "Discover how AI design tools and modern workflows are revolutionizing product design and user experience.",
          author: "Shiksha Team",
          date: "2026-01-15T00:00:00.000Z",
          category: "Design & AI",
          slug: "future-of-ai-design"
     },
     {
          _id: "default-rel-2",
          title: "Mastering Full Stack Development in 2026",
          description: "Step-by-step roadmap to becoming a highly paid full stack developer with practical projects.",
          author: "Shiksha Team",
          date: "2026-01-20T00:00:00.000Z",
          category: "Development",
          slug: "full-stack-roadmap"
     },
     {
          _id: "default-rel-3",
          title: "UI/UX Best Practices for High Conversion",
          description: "Learn proven UX principles and interface strategies to double user engagement and conversions.",
          author: "Shiksha Team",
          date: "2026-01-25T00:00:00.000Z",
          category: "UI/UX",
          slug: "ui-ux-best-practices"
     }
];

const RelatedBlogs = ({ title, initialBlogs = [] }) => {
     const [currentIndex, setCurrentIndex] = useState(0);
     const [visibleCards, setVisibleCards] = useState(3);
     const context = useBlogs() || {};
     const contextBlogs = Array.isArray(context.blogs) ? context.blogs.filter(Boolean) : [];
     const rawBlogs = (initialBlogs && initialBlogs.length > 0) ? initialBlogs : (contextBlogs.length > 0 ? contextBlogs : []);

     const blogs = useMemo(() => {
          if (rawBlogs.length === 0) return DEFAULT_RELATED_BLOGS;
          return rawBlogs;
     }, [rawBlogs]);

     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth < 640) {
                    setVisibleCards(1);
               } else if (window.innerWidth < 1024) {
                    setVisibleCards(2);
               } else {
                    setVisibleCards(3);
               }
          };
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     const handlePrev = () => {
          setCurrentIndex(prev => (prev === 0 ? Math.max(0, blogs.length - visibleCards) : prev - 1));
     };
     const handleNext = () => {
          setCurrentIndex(prev => (prev >= blogs.length - visibleCards ? 0 : prev + 1));
     };

     return (
          <div className="relative w-full open-sans z-10 my-8 overflow-hidden px-0 md:px-3">
               {/* Heading */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                         {title || "Related Blogs"}
                    </h2>
               </div>

               {/* Carousel Track */}
               <div className="overflow-hidden relative w-full">
                    <div
                         className="flex transition-transform duration-500 ease-in-out"
                         style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                    >
                         {blogs.map((blog, index) => (
                              <div
                                   key={blog?._id || blog?.slug || index}
                                   className="shrink-0 px-0 md:px-3"
                                   style={{ width: `${100 / visibleCards}%` }}
                              >
                                   <RelatedBlogCard blog={blog} className="w-full" />
                              </div>
                         ))}
                    </div>
               </div>

               {/* Navigation Controls (Identical fine design to Case Studies Carousel) */}
               {blogs.length > visibleCards && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                         <button
                              onClick={handlePrev}
                              className="w-10 h-10 rounded-full border border-gray-300 hover:border-primary text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer bg-white shadow-xs"
                              aria-label="Previous Blog"
                         >
                              <ChevronLeft size={20} />
                         </button>
                         <button
                              onClick={handleNext}
                              className="w-10 h-10 rounded-full border border-gray-300 hover:border-primary text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer bg-white shadow-xs"
                              aria-label="Next Blog"
                         >
                              <ChevronRight size={20} />
                         </button>
                    </div>
               )}
          </div>
     );
};

export default RelatedBlogs;