"use client";

import Link from 'next/link';
import { ChevronRight, Lock, Unlock, Calendar } from 'lucide-react';
import CloudinaryImage from './CloudinaryImage';
import CourseImage from '../assets/course-card.webp';
import { useUserAuth } from '../context/UserAuthContext';

export default function CourseCard({ course, setIsModal = false, className = "" }) {
     if (!course) return null;

     const { isLoggedIn, isCourseUnlocked } = useUserAuth();
     const isUnlocked = isLoggedIn ? isCourseUnlocked(course) : false;

     // Flow Logic:
     // If logged in & unlocked -> navigate to /dashboard?course=slug
     // If logged in & locked OR not logged in -> navigate to normal course details page /courses/slug
     const courseHref = (isLoggedIn && isUnlocked)
          ? `/dashboard?course=${course.slug || course._id}`
          : `/courses/${course.slug || course._id}`;

     const handleClick = () => {
          if (setIsModal) setIsModal(false);
     };

     return (
          <Link
               href={courseHref}
               onClick={handleClick}
               className={`block ${className ? className : "w-70 md:w-51 2xl:w-70"} rounded-xl shadow-[0_0px_8px_0px] shadow-[#000000]/7 bg-white p-2 cursor-pointer group hover:shadow-md transition-all duration-300 relative flex flex-col justify-between`}
          >
               <div>
                    {/* Image section */}
                    <div className="relative rounded-lg overflow-hidden h-28 w-full">
                         <CloudinaryImage
                              src={course?.image || CourseImage}
                              sizes="(max-width: 768px) 100vw, 280px"
                              alt={course?.alt || course?.title || "Course Cover Image"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />

                         {/* Category Badge */}
                         {course?.category && (
                              <div className="absolute top-2 left-2 z-10">
                                   <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                                        {course.category}
                                   </span>
                              </div>
                         )}

                         {/* Logged in Badge */}
                         {isLoggedIn && (
                              <div className="absolute top-2 right-2 z-10">
                                   {isUnlocked ? (
                                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                                             <Unlock size={11} />
                                             Unlocked
                                        </span>
                                   ) : (
                                        <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                                             <Lock size={11} />
                                             Locked
                                        </span>
                                   )}
                              </div>
                         )}
                    </div>

                    {/* Content */}
                    <div className="pt-3 px-1 text-left">
                         {/* Title */}
                         <h3 className="text-[15px] 2xl:text-[17px] leading-snug text-secondary font-bold group-hover:text-primary transition-colors line-clamp-1">
                              {course?.title}
                         </h3>

                         {/* Description */}
                         <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                              {course?.overview || course?.description || "Master in-demand skills with expert live sessions, hands-on projects, and mentorship."}
                         </p>
                    </div>
               </div>

               {/* Bottom Section */}
               <div className="pt-2 px-1 text-left">
                    {/* Start Intake Metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3 pt-2.5 border-t border-slate-100">
                         <span className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-primary shrink-0" />
                              <span>Starts: <strong className="text-slate-800 font-semibold">{course?.deadline || "Upcoming Intake"}</strong></span>
                         </span>
                    </div>

                    {/* CTA button */}
                    <div className="w-full h-10.5 rounded-lg text-secondary text-[13px] 2xl:text-[15px] flex items-center justify-center gap-1.5 border border-[#E1EAF5] cursor-pointer group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-in-out font-semibold">
                         {isLoggedIn && isUnlocked ? "Open Dashboard" : "Learn More"}
                         <ChevronRight size={16} />
                    </div>
               </div>
          </Link>
     );
}
