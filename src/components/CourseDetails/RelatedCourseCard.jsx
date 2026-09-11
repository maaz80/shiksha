"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Clock, Calendar } from "lucide-react";

export default function RelatedCourseCard({ course, className = "" }) {
     if (!course) return null;

     const courseHref = `/courses/${course.slug || course._id}`;

     const handleCardClick = () => {
          if (typeof window !== "undefined") {
               window.scrollTo({ top: 0, behavior: "smooth" });
          }
     };

     const categoryName = typeof course.category === "object" ? course.category?.name || "Certification" : course.category || "Design & Tech";
     const durationText = course.courselength || course.duration || "Self-Paced";
     const startDateText = course.startdate || course.deadline || "Upcoming Batch";

     return (
          <Link
               href={courseHref}
               onClick={handleCardClick}
               suppressHydrationWarning
               className={`block ${className ? className : "w-full"} bg-white rounded-[20px] border border-gray-200 shadow-xs p-3.5 text-secondary cursor-pointer group hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full`}
          >
               <div>
                    {/* IMAGE CONTAINER */}
                    <div className="relative rounded-[14px] overflow-hidden w-full h-48 bg-gray-100">
                         <img
                              src={course.image || "/images/weekend-ux-program-image-template.webp"}
                              alt={course.title}
                              loading="lazy"
                              width="400"
                              height="210"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />

                         {/* CATEGORY BADGE */}
                         <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-secondary font-bold text-[11px] px-3 py-1 rounded-md shadow-xs uppercase tracking-wider border border-gray-200/80">
                              {categoryName}
                         </span>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-4 px-1 space-y-2 text-left">
                         {/* TITLE */}
                         <h3 className="text-lg font-bold text-secondary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                              {course.title}
                         </h3>

                         {/* META INFO */}
                         <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 pt-1">
                              <span className="flex items-center gap-1.5">
                                   <Clock size={14} className="text-primary" />
                                   {durationText}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-1.5">
                                   <Calendar size={14} className="text-orange" />
                                   {startDateText}
                              </span>
                         </div>
                    </div>
               </div>

               {/* READ MORE / EXPLORE BUTTON */}
               <div className="mt-5 pt-2">
                    <div className="w-full flex items-center justify-center gap-2 border border-gray-200/90 rounded-xl py-2.5 text-sm font-bold text-secondary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 cursor-pointer shadow-2xs">
                         <span>Explore Course</span>
                         <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
               </div>
          </Link>
     );
}
