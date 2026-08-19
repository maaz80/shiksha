"use client";

import { useEffect, useRef, useState } from "react";
import Map from '../../assets/testimonial-map-bg.webp';
import comma from '../../assets/comma.webp';
import testiImage from '../../assets/testi-img.webp';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getTestimonials } from '../../utils/testimonialService';

const DEFAULT_TESTIMONIALS = [
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The training was top-notch, and the mentors were incredibly helpful. I highly recommend them to anyone looking to level up!"`,
     },
     {
          name: "Alex Carter",
          role: "Full Stack Developer",
          image: testiImage?.src || testiImage,
          text: `"The curriculum is highly industry-relevant. The hands-on projects and community support helped me gain real confidence in web development."`,
     },
     {
          name: "Sophia Martinez",
          role: "Product Designer",
          image: testiImage?.src || testiImage,
          text: `"Mentorship here is outstanding. The guidance on design systems and portfolio reviews completely changed my approach to product design."`,
     },
     {
          name: "David Kim",
          role: "AI Specialist",
          image: testiImage?.src || testiImage,
          text: `"Extremely well-structured courses with deep insights into modern AI. The labs and practical exercises made complex concepts easy to grasp."`,
     },
     {
          name: "Aisha Patel",
          role: "Project Manager",
          image: testiImage?.src || testiImage,
          text: `"Great learning environment and superb support team. The interactive sessions and alumni network added immense value to my career."`,
     }
];

let preloadedTestimonials = [];
try {
     const initialData = await getTestimonials();
     if (Array.isArray(initialData) && initialData.length > 0) {
          preloadedTestimonials = initialData;
     }
} catch (e) {
     // Preload fallback if offline during build
}

