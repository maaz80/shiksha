"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import team1 from '../../assets/shikshas-ceo.webp';
import team1_small from '../../assets/shikshas-ceo-small.webp';
import team2 from '../../assets/shikshas-co-founder.webp';
import team2_small from '../../assets/shikshas-co-founder-small.webp';
import CloudinaryImage from "../CloudinaryImage";

export default function TeamCarousel({ data: teamData }) {
     const title = teamData?.title || "Meet The Leadership Team";

     const defaultMembers = [
          {
               name: "Shiksha's CEO",
               img: team1,
               imgSmall: team1_small,
               desc: "A successful entrepreneur and NITK alum with 20+ years of experience, Krishna is among the world’s top business leaders. He co-founded TechUnified before Simplilearn and was its COO.",
          },
          {
               name: "Shiksha's Co-Founder",
               img: team2,
               imgSmall: team2_small,
               desc: "A successful entrepreneur and NITK alum with 20+ years of experience, Krishna is among the world’s top business leaders. He co-founded TechUnified before Simplilearn and was its COO.",
          },
          {
               name: "Shiksha's CEO",
               img: team1,
               imgSmall: team1_small,
               desc: "A successful entrepreneur and NITK alum with 20+ years of experience, Krishna is among the world’s top business leaders. He co-founded TechUnified before Simplilearn and was its COO.",
          },
     ];

     const members = teamData?.members && teamData.members.length > 0
          ? teamData.members.map(item => ({
               name: item.title,
               desc: item.description,
               img: item.image || team1,
          }))
          : defaultMembers;

     const [index, setIndex] = useState(0);

     const prev = () => {
          if (members.length === 0) return;
          setIndex((prev) => (prev - 1 + members.length) % members.length);
     };

     const next = () => {
          if (members.length === 0) return;
          setIndex((prev) => (prev + 1) % members.length);
     };

     // get circular positions
     const getPosition = (i) => {
          if (members.length === 0) return "hidden";
          if (members.length === 1) return i === index ? "center" : "hidden";
          if (members.length === 2) {
               const diff = (i - index + 2) % 2;
               if (diff === 0) return "center";
               if (diff === 1) return "right";
               return "hidden";
          }
          const diff = (i - index + members.length) % members.length;

          if (diff === 0) return "center";
          if (diff === 1) return "right";
          if (diff === members.length - 1) return "left";
          return "hidden";
     };

     if (members.length === 0) return null;

     return (
          <section className="w-full bg-[#f3f6f9] py-12 md:py-16 lg:py-20 text-center">

               {/* Heading */}
               <h2 className="text-center text-[26px] md:text-[36px] lg:text-[48px] font-bold text-primary mb-0 md:mb-16">
                    {title}
               </h2>

               <div className="relative max-w-5xl mx-auto flex items-center justify-center">

                    {/* Left Arrow */}
                    {members.length > 1 && (
                         <button
                              onClick={prev}
                              aria-label="Previous Member"
                              className="absolute left-0 md:left-5 xl:-left-30 cursor-pointer z-20 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                         >
                              <ChevronLeft />
                         </button>
                    )}

                    {/* Cards */}
                    <div className="relative w-full h-105 flex items-center justify-center">

                         {members.map((item, i) => {
                              const pos = getPosition(i);

                              return (
                                   <div
                                        key={i}
                                        className={`absolute transition-all duration-500 ease-in-out flex flex-col items-center
                                                 ${pos === "center" ? "z-20 scale-105 translate-x-0 opacity-100"
                                                  : pos === "left"
                                                       ? "z-10 -translate-x-10 md:-translate-x-50 xl:-translate-x-95 scale-95 opacity-70"
                                                       : pos === "right"
                                                            ? "z-10 translate-x-10 md:translate-x-50 xl:translate-x-95 scale-95 opacity-70"
                                                            : "opacity-0 pointer-events-none"
                                              } `}>

                                        {/* Image */}
                                        <CloudinaryImage
                                             src={item.img}
                                             alt={`${item.name}s Image`}
                                             loading="lazy"
                                             width='120'
                                             height='240'
                                             decoding="async"
                                             className={`${pos === "center"
                                                  ? "w-34 md:w-76"
                                                  : "w-22 md:w-50"
                                                  } object-contain`}
                                             sizes={pos === "center" ? "(max-width: 768px) 136px, 304px" : "(max-width: 768px) 88px, 200px"}
                                             {...(item.imgSmall ? {
                                                  srcSet: `${item.imgSmall} 200w, ${item.img} 380w`
                                             } : {})}
                                        />

                                        {/* Card */}
                                        <div className="bg-[#0050B3] text-white rounded-xl px-5 py-4 -mt-7.5 w-55 md:w-[320px] shadow-lg">
                                             <h3 className="font-bold text-sm md:text-[20px]">
                                                  {item.name}
                                             </h3>
                                             <p className="text-[10px] md:text-sm mt-2 leading-4 md:leading-6">
                                                  {item.desc}
                                             </p>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

                    {/* Right Arrow */}
                    {members.length > 1 && (
                         <button
                              onClick={next}
                              aria-label="Next Member"
                              className="absolute right-0 md:right-5 xl:-right-30 cursor-pointer z-20 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                         >
                              <ChevronRight />
                         </button>
                    )}
               </div>

               {/* Dots */}
               {members.length > 1 && (
                    <div className="flex justify-center mt-0 md:mt-26 gap-0">
                         {members.map((_, i) => (
                              <button
                                   key={i}
                                   onClick={() => setIndex(i)}
                                   aria-label={`Go to slide ${i + 1}`}
                                   aria-current={index === i ? "true" : undefined}
                                   className="p-3 cursor-pointer"
                              >
                                   <span className={`block rounded-full transition-all duration-300
                         ${index === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300"}`}
                                   />
                              </button>
                         ))}
                    </div>
               )}
               
          </section>
     );
}