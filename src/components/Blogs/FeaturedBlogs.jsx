"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { useBlogs } from "../../context/BlogContext";

const ITEMS_PER_PAGE = 9;

const FeaturedBlogs = ({ title }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const { blogs } = useBlogs();

     const isLoading = !blogs || blogs.length === 0;

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "auto" }); // smooth ❌
     }, []);

     const totalPages = Math.ceil((blogs?.length || 0) / ITEMS_PER_PAGE);

     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

     const currentFeaturedBlogs = useMemo(() => {
          if (isLoading) return Array.from({ length: ITEMS_PER_PAGE });
          return blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
     }, [blogs, startIndex, isLoading]);

     const handlePageChange = (page) => {
          if (page < 1 || page > totalPages) return;
          setCurrentPage(page);
     };

     const getVisiblePages = () => {
          const pages = [];

          let start = currentPage;
          let end = currentPage + 2;

          if (end > totalPages) {
               end = totalPages;
               start = totalPages - 2;
          }

          if (start < 1) start = 1;

          for (let i = start; i <= end; i++) {
               if (i > 0) pages.push(i);
          }

          return pages;
     };

     const visiblePages = getVisiblePages();

     const handleScroll = () => {
          window.scrollTo({ top: 0, behavior: "auto" });
     };

     return (
          <div className="text-secondary mt-5 ">

               {/* TITLE */}
               <h2 className="text-[24px] md:text-[32px] font-bold text-primary px-1.5 md:px-0">
                    {title || "Features"}
               </h2>

               {/* GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mt-2 px-1.5 md:px-0">

                    {currentFeaturedBlogs.map((blog, index) =>
                         blog ? (
                              <BlogCard key={blog._id} blog={blog} />
                         ) : (
                              <div
                                   key={index}
                                   className="w-[384px] h-118 bg-gray-100 rounded-xl animate-pulse"
                              />
                         )
                    )}

               </div>

               {/* PAGINATION (render always to avoid CLS) */}
               <div className="flex items-center justify-center gap-2 mt-10 text-sm min-h-10">

                    {/* LEFT */}
                    <button
                         onClick={() => {
                              handleScroll();
                              handlePageChange(currentPage - 1);
                         }}
                         aria-label="Previous page"
                         disabled={currentPage === 1}
                         className="w-8 h-8 flex items-center justify-center text-gray-500 disabled:opacity-40"
                    >
                         <ChevronLeft size={18} />
                    </button>

                    {/* PAGES */}
                    {visiblePages.map((page) => (
                         <button
                              key={page}
                              onClick={() => {
                                   handleScroll();
                                   handlePageChange(page);
                              }}
                              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all
              ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                   }`}
                         >
                              {page}
                         </button>
                    ))}

                    {/* LAST */}
                    {visiblePages[visiblePages.length - 1] < totalPages && !isLoading && (
                         <>
                              <span className="px-2 text-gray-500">...</span>

                              <button
                                   onClick={() => {
                                        handleScroll();
                                        handlePageChange(totalPages);
                                   }}
                                   className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                              >
                                   {totalPages}
                              </button>
                         </>
                    )}

                    {/* RIGHT */}
                    <button
                         onClick={() => {
                              handleScroll();
                              handlePageChange(currentPage + 1);
                         }}
                         aria-label="Next page"
                         disabled={totalPages === 0 || currentPage === totalPages}
                         className="w-8 h-8 flex items-center justify-center text-gray-500 disabled:opacity-40"
                    >
                         <ChevronRight size={18} />
                    </button>

               </div>
          </div>
     );
};

export default FeaturedBlogs;