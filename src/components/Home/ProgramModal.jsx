"use client";

import { useEffect, useState } from 'react';
import ProgramsSidebar from '../ProgramsSidebar';
import CourseCard from '../CourseCard';
import { useCourses } from '../../context/CourseContext';

const ProgramModal = ({ isModal, setIsModal, onMouseEnter, onMouseLeave }) => {
     const [isMounted, setIsMounted] = useState(false);
     const [activeMobileIndex, setActiveMobileIndex] = useState(null);
     const { courses } = useCourses();
     const categories = [...new Set(courses.map(c => c.category))];
     const [activeCategory, setActiveCategory] = useState(null);
     const filteredCourses =
          !activeCategory
               ? courses
               : courses.filter(c => c.category === activeCategory);

     useEffect(() => {
          setIsMounted(true);
     }, []);

     useEffect(() => {
          const html = document.documentElement;

          if (isModal) {
               const scrollBarWidth =
                    window.innerWidth - html.clientWidth;

               html.style.overflow = "hidden";
               html.style.paddingRight = `${scrollBarWidth}px`;
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
          }
          return () => {
               html.style.overflow = "";
               html.style.paddingRight = "";
          };
     }, [isModal]);

     useEffect(() => {
          if (!isModal) {
               setActiveCategory(null);
               setActiveMobileIndex(null);
          }
     }, [isModal]);

     if (!isMounted) return null;

     return (
          <div
               onClick={() => setIsModal(false)}

               className={`w-full fixed z-[99999] min-h-screen bg-black/40 backdrop-blur-md ${isModal ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-700 ease-in-out`}
          >

               <div onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave} className='w-[98%] md:w-[92%] lg:w-[90%] 2xl:w-[88%] max-w-[1550px] px-6 sm:px-10 fixed bottom-0 left-1/2 -translate-x-1/2 h-screen bg-primary-bg overflow-y-scroll md:overflow-y-hidden z-[99999]'>
                    {/* DESKTOP unchanged */}
                    <div className="hidden md:flex mt-10 items-start justify-center gap-6">
                         <div className='space-y-2 w-[28%] 2xl:w-[22%] shrink-0'>
                              <ProgramsSidebar category="Categories" isHeading={true} />
                              {categories.map((cat) => (
                                   <ProgramsSidebar
                                        key={cat}
                                        category={cat}
                                        isActive={activeCategory === cat}
                                        onClick={(e) => {
                                             e.stopPropagation()
                                             setActiveCategory(activeCategory === cat ? null : cat)
                                        }}
                                   />
                              ))}
                         </div>

                         <div onClick={(e) => e.stopPropagation()} className='flex items-center justify-between flex-wrap w-[70%] 2xl:w-[76%] space-y-2 max-h-[83vh] overflow-y-scroll hide-scrollbar'>
                              {filteredCourses.map((course) => (
                                   <CourseCard key={course._id} course={course} setIsModal={setIsModal} />
                              ))}
                         </div>
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="md:hidden mt-8 space-y-3">
                         <ProgramsSidebar category="Categories" isHeading={true} />
                         {categories.map((cat, index) => {
                              const isOpen = activeMobileIndex === index;

                              const categoryCourses = courses.filter((c) => c.category === cat);

                              return (
                                   <div key={cat} className="overflow-hidden">

                                        {/* Sidebar */}
                                        <div
                                             onClick={(e) => {
                                                  e.stopPropagation()
                                                  setActiveMobileIndex(isOpen ? null : index)
                                             }}
                                             className="cursor-pointer"
                                        >
                                             <ProgramsSidebar
                                                  category={cat}
                                                  isActive={isOpen}
                                             />
                                        </div>

                                        {/* Same animation block */}
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
                                                            key={course._id}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="min-w-62.5 shrink-0"
                                                       >
                                                            <CourseCard course={course} setIsModal={setIsModal} />
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>

                                   </div>
                              );
                         })}
                    </div>

               </div>

          </div>
     );
};

export default ProgramModal;