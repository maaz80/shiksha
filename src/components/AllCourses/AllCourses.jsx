"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCourses } from "../../utils/courseService";
import { useCourses } from "../../context/CourseContext";

const ITEMS_PER_PAGE = 4;

const CourseCardSkeleton = () => {
     return (
          <div className="max-w-full w-full min-h-40 bg-white rounded-[20px] shadow-md border border-gray-100 flex flex-col sm:flex-row overflow-hidden open-sans animate-pulse">
               {/* LEFT IMAGE SECTION */}
               <div className="relative w-full sm:w-[50%] md:w-[39%] xl:w-[25%] aspect-video sm:aspect-auto bg-gray-200 min-h-40 sm:min-h-0">
                    <div className="absolute top-4 left-4 bg-gray-300 w-20 h-5 rounded-md" />
               </div>

               {/* RIGHT CONTENT */}
               <div className="flex-1 p-4 xl:p-6 flex flex-col justify-between w-full sm:w-[50%] md:w-[75%] space-y-4">
                    <div className="space-y-3">
                         {/* Author */}
                         <div className="h-4 bg-gray-200 rounded w-24" />
                         {/* Title */}
                         <div className="h-6 bg-gray-200 rounded w-3/4" />
                         
                         {/* Stats Grid */}
                         <div className="grid grid-cols-2 xl:grid-cols-4 items-center gap-2 xl:gap-6 pt-2">
                              <div className="h-4 bg-gray-200 rounded w-16" />
                              <div className="h-4 bg-gray-200 rounded w-24" />
                              <div className="h-4 bg-gray-200 rounded w-16" />
                              <div className="h-4 bg-gray-200 rounded w-20" />
                         </div>
                    </div>

                    <div className="border-t border-gray-200 my-2 xl:my-4"></div>

                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                              <div className="h-6 bg-gray-200 rounded w-16" />
                              <div className="h-6 bg-gray-200 rounded w-12" />
                         </div>
                         <div className="h-5 bg-gray-200 rounded w-20" />
                    </div>
               </div>
          </div>
     );
};

const Courses = ({ title }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const { courses, loading } = useCourses();

     const totalPages = Math.max(1, Math.ceil(courses.length / ITEMS_PER_PAGE));

     // Slice courses for current page
     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
     const currentCourses = courses.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
     );

     // Handle page change
     const handlePageChange = (page) => {
          if (page < 1 || page > totalPages) return;
          setCurrentPage(page);
     };

     // 🔥 Sliding Pagination Logic
     const getVisiblePages = () => {
          const pages = [];

          let start = currentPage;
          let end = currentPage + 2; // always 3 numbers

          // Adjust when reaching end
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
          window.scrollTo({ top: 0, behavior: 'smooth' })
     }
     return (
          <div className="text-secondary">
               {/* TITLE */}
               <h1 className="text-[24px] md:text-[48px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start mx-auto z-20 relative">
                    {title || "All Courses"}
               </h1>

               {/* COURSES */}
               <div className="flex flex-col gap-6 mt-5 min-h-80">
                    {loading ? (
                         Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                              <CourseCardSkeleton key={index} />
                         ))
                    ) : currentCourses.length > 0 ? (
                         currentCourses.map((course) => (
                              <CourseCard key={course._id} course={course} />
                         ))
                    ) : (
                         <div className="text-center py-10 text-gray-500">No courses found</div>
                    )}
               </div>

               {/* PAGINATION */}
               <div className="flex items-center justify-center gap-2 mt-10 text-sm">

                    {/* LEFT ARROW */}
                    <button
                         onClick={() => {
                              handleScroll();
                              handlePageChange(currentPage - 1);
                         }}
                         disabled={currentPage === 1}
                         aria-label="Previous page"
                         className="w-8 h-8 flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:text-secondary"
                    >
                         <ChevronLeft size={18} />
                    </button>

                    {/* PAGE NUMBERS */}
                    {visiblePages.map((page) => (
                         <button
                              key={page}
                              onClick={() => {
                                   handleScroll();
                                   handlePageChange(page);
                              }}
                              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-500 ease-in-out cursor-pointer hover:text-secondary
              ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                   }`}
                         >
                              {page}
                         </button>
                    ))}

                    {/* ELLIPSIS + LAST PAGE */}
                    {visiblePages[visiblePages.length - 1] < totalPages && (
                         <>
                              <span className="px-2 text-gray-500 hover:text-secondary">...</span>

                              <button
                                   onClick={() => {
                                        handleScroll();
                                        handlePageChange(totalPages);
                                   }}
                                   className={`w-8 h-8 flex items-center justify-center rounded-md transition-all cursor-pointer hover:text-secondary duration-500 ease-in-out ${currentPage === totalPages
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`} >
                                   {totalPages}
                              </button>
                         </>
                    )}

                    {/* RIGHT ARROW */}
                    <button
                         onClick={() => {
                              handleScroll();
                              handlePageChange(currentPage + 1);
                         }}
                         disabled={currentPage === totalPages}
                         aria-label="Next page"
                         className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                         <ChevronRight size={18} />
                    </button>
               </div>
          </div>
     );
};

export default Courses;