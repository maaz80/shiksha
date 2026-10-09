"use client";

import { useState } from 'react'
import ProgramsSidebar from '../ProgramsSidebar'
import CourseCard from '../CourseCard'
import { useCourses } from '../../context/CourseContext'
import SectionHeading from '../SectionHeading'

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
          <div id='courses' className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-6 lg:pt-16'>

               {/* Heading */}
               <SectionHeading
                    variant="testimonial"
                    title={data?.title}
                    startHeading={!data?.title ? (data?.startTitle || "Explore Our") : undefined}
                    midHeading={!data?.title ? (data?.endTitle || "Programs") : undefined}
                    className="mb-6 md:mb-10"
               />

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

                    <div className='flex flex-wrap gap-5 xl:gap-6 w-[65%] 2xl:w-[75%] max-h-[75vh] overflow-y-auto hide-scrollbar pl-4 items-start content-start'>
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
                  ${isOpen ? 'max-h-135 opacity-100 mt-3' : 'max-h-0 opacity-0'}
               `}
                                   >
                                        <div
                                             className={`
                     flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x snap-mandatory
                     transform transition-transform duration-500 ease-in-out
                     ${isOpen ? 'translate-y-0' : '-translate-y-4'}
                  `}
                                        >
                                             {categoryCourses.map((course) => (
                                                  <div
                                                       key={course._id || course.slug}
                                                       className="w-[calc(100vw-32px)] sm:w-85 shrink-0 snap-start"
                                                  >
                                                       <CourseCard course={course} className="w-full" />
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