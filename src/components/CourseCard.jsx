"use client";

import { ChevronRight } from 'lucide-react';
import CloudinaryImage from './CloudinaryImage';
import CourseImage from '../assets/course-card.webp';
import PurdueUniversity from '../assets/purdue.webp';
import { useRouter } from 'next/navigation';

export default function CourseCard({ course, setIsModal = false }) {
     const router = useRouter();
     const handleClick = () => {
          if (setIsModal) setIsModal(false)
          router.push(`/${course.slug || course._id}`);
     };

     return (
          <div className="w-70 md:w-51 2xl:w-70 rounded-xl shadow-[0_0px_8px_0px] shadow-[#000000]/7 bg-white p-1.5">
               {/* Image section */}
               <div className="relative rounded-lg overflow-hidden h-27 w-full">
                    <CloudinaryImage
                         src={course?.image || CourseImage}
                         sizes="(max-width: 768px) 100vw, 280px"
                         alt={course?.alt || course?.title || "Course Cover Image"}
                         className="w-full h-full object-cover"
                    />
               </div>

               {/* Content */}
               <div className="pt-3 px-1">
                    {/* Title */}
                    <h3 className="text-[16px] 2xl:text-[18px] leading-7 text-secondary">
                         {course?.title}
                    </h3>

                    {/* University logo */}
                    <img src={PurdueUniversity?.src || PurdueUniversity} alt="Purdue University" loading="lazy" decoding="async" width="124" height="46" className="h-11.5 w-31 object-contain mt-3 mb-4 -ml-3  " />

                    {/* Metadata */}
                    <div className="space-y-1 text-[14px] 2xl:text-[16px] text-secondary mb-5">
                         <p>Starts: {course?.deadline}</p>
                         <p>Duration: {course?.courseLength}</p>
                    </div>

                    {/* CTA button */}
                    <button onClick={handleClick} className="w-full h-12 rounded-lg text-secondary text-[14px] 2xl:text-[16px] flex items-center justify-center gap-2 border border-[#E1EAF5] cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
                         Learn More
                         <ChevronRight />
                    </button>
               </div>
          </div>
     );
}
