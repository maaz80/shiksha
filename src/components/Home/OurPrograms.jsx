"use client";

import { useState } from 'react'
import ProgramsSidebar from '../ProgramsSidebar'
import CourseCard from '../CourseCard'
import { useCourses } from '../../context/CourseContext'

const OurPrograms = ({ data }) => {
     const [activeMobileIndex, setActiveMobileIndex] = useState(null);
     const context = useCourses() || {};
     const courses = Array.isArray(context.courses) ? context.courses.filter(Boolean) : [];
     const categories = [...new Set(courses.map(c => c?.category).filter(Boolean))];
     const [activeCategory, setActiveCategory] = useState(null);
     const filteredCourses =
          !activeCategory
               ? courses
               : courses.filter(c => c?.category === activeCategory);

     return (
          <div id='courses' className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-18 lg:pt-16'>

               {/* Heading */}
               <h2 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-secondary text-center">
                    {data?.startTitle || "Explore Our"}{" "}
                    <span className="relative inline-block text-orange">
                         {data?.endTitle || "Programs"}
                         <svg
                              className="absolute left-0 -bottom-2 lg:-bottom-6 w-full"
                              viewBox="0 0 200 20"
                              preserveAspectRatio="none"
                         >
                              <path
                                   d="M5 20 Q100 0 195 1"
                                   stroke="#F97316"
                                   strokeWidth="4"
                                   fill="none"
                                   strokeLinecap="round"
                              />
                         </svg>
                    </span>
               </h2>

               {/* DESKTOP */}
               <div className="hidden md:flex mt-10 items-start justify-center">
                    <div className='space-y-2 w-[34%] 2xl:w-[24%]'>

                         <ProgramsSidebar category="Categories" isHeading={true} />

                         {categories.map((cat) => (
                              <ProgramsSidebar
                                   key={cat}
                                   category={cat}
                                   isActive={activeCategory === cat}
                                   onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                              />
                         ))}
                    </div>

                    <div className='flex items-center justify-between flex-wrap w-[65%] 2xl:w-[80%] space-y-2 max-h-[72vh] overflow-y-scroll hide-scrollbar'>
                         {filteredCourses.map((course) => (
                              <CourseCard key={course._id || course.slug} course={course} setIsModal={false} />
                         ))}
                    </div>
               </div>

               {/* MOBILE VIEW */}
               <div className="md:hidden mt-8 space-y-3">
                    <ProgramsSidebar category="Categories" isHeading={true} />
                    {categories.map((cat, index) => {
                         const isOpen = activeMobileIndex === index;

                         const categoryCourses = courses.filter((c) => c?.category === cat);

                         return (
                              <div key={cat} className="overflow-hidden">

                                   {/* Sidebar */}
                                   <div
                                        onClick={() =>
                                             setActiveMobileIndex(isOpen ? null : index)
                                        }
                                        className="cursor-pointer"
                                   >
                                        <ProgramsSidebar
                                             category={cat}
                                             isActive={isOpen}
                                        />
                                   </div>

                                   {/* Animation block */}
                                   <div
                                        className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${isOpen ? 'max-h-105 opacity-100 mt-3' : 'max-h-0 opacity-0'}
               `}
                                   >
                                        <div
                                             className={`
                     flex gap-4 overflow-x-auto hide-scrollbar pb-2
                     transform transition-transform duration-500 ease-in-out
                     ${isOpen ? 'translate-y-0' : '-translate-y-4'}
                  `}
                                        >
                                             {categoryCourses.map((course) => (
                                                  <div
                                                       key={course._id || course.slug}
                                                       className="min-w-62.5 shrink-0"
                                                  >
                                                       <CourseCard course={course} />
                                                  </div>
                                             ))}
                                        </div>
                                   </div>

                              </div>
                         );
                    })}
               </div>

          </div>
     )
}

export default OurPrograms;