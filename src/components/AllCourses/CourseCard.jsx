"use client";

import { Clock, Users, BarChart3, FileText } from "lucide-react";
import CloudinaryImage from '../CloudinaryImage';
import { useRouter } from 'next/navigation';

const CourseCard = ({ course }) => {
     const router = useRouter();

     if (!course) return null;

     const handleViewMore = () => {
          router.push(`/${course.slug || course._id}`);
     };
     return (
          <div className="max-w-full w-full min-h-40 bg-white rounded-[20px] shadow-md border border-gray-100 flex flex-col sm:flex-row overflow-hidden open-sans">

               {/* LEFT IMAGE SECTION */}
               <div className="relative w-full sm:w-[50%] md:w-[39%] xl:w-[25%] aspect-video">

                    <span className="absolute top-4 left-4 bg-orange text-white text-xs font-medium px-3 py-1 rounded-md z-10">
                         {course.category || "Development"}
                    </span>

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
               <div className="flex-1 p-2 xl:p-6 flex flex-col justify-between w-full sm:w-[50%] md:w-[75%] text-secondary">

                    <div className="space-y-1.5 xl:space-y-3">
                         <p className="text-sm">
                              by {course.name || "Unknown"}
                         </p>

                         <h2 className="text-xl font-bold">
                              {course.title}
                         </h2>

                         <div className="grid grid-cols-2 xl:grid-cols-4 items-center gap-2 xl:gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                   <Clock size={16} className="text-orange" />
                                   <span>{course.courseLength || "--"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                   <Users size={16} className="text-orange" />
                                   <span>{course.students || 0} Students</span>
                              </div>
                              <div className="flex items-center gap-1">
                                   <BarChart3 size={16} className="text-orange" />
                                   <span>{course.level || "All levels"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                   <FileText size={16} className="text-orange" />
                                   <span>{course.totalLessons || 0} Lessons</span>
                              </div>
                         </div>
                    </div>

                    <div className="border-t border-gray-200 my-2 xl:my-4"></div>

                    <div className="flex items-center justify-between text-[20px] font-bold">
                         <div className="flex items-center gap-2">
                              <span className="text-gray-600 line-through">$29.0</span>
                              <span className="text-orange">Free</span>
                         </div>

                         <button
                              onClick={handleViewMore}
                              aria-label="View more about this course"
                              className="text-[16px] hover:text-orange transition-all duration-300 ease-in-out cursor-pointer"
                         >
                              View more
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default CourseCard;
