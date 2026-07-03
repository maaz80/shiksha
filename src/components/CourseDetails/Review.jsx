"use client";

import { ArrowRightSquare, ChevronLeft, ChevronRight, Star, Undo2 } from "lucide-react";
import { useState, useMemo } from "react";

export default function Review({ reviews = [] }) {
     const getInitials = (name) => {
          if (!name) return "";
          const parts = name.trim().split(/\s+/);
          if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
          return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
     };

     const total = reviews.length;
     const ITEMS_PER_PAGE = 3;
     const [currentPage, setCurrentPage] = useState(1);

     // Formatted reviews list
     const reviewsList = useMemo(() => {
          return reviews.map((item, index) => ({
               name: item.name,
               role: item.role || "",
               date: new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric"
               }),
               text: item.text,
               image: item.image || `https://i.pravatar.cc/40?img=${(index % 20) + 1}`,
          }));
     }, [reviews]);

     const totalPages = Math.ceil(reviewsList.length / ITEMS_PER_PAGE);

     const currentReviews = useMemo(() => {
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          return reviewsList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
     }, [reviewsList, currentPage]);

     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

     const getPages = () => {
          if (totalPages <= 5) {
               return Array.from({ length: totalPages }, (_, i) => i + 1);
          }

          let start = Math.max(1, currentPage - 2);
          let end = start + 4;

          if (end > totalPages) {
               end = totalPages;
               start = Math.max(1, end - 4);
          }

          const pages = [];
          for (let i = start; i <= end; i++) pages.push(i);
          return pages;
     };

     const visiblePages = getPages();

     const handlePageChange = (page) => {
          if (page >= 1 && page <= totalPages) setCurrentPage(page);
     };

     // ⭐ Average rating
     const avg = total > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / total : 0;

     // ⭐ Count per rating
     const counts = [5, 4, 3, 2, 1].map(
          (star) => reviews.filter((r) => r.rating === star).length
     );

     return (
          <div id="reviews" className="text-secondary">
               <h2 className="text-[24px] xl:text-[32px] font-bold text-primary mb-5">
                    Reviews
               </h2>

               <div className="max-w-4xl mx-auto rounded-xl p-2 md:p-6 border border-gray-200">

                    {/* Top Section */}
                    <div className="flex flex-col gap-6 items-start">

                         <div className="flex items-center gap-3">
                              <h2 className="text-[48px] font-bold">
                                   {avg.toFixed(1)}
                              </h2>

                              <div>
                                   <div className="flex gap-1 text-orange-500">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                             <Star
                                                  key={i}
                                                  size={24}
                                                  fill={i <= Math.round(avg) ? "#f97316" : "none"}
                                                  stroke="#f97316"
                                             />
                                        ))}
                                   </div>
                                   <p className="text-sm mt-1">
                                        based on {total.toLocaleString()} ratings
                                   </p>
                              </div>
                         </div>

                         <div className="flex-1 space-y-2 w-full">
                              {[5, 4, 3, 2, 1].map((star, i) => {
                                   const percent = total
                                        ? Math.round((counts[i] / total) * 100)
                                        : 0;

                                   return (
                                        <div key={star} className="flex items-center gap-3">
                                             <div className="flex gap-0.5 w-22.5">
                                                  {Array(star).fill().map((_, i) => (
                                                       <Star key={i} size={16} fill="#f97316" stroke="#f97316" />
                                                  ))}
                                                  {Array(5 - star).fill().map((_, i) => (
                                                       <Star key={i} size={16} stroke="#cbd5e1" />
                                                  ))}
                                             </div>
                                             <span className="text-sm w-10">{percent}%</span>
                                             <div className="flex-1 h-2.5 bg-gray-200 overflow-hidden">
                                                  <div
                                                       className="h-full bg-orange transition-all duration-500 ease-in-out"
                                                       style={{ width: `${percent}%` }}
                                                  />
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>

                    {/* ✅ Reviews — ab paginated data show hoga */}
                    <div className="mt-8 space-y-6">
                         {currentReviews.length === 0 ? (
                              <p className="text-center text-gray-500 py-10 text-[16px]">No reviews yet for this course.</p>
                         ) : (
                              currentReviews.map((item, i) => (
                                   <div key={`${currentPage}-${i}`} className="flex gap-4 border-t border-gray-300 pt-6">
                                        <div className="w-10 md:w-15 h-10 md:h-15 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm md:text-lg border border-gray-200 shrink-0 select-none">
                                             {getInitials(item.name)}
                                        </div>
                                        <div className="flex-1">
                                             <div className="flex justify-between items-center">
                                                  <div>
                                                       <h2 className="text-primary font-medium text-[20px] leading-tight">
                                                            {item.name}
                                                       </h2>
                                                       {/* {item.role && (
                                                            <span className="text-xs text-orange font-medium mt-1 inline-block">
                                                                 {item.role}
                                                            </span>
                                                       )} */}
                                                  </div>
                                                  <span className="text-sm text-primary">
                                                       {item.date}
                                                  </span>
                                             </div>
                                             <p className="text-[16px] mt-2 leading-7">{item.text}</p>
                                        </div>
                                   </div>
                              ))
                         )}
                    </div>

                    {/* ✅ Pagination */}
                    {totalPages > 1 && (
                         <div className="flex justify-end items-center gap-2 mt-6 text-sm">

                              {/* Prev */}
                              <button
                                   disabled={currentPage === 1}
                                   aria-label="Previous page"
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   className="px-2 disabled:opacity-40 cursor-pointer"
                              >
                                   <ChevronLeft />
                              </button>

                              {/* First + ellipsis */}
                              {visiblePages[0] > 1 && (
                                   <>
                                        <button onClick={() => handlePageChange(1)} className="w-8 h-8 rounded hover:bg-gray-200 cursor-pointer">1</button>
                                        {visiblePages[0] > 2 && <span>...</span>}
                                   </>
                              )}

                              {/* Visible Pages */}
                              {visiblePages.map((page) => (
                                   <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-8 h-8 cursor-pointer rounded ${currentPage === page ? "bg-primary text-white" : "hover:bg-gray-200"}`}
                                   >
                                        {page}
                                   </button>
                              ))}

                              {/* Last + ellipsis */}
                              {visiblePages[visiblePages.length - 1] < totalPages && (
                                   <>
                                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span>...</span>}
                                        <button
                                             onClick={() => handlePageChange(totalPages)}
                                             className={`w-8 h-8 rounded cursor-pointer ${currentPage === totalPages ? "bg-primary text-white" : "hover:bg-gray-200"}`}
                                        >
                                             {totalPages}
                                        </button>
                                   </>
                              )}

                              {/* Next */}
                              <button
                                   disabled={currentPage === totalPages}
                                   aria-label="Next page"
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   className="px-2 disabled:opacity-40 cursor-pointer"
                              >
                                   <ChevronRight />
                              </button>
                         </div>
                    )}

                    {/* Page Info */}
                    <div className="text-xs text-gray-500 mt-2 text-right">
                         Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, reviewsList.length)} of {reviewsList.length} reviews
                    </div>
               </div>
          </div>
     );
}