const Testimonials = ({ data, initialTestimonials = [] }) => {
     const getInitials = (name) => {
          if (!name) return "";
          const parts = name.trim().split(/\s+/);
          if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
          return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
     };

     const rawInitial = (Array.isArray(initialTestimonials) && initialTestimonials.length > 0)
          ? initialTestimonials
          : preloadedTestimonials;

     const formattedInitial = (Array.isArray(rawInitial) && rawInitial.length > 0)
          ? rawInitial.map((item) => ({
               name: item.name,
               role: item.role || item.courseName || "Student",
               text: item.quote || item.text
          }))
          : [];

     const sliderRef = useRef();
     const [currentIndex, setCurrentIndex] = useState(0);
     const [maxIndex, setMaxIndex] = useState(0);
     const [testimonialsList, setTestimonialsList] = useState(
          formattedInitial.length > 0 ? formattedInitial : DEFAULT_TESTIMONIALS
     );
     const pathname = usePathname();

     const isLocation = pathname ? pathname.startsWith("/location") : false;
     const cardWidthRef = useRef(320);

     const calculateCardWidth = () => {
          const slider = sliderRef.current;
          const card = slider?.children?.[0];

          if (!slider || !card) return;

          const gap = (typeof window !== "undefined" && window.innerWidth >= 768) ? 44 : 20;
          const rectWidth = card.getBoundingClientRect().width;
          if (rectWidth > 0) {
               cardWidthRef.current = rectWidth + gap;
          }
     };

     const visibleCardsRef = useRef(1);

     const calculateVisibleCards = () => {
          const slider = sliderRef.current;
          const cardW = cardWidthRef.current || 320;
          if (!slider || !cardW) return;

          visibleCardsRef.current = Math.max(1, Math.floor(slider.offsetWidth / cardW));
     };

     useEffect(() => {
          let isMounted = true;
          const fetchTestimonialsData = async () => {
               try {
                    const resData = await getTestimonials();
                    if (isMounted && Array.isArray(resData) && resData.length > 0) {
                         const formatted = resData.map((item) => ({
                              name: item.name,
                              role: item.role || item.courseName || "Student",
                              text: item.quote || item.text
                         }));
                         setTestimonialsList(formatted);
                    }
               } catch (e) {
                    console.error("Failed to load testimonials:", e);
               }
          };
          fetchTestimonialsData();
          return () => { isMounted = false; };
     }, []);

     useEffect(() => {
          const calculateAll = () => {
               calculateCardWidth();
               calculateVisibleCards();
               const total = testimonialsList.length;
               const visible = visibleCardsRef.current || 1;
               setMaxIndex(Math.max(0, total - visible));
          };

          calculateAll();

          if (typeof window !== "undefined") {
               window.addEventListener("resize", calculateAll);
               return () => window.removeEventListener("resize", calculateAll);
          }
     }, [testimonialsList]);

     const scroll = (direction) => {
          let newIndex =
               direction === "left"
                    ? Math.max(currentIndex - 1, 0)
                    : Math.min(currentIndex + 1, maxIndex);

          setCurrentIndex(newIndex);

          if (sliderRef.current) {
               sliderRef.current.scrollTo({
                    left: newIndex * (cardWidthRef.current || 320),
                    behavior: "auto",
               });
          }
     };

     useEffect(() => {
          const slider = sliderRef.current;
          let ticking = false;

          const handleScroll = () => {
               if (!ticking) {
                    requestAnimationFrame(() => {
                         if (sliderRef.current) {
                              const cardW = cardWidthRef.current || 320;
                              const index = Math.round(
                                   sliderRef.current.scrollLeft / cardW
                              );
                              setCurrentIndex(index);
                         }
                         ticking = false;
                    });
                    ticking = true;
               }
          };

          if (slider) {
               slider.addEventListener("scroll", handleScroll);
          }

          return () => {
               if (slider) slider.removeEventListener("scroll", handleScroll);
          };
     }, []);

     return (
          <div className='min-h-[80vh] md:min-h-screen mx-auto w-full px-3 sm:px-6 lg:px-10 pt-10 lg:pt-16 text-secondary bg-primary-bg relative'>
               <img src={Map?.src || Map} alt="Testimonial Map Bg" fetchPriority='high' decoding="async" className='absolute top-0 inset-0 w-full h-full z-0 object-cover pointer-events-none' />

               {/* Heading */}
               {isLocation ? (
                    <h2 className="plus-jakarta-sans text-3xl md:text-5xl xl:text-[48px] font-bold leading-10 md:leading-15 max-w-140 text-primary text-center z-20 relative mx-auto">
                         What our students say about us
                    </h2>
               ) : (
                    <h2 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-center w-[99%] md:w-[60%] mx-auto z-20 relative">
                         {data?.startTitle || "What Our"}{" "}
                         <span className="relative inline-block text-orange">
                              {data?.midTitle || "Students"}
                              <svg
                                   className="absolute left-0 -bottom-2 lg:-bottom-6 w-full"
                                   viewBox="0 0 200 20"
                                   preserveAspectRatio="none"
                              >
                                   <path
                                        d="M5 15 Q100 -6 195 5"
                                        stroke="#F97316"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                   />
                              </svg>
                         </span>{' '}
                         {data?.endTitle || "Say About Us"}
                    </h2>
               )}

               {/* Description */}
               <p className={`text-[14px] 2xl:text-[16px] leading-6 md:leading-7 text-center ${isLocation ? 'max-w-3xl':'max-w-7xl'} mx-auto mt-6 z-20 relative`}>
                    {isLocation ? "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs." : (data?.description || "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.") }
               </p>

               <div className="relative z-20 w-full pl-0 md:pl-16">

                    {/* Slider */}
                    <div
                         ref={sliderRef}
                         className="flex gap-5 md:gap-11 overflow-x-auto scroll-smooth hide-scrollbar pt-20 pl-6 md:pl-9"
                    >
                         {testimonialsList.map((item, i) => (
                              <div
                                   key={i}
                                   className="min-w-75 max-w-59.25 2xl:max-w-[320px] rounded-3xl border bg-white/30 p-6 relative min-h-65"
                              >
                                   <img src={comma?.src || comma} alt='comma' className='absolute w-17.5 -top-6 -left-6 z-20' />

                                   <div className="flex items-center gap-3 mb-4">
                                        <div className="w-15 h-15 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg border border-gray-200 shrink-0 select-none">
                                             {getInitials(item.name)}
                                        </div>
                                        <div>
                                             <h2>{item.name}</h2>
                                             <p className="text-orange">{item.role}</p>
                                        </div>
                                   </div>

                                   <p className='line-clamp-5'>{item.text}</p>
                              </div>
                         ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-end gap-3 mt-8">

                         {/* DOTS */}
                         <div className="flex items-center gap-0">
                              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                   <button
                                        key={i}
                                        onClick={() => {
                                             setCurrentIndex(i);
                                             if (sliderRef.current) {
                                                  sliderRef.current.scrollTo({
                                                       left: i * (cardWidthRef.current || 320),
                                                       behavior: "auto",
                                                  });
                                             }
                                        }}
                                        aria-label={`Go to slide ${i + 1}`}
                                        aria-current={currentIndex === i ? "true" : undefined}
                                        className="p-2 md:p-3 cursor-pointer"
                                   >
                                        <span className={`block rounded-full transition-all duration-300
                    ${currentIndex === i ? "w-6 h-2 bg-gray-800" : "w-2 h-2 bg-gray-300"}`}
                                        />
                                   </button>
                              ))}
                         </div>

                         {/* Arrows */}
                         <button
                              onClick={() => scroll("left")}
                              aria-label="Go to Previous Testimonial"
                              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
                         >
                              <ArrowLeft />
                         </button>

                         <button
                              onClick={() => scroll("right")}
                              aria-label="Go to Next Testimonial"
                              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
                         >
                              <ArrowRight />
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default Testimonials;