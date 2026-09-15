"use client";

import React from "react";
import { OptimizedImage } from "../CloudinaryImage";

const DeltaIcon = ({ className = "w-5 h-5" }) => (
     <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
               d="M12 3.5L21 19H3L12 3.5Z"
               stroke="currentColor"
               strokeWidth="2.2"
               strokeLinecap="round"
               strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" />
     </svg>
);

export default function CourseCertification({ data }) {
     const courseName = data?.title || "UI/UX Design";
     
     const title = data?.certificationTitle?.trim() || `${courseName} Course Certification`;
     const subtitle = data?.certificationSubtitle?.trim() || `Master ${courseName} Skills & Earn Your Professional Certificate`;

     const defaultBullets = [
          `Industry-recognized ${courseName} certification awarded upon successful course completion.`,
          `Learn from certified ${courseName} trainers and industry experts through practical, hands-on training.`,
          "Gain real-world project experience designed to match current industry requirements.",
          "Receive dedicated career mentorship, interview preparation, and placement assistance."
     ];

     const bullets = (Array.isArray(data?.certificationBullets) && data.certificationBullets.length > 0)
          ? data.certificationBullets
          : defaultBullets;

     const imageSrc = data?.certificationImage || "/images/certification.webp";

     return (
          <section className="w-full bg-secondary py-12 sm:py-16 md:py-20 font-open-sans relative overflow-hidden text-white border-b border-gray-800">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
                         {/* Left Side: Certificate Preview */}
                         <div className="md:col-span-1 w-full flex justify-center lg:justify-start relative">
                              <div className="relative w-full max-w-sm rounded-[20px] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xs group hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                   <div className="aspect-4/5 sm:aspect-3/4 lg:aspect-5/5 w-full relative overflow-hidden bg-linear-to-b from-transparent to-black/60">
                                        <OptimizedImage
                                             src={imageSrc}
                                             alt={title}
                                             width={800}
                                             height={1250}
                                             className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Right Side: Bullets List */}
                         <div className="md:col-span-2 space-y-4 text-left min-w-0">
                              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-white/10 text-white border border-white/20">
                                   CERTIFICATION
                              </span>
                              <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold text-white leading-tight">
                                   {title}
                              </h2>
                              <p className="text-base sm:text-lg font-semibold text-blue-300 leading-snug">
                                   {subtitle}
                              </p>
                              <div className="space-y-4 pt-4 border-t border-white/15">
                                   {bullets.map((bulletText, idx) => (
                                        <div key={idx} className="flex items-start gap-3.5 text-left group min-w-0">
                                             <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                  <DeltaIcon className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
                                             </div>
                                             <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed pt-0.5">
                                                  {bulletText}
                                             </p>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
