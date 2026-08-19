"use client";

import Link from "next/link";
import { Clock, Users, BarChart3, FileText, Lock, Unlock, ArrowRight } from "lucide-react";
import CloudinaryImage from "./CloudinaryImage";

export default function HorizontalCourseCard({ course, unlocked = false }) {
     if (!course) return null;

     const courseHref = `/courses/${course.slug || course._id}`;

     return (
          <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
               {/* Left Thumbnail Section */}
               <div className="relative w-full sm:w-2/5 md:w-1/3 aspect-video sm:aspect-auto shrink-0 bg-gray-100 overflow-hidden">
                    <CloudinaryImage
                         src={course.image}
                         alt={course.alt || course.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10">
                         {course.category || "Course"}
                    </span>

                    {/* Unlocked / Locked Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                         {unlocked ? (
                              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                                   <Unlock size={12} />
                                   Unlocked
                              </span>
                         ) : (
                              <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                                   <Lock size={12} />
                                   Locked
                              </span>
                         )}
                    </div>
               </div>

               {/* Right Content Section */}
               <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                         <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 font-medium">by {course.name || "Shiksha Design"}</span>
                         </div>

                         <h3 className="text-lg sm:text-xl font-bold text-secondary group-hover:text-primary transition-colors leading-snug">
                              {course.title}
                         </h3>

                         <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                              {course.overview || course.description || "Master in-demand industry skills with expert live sessions and hands-on projects."}
                         </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
                         <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <span className={`w-2 h-2 rounded-full ${unlocked ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                              <span>{unlocked ? "Unlocked Access" : `Intake: ${course.deadline || "Upcoming Intake"}`}</span>
                         </div>

                         <Link
                              href={courseHref}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${unlocked ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs' : 'bg-primary hover:bg-primary-hover text-white shadow-xs'}`}
                         >
                              <span>{unlocked ? "Open Course" : "View Course Details"}</span>
                              <ArrowRight size={14} />
                         </Link>
                    </div>
               </div>
          </div>
     );
}
