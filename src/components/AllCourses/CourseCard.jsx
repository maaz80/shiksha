"use client";

import Link from "next/link";
import { Clock, Users, BarChart3, FileText, Lock, Unlock } from "lucide-react";
import CloudinaryImage from '../CloudinaryImage';
import { useUserAuth } from '../../context/UserAuthContext';

const CourseCard = ({ course }) => {
     if (!course) return null;

     const { isLoggedIn, isCourseUnlocked } = useUserAuth();
     const isUnlocked = isLoggedIn ? isCourseUnlocked(course) : false;

     // Flow Logic:
     // If logged in & unlocked -> navigate to /dashboard?course=slug
     // If logged in & locked OR not logged in -> navigate to normal course details page /courses/slug
     const courseHref = (isLoggedIn && isUnlocked)
          ? `/dashboard?course=${course.slug || course._id}`
          : `/courses/${course.slug || course._id}`;

     return (
          <Link
               href={courseHref}
               className="max-w-full w-full min-h-40 bg-white rounded-[20px] shadow-md border border-gray-100 flex flex-col sm:flex-row overflow-hidden open-sans cursor-pointer group hover:shadow-lg transition-shadow duration-300 block relative"
          >

               {/* LEFT IMAGE SECTION */}
               <div className="relative w-full sm:w-[50%] md:w-[39%] xl:w-[25%] aspect-video">

                    <span className="absolute top-4 left-4 bg-orange text-white text-xs font-medium px-3 py-1 rounded-md z-10">
                         {course.category || "Development"}
                    </span>

                    {/* Logged in Badge */}
                    {isLoggedIn && (
                         <div className="absolute top-4 right-4 z-10">
                              {isUnlocked ? (
                                   <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                                        <Unlock size={12} />
                                        Unlocked
                                   </span>
                              ) : (
                                   <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                                        <Lock size={12} />
                                        Locked
                                   </span>
                              )}
                         </div>
                    )}

                    <CloudinaryImage
                         src={course.image}
                         sizes="(max-width: 768px) 100vw, 400px"
                         alt={course.alt || course.title || course.name}
                         priority={true}
                         fetchPriority="high"
                         className="w-full h-full object-cover"
                    />
               </div>

               {/* RIGHT CONTENT */}
               <div className="flex-1 p-4 xl:p-6 flex flex-col justify-between w-full sm:w-[50%] md:w-[75%] text-secondary">

                    <div className="space-y-1.5 xl:space-y-3">
                         <p className="text-sm">
                              by {course.name || "Instructor"}
                         </p>

                         <h2 className="text-xl font-bold group-hover:text-orange transition-colors duration-300">
                              {course.title}
                         </h2>

                         <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
                              {course.overview || course.description || "Master in-demand skills with expert live sessions, hands-on projects, and mentorship."}
                         </p>
                    </div>

                    <div className="border-t border-gray-200 my-2 xl:my-4"></div>

                    <div className="flex items-center justify-between text-[20px] font-bold">
                         <div className="flex items-center gap-2">
                              <span className="text-gray-600 line-through">₹15,000</span>
                              <span className="text-orange">₹{course.fees || '10,000'}</span>
                         </div>

                         <span
                              className="text-[16px] group-hover:text-orange transition-all duration-300 ease-in-out cursor-pointer font-semibold"
                         >
                              {isLoggedIn && isUnlocked ? "Open Dashboard →" : "View Details →"}
                         </span>
                    </div>
               </div>
          </Link>
     );
};

export default CourseCard;
