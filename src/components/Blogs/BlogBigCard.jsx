"use client";

import React from "react";
import Link from "next/link";
import CloudinaryImage from "../CloudinaryImage";

const Template = "/images/shiksha-template-image.webp";

// Format date deterministically across SSR and Client
const formatDate = (dateString) => {
     if (!dateString) return "01/15/2026";
     const date = new Date(dateString);
     if (isNaN(date.getTime())) return "01/15/2026";
     const year = date.getUTCFullYear();
     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
     const day = String(date.getUTCDate()).padStart(2, "0");
     return `${month}/${day}/${year}`;
};

const BlogBigCard = ({ blog }) => {
     const isLoading = !blog;
     const blogHref = blog?.slug ? `/blog/${blog.slug}` : "#";
     const displayDate = blog?.date || blog?.updatedAt || blog?.createdAt;

     const handleCardClick = () => {
          if (typeof window !== "undefined") {
               window.scrollTo({ top: 0, behavior: "auto" });
          }
     };

     // Loading Skeleton matching AllCourses/CourseCard design
     if (isLoading) {
          return (
               <div className="max-w-full w-full min-h-40 bg-white rounded-[20px] shadow-md border border-gray-100 flex flex-col sm:flex-row overflow-hidden open-sans animate-pulse">
                    {/* LEFT IMAGE SKELETON */}
                    <div className="relative w-full h-48 sm:h-auto sm:w-[50%] md:w-[39%] xl:w-[29%] aspect-video shrink-0 overflow-hidden bg-gray-200">
                         <div className="absolute top-4 left-4 bg-gray-300 w-24 h-5 rounded-md" />
                    </div>

                    {/* RIGHT CONTENT SKELETON */}
                    <div className="flex-1 p-4 xl:p-6 flex flex-col justify-between w-full sm:w-[50%] md:w-[75%] space-y-4">
                         <div className="space-y-3">
                              {/* Author */}
                              <div className="h-4 bg-gray-200 rounded w-24" />
                              {/* Title */}
                              <div className="h-6 bg-gray-200 rounded w-3/4" />
                              {/* Description */}
                              <div className="space-y-1.5 pt-1">
                                   <div className="h-3.5 bg-gray-200 rounded w-full" />
                                   <div className="h-3.5 bg-gray-200 rounded w-5/6" />
                              </div>
                         </div>

                         <div className="border-t border-gray-200 my-2 xl:my-4"></div>

                         <div className="flex items-center justify-between">
                              <div className="h-4 bg-gray-200 rounded w-36" />
                              <div className="h-5 bg-gray-200 rounded w-28" />
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <Link
               href={blogHref}
               onClick={handleCardClick}
               className="max-w-full w-full min-h-40 bg-white rounded-[20px] shadow-md border border-gray-100 flex flex-col sm:flex-row overflow-hidden open-sans cursor-pointer group hover:shadow-lg transition-shadow duration-300 block relative"
          >
               {/* LEFT IMAGE SECTION - Exactly matches AllCourses/CourseCard */}
               <div className="relative w-full h-48 sm:h-auto sm:w-[50%] md:w-[39%] xl:w-[29%] aspect-video shrink-0 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-orange text-white text-xs font-medium px-3 py-1 rounded-md z-10 shadow-xs">
                         {blog?.category || "Career Details"}
                    </span>

                    <CloudinaryImage
                         src={blog?.image || Template}
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                         alt={blog?.alt || blog?.title || "Blog"}
                         priority={true}
                         fetchPriority="high"
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
               </div>

               {/* RIGHT CONTENT - Exactly matches AllCourses/CourseCard */}
               <div className="flex-1 p-4 xl:p-6 flex flex-col justify-between w-full sm:w-[50%] md:w-[75%] text-secondary">
                    <div className="space-y-1.5 xl:space-y-3">
                         <p className="text-sm text-gray-500">
                              by <span className="text-secondary font-medium">{blog?.author || "Shiksha Team"}</span>
                         </p>

                         <h2 className="text-xl font-bold group-hover:text-orange transition-colors duration-300 line-clamp-2 leading-snug">
                              {blog?.title}
                         </h2>

                         <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
                              {blog?.description || blog?.overview || blog?.excerpt || "Explore in-depth articles, industry trends, and career insights curated by Shiksha."}
                         </p>
                    </div>

                    <div className="border-t border-gray-200 my-2 xl:my-4"></div>

                    <div className="flex items-center justify-between text-[20px] font-bold">
                         <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
                              <span>Updated: <strong className="text-secondary font-semibold">{formatDate(displayDate)}</strong></span>
                         </div>

                         <span className="text-[16px] group-hover:text-orange transition-all duration-300 ease-in-out cursor-pointer font-semibold flex items-center gap-1">
                              Read Article →
                         </span>
                    </div>
               </div>
          </Link>
     );
};

export default BlogBigCard;