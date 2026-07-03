"use client";

import { useEffect, useRef, useState } from "react";
import Map from '../../assets/testimonial-map-bg.webp';
import comma from '../../assets/comma.webp';
import testiImage from '../../assets/testi-img.webp';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getAllReviews } from '../../utils/courseService';

const DEFAULT_TESTIMONIALS = [
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The service was top-notch, and the team was incredibly helpful. I highly recommend them to anyone looking for quality and care!"`,
     },
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The service was top-notch, and the team was incredibly helpful. I highly recommend them to anyone looking for quality and care!"`,
     },
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The service was top-notch, and the team was incredibly helpful. I highly recommend them to anyone looking for quality and care!"`,
     },
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The service was top-notch, and the team was incredibly helpful. I highly recommend them to anyone looking for quality and care!"`,
     },
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage?.src || testiImage,
          text: `"I had an amazing experience! The service was top-notch, and the team was incredibly helpful. I highly recommend them to anyone looking for quality and care!"`,
     }
];

const Testimonials = () => {
     const getInitials = (name) => {
          if (!name) return "";
          const parts = name.trim().split(/\s+/);
          if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
          return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
     };

     const sliderRef = useRef();
     const [currentIndex, setCurrentIndex] = useState(0);
     const [maxIndex, setMaxIndex] = useState(0);
     const [testimonialsList, setTestimonialsList] = useState([]);
     const pathname = usePathname();

     const isLocation = pathname.startsWith("/location");
     // ✅ Card width
     const cardWidthRef = useRef(0);

     const calculateCardWidth = () => {
          const slider = sliderRef.current;
          const card = slider?.children[0];

          if (!slider || !card) return;

          const gap = window.innerWidth >= 768 ? 44 : 20;

          // ✅ ONE TIME READ
          cardWidthRef.current = card.getBoundingClientRect().width + gap;
     };

     // ✅ Visible cards
     const visibleCardsRef = useRef(1);

     const calculateVisibleCards = () => {
          const slider = sliderRef.current;
          if (!slider || !cardWidthRef.current) return;

          visibleCardsRef.current = Math.floor(
               slider.offsetWidth / cardWidthRef.current
          );
     };

     // ✅ Fetch all reviews dynamically
     useEffect(() => {
          const fetchReviews = async () => {
               try {
                    const data = await getAllReviews();
                    if (data && data.length > 0) {
                         const formatted = data.map((review) => ({
                              name: review.name,
                              role: review.role || review.courseName || "Student",
                              image: review.image || testiImage?.src || testiImage,
                              text: review.text
                         }));
                         setTestimonialsList(formatted);
                    } else {
                         setTestimonialsList(DEFAULT_TESTIMONIALS);
                    }
               } catch (err) {
                    console.error("Failed to fetch location reviews:", err);
                    setTestimonialsList(DEFAULT_TESTIMONIALS);
               }
          };
          fetchReviews();
     }, []);

     // ✅ Calculate maxIndex (responsive safe)
     useEffect(() => {
          const calculateAll = () => {
               calculateCardWidth();
               calculateVisibleCards();
               setMaxIndex(
                    Math.max(testimonialsList.length - visibleCardsRef.current, 0)
               );
          };

          calculateAll();

          window.addEventListener("resize", calculateAll);
          return () => window.removeEventListener("resize", calculateAll);
     }, [testimonialsList]);

     // ✅ Arrow scroll
     const scroll = (direction) => {
          let newIndex =
               direction === "left"
                    ? Math.max(currentIndex - 1, 0)
                    : Math.min(currentIndex + 1, maxIndex);

          setCurrentIndex(newIndex);

          sliderRef.current.scrollTo({
               left: newIndex * cardWidthRef.current,
               behavior: "auto",
          });
     };

     // ✅ Sync scroll → dots
     useEffect(() => {
          const slider = sliderRef.current;

          let ticking = false;

          const handleScroll = () => {
               if (!ticking) {
                    requestAnimationFrame(() => {
                         if (sliderRef.current) {
                              const index = Math.round(
                                   sliderRef.current.scrollLeft / cardWidthRef.current
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
          <div className='min-h-screen mx-auto w-full px-4 sm:px-6 lg:px-10 pt-18 lg:pt-16 text-secondary bg-primary-bg relative'>
               <img src={Map?.src || Map} alt="Testimonial Map Bg" fetchPriority='high' decoding="async" className='absolute top-0 inset-0 w-full h-[179vh] z-10 object-cover' />

               {/* Heading */}
               <h2 className="plus-jakarta-sans text-3xl md:text-5xl xl:text-[48px] font-bold leading-10 md:leading-15 max-w-140 text-primary text-center z-20 relative mx-auto">
                    What our students say about us
               </h2>

               {/* Description */}
               <p className={`text-[14px] 2xl:text-[16px] leading-6 md:leading-7 text-center ${isLocation ? 'max-w-3xl' : 'max-w-7xl'}  mx-auto mt-6 z-20 relative`}>
                    Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.
               </p>

               <div className="relative z-20 w-full pl-0 md:pl-16">

                    {/* Slider */}
                    <div
                         ref={sliderRef}
                         className="flex gap-5 md:gap-11 overflow-x-auto scroll-smooth hide-scrollbar pt-20 pl-9"
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
                                             sliderRef.current.scrollTo({
                                                  left: i * cardWidthRef.current,
                                                  behavior: "auto",
                                             });
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