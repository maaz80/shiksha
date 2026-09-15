"use client";

import React from "react";

export default function HiringPartners({ data }) {
     const hiringData = data?.hiringPartners || {};
     const title = hiringData.title?.trim() || "Our Hiring Partners";
     const subtitle = hiringData.subtitle?.trim() || "Trusted by top companies across India";

     const partnerLogos = [
          { image: "/images/google-logo-icon.webp" },
          { image: "/images/course-report.png" },
          { image: "/images/switchup.png" },
          { image: "/images/career-karma-logo.png" },
          { image: "/images/Figma.webp" },
          { image: "/images/google-logo-icon.webp" },
          { image: "/images/course-report.png" },
          { image: "/images/switchup.png" },
          { image: "/images/career-karma-logo.png" },
          { image: "/images/Figma.webp" }
     ];

     const validItems = (Array.isArray(hiringData.items) && hiringData.items.length > 0)
          ? hiringData.items.filter(item => item && item.image && String(item.image).trim() !== "")
          : [];

     const displayItems = validItems.length > 0 ? validItems : partnerLogos;

     const row1 = displayItems.slice(0, Math.ceil(displayItems.length / 2));
     const row2 = displayItems.slice(Math.ceil(displayItems.length / 2));

     const targetLength = 12;
     const repeatCount1 = Math.max(2, Math.ceil(targetLength / (row1.length || 1)));
     const repeatCount2 = Math.max(2, Math.ceil(targetLength / (row2.length || 1)));

     const ticker1 = Array(repeatCount1).fill(row1).flat();
     const ticker2 = Array(repeatCount2).fill(row2.length ? row2 : row1).flat();

     return (
          <section className="w-full bg-white py-12 sm:py-16 md:py-20 font-open-sans relative z-1 overflow-hidden border-b border-gray-100">
               <style jsx>{`
                    @keyframes marquee-left {
                         0% { transform: translateX(0%); }
                         100% { transform: translateX(-50%); }
                    }
                    @keyframes marquee-right {
                         0% { transform: translateX(-50%); }
                         100% { transform: translateX(0%); }
                    }
                    .animate-marquee-left {
                         animation: marquee-left 28s linear infinite;
                    }
                    .animate-marquee-right {
                         animation: marquee-right 28s linear infinite;
                    }
                    .animate-marquee-left:hover,
                    .animate-marquee-right:hover {
                         animation-play-state: paused;
                    }
               `}</style>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto mb-10 md:mb-14">
                         <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-[#0050B3] border border-primary/20 mb-1">
                              PLACEMENT NETWORK
                         </span>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
                              Our Hiring <span className="text-primary font-bold">Partners</span>
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed mt-2">
                              {subtitle}
                         </p>
                    </div>

                    <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
                         <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-white to-transparent z-10" />
                         <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-white to-transparent z-10" />

                         {/* Row 1 Marquee */}
                         <div className="flex w-max gap-4 sm:gap-6 animate-marquee-left">
                              {ticker1.map((partner, idx) => (
                                   <div
                                        key={`r1-${idx}`}
                                        className="w-32 sm:w-56 h-14 sm:h-22 bg-primary-bg/30 rounded-[20px] shadow-2xs border border-gray-200/80 px-6 py-4 flex items-center justify-center shrink-0 hover:shadow-md hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                                   >
                                        <img
                                             src={partner.image}
                                             alt="Hiring Partner Logo"
                                             width="130"
                                             height="40"
                                             className="h-6 sm:h-10 w-auto max-w-32.5 sm:max-w-40 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                                        />
                                   </div>
                              ))}
                         </div>

                         {/* Row 2 Marquee */}
                         <div className="flex w-max gap-4 sm:gap-6 animate-marquee-right">
                              {ticker2.map((partner, idx) => (
                                   <div
                                        key={`r2-${idx}`}
                                        className="w-32 sm:w-56 h-14 sm:h-22 bg-primary-bg/30 rounded-[20px] shadow-2xs border border-gray-200/80 px-6 py-4 flex items-center justify-center shrink-0 hover:shadow-md hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                                   >
                                        <img
                                             src={partner.image}
                                             alt="Hiring Partner Logo"
                                             width="130"
                                             height="40"
                                             className="h-6 sm:h-10 w-auto max-w-32.5 sm:max-w-40 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                                        />
                                   </div>
                              ))}
                         </div>

                    </div>
               </div>
          </section>
     );
}
