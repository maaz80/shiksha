"use client";

import Link from 'next/link';
import { ChevronRight, Lock, Unlock } from 'lucide-react';
import CloudinaryImage from './CloudinaryImage';
import CourseImage from '../assets/course-card.webp';
import { useUserAuth } from '../context/UserAuthContext';

export default function CourseCard({ course, setIsModal = false, className = "" }) {
     const { isLoggedIn, isCourseUnlocked } = useUserAuth();

     if (!course) return null;

     const isUnlocked = isLoggedIn ? isCourseUnlocked(course) : false;

     // Flow Logic:
     // If logged in & unlocked -> navigate to /dashboard?course=slug
     // If logged in & locked OR not logged in -> navigate to normal course details page /courses/slug
     const courseHref = (isLoggedIn && isUnlocked)
          ? `/dashboard?course=${course.slug || course._id}`
          : `/courses/${course.slug || course._id}`;

     const handleClick = () => {
          if (setIsModal) setIsModal(false);
          if (typeof window !== "undefined") {
               window.scrollTo({ top: 0, behavior: "auto" });
          }
     };

     const categoryName = typeof course?.category === "object"
          ? course?.category?.name || "Program"
          : course?.category || "Course";

     // Promo description first paragraph as in CourseDetails/Details.jsx line 307
     const rawPromoDesc = course?.promoDescription || course?.overview || course?.description || "The demand for skilled UI and UX designers has increased rapidly with the rise of digital experiences.\n\nAs a result, UI UX design courses are now more popular than ever. In Delhi, these programs are among the most in-demand career options in today's time. Our UI/UX design institute has been providing industry-oriented training in these courses since its inception.";
     const firstParagraph = rawPromoDesc.split(/\n\n|\n/)[0]?.trim();

     return (
          <Link
               href={courseHref}
               onClick={handleClick}
               suppressHydrationWarning
               className={`block ${className ? className : "w-full md:w-85 xl:w-107.5"} max-w-full md:max-w-121 h-104 md:h-115 bg-white rounded-[20px] border border-gray-200 shadow-sm p-3 text-secondary cursor-pointer group hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
          >
               {/* TOP SECTION: IMAGE + CONTENT */}
               <div>
                    {/* IMAGE CONTAINER - Exactly matches RelatedBlogCard size */}
                    <div className="relative rounded-lg overflow-hidden w-full shrink-0">
                         <CloudinaryImage
                              src={course?.image || CourseImage}
                              sizes="(max-width: 768px) 344px, 400px"
                              alt={course?.alt || course?.title || "Course Cover Image"}
                              width="400"
                              height="210"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-52.25 object-cover group-hover:scale-105 transition-transform duration-500"
                         />

                         {/* CATEGORY BADGE - Exactly matches RelatedBlogCard */}
                         <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow-sm z-10 font-medium">
                              {categoryName}
                         </span>

                         {/* Logged in Badge */}
                         {isLoggedIn && (
                              <div className="absolute top-3 right-3 z-10">
                                   {isUnlocked ? (
                                        <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                                             <Unlock size={12} />
                                             Unlocked
                                        </span>
                                   ) : (
                                        <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                                             <Lock size={12} />
                                             Locked
                                        </span>
                                   )}
                              </div>
                         )}
                    </div>

                    {/* CONTENT */}
                    <div className="mt-3 px-1 text-left">
                         {/* TITLE */}
                         <h3 className="text-[22px] leading-6 font-semibold mb-2 md:mb-3 line-clamp-1 text-secondary group-hover:text-primary transition-colors">
                              {course?.title}
                         </h3>

                         {/* DESCRIPTION FROM DETAILS LINE 307 (LINE-CLAMP-2) */}
                         <p className="para text-gray-600 line-clamp-2 mb-2">
                              {firstParagraph}
                         </p>

                         {/* META */}
                         <p className="text-[14px] text-gray-500 mb-2 truncate">
                              Starts: <strong className="text-secondary font-semibold">{course?.deadline || "Upcoming Intake"}</strong> <span className="mx-2 text-gray-300">|</span> {course?.courselength || course?.duration || "Self-Paced"}
                         </p>
                    </div>
               </div>

               {/* BUTTON - Exactly matches RelatedBlogCard dimensions and text size */}
               <div className="px-1 pb-1">
                    <div className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-[16px] group-hover:bg-gray-100 transition-all duration-500 ease-in-out cursor-pointer font-medium text-secondary">
                         <span>{isLoggedIn && isUnlocked ? "Open Dashboard" : "Learn More"}</span>
                         <ChevronRight size={20} />
                    </div>
               </div>
          </Link>
     );
}
