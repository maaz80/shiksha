"use client";

import React from "react";
import Link from "next/link";
import { UserCheck } from "lucide-react";

export default function ReadyToStartJourney({ data }) {
     const ctaData = data?.readyToStartJourney || {};

     const title = ctaData.title || "Ready to start your journey?";
     const subtitle = ctaData.subtitle || "Embark on your path to success with expert training and a world of opportunities awaiting you.";
     const button1Text = ctaData.button1Text || "Contact us";
     const button1Link = ctaData.button1Link || "/contact-us";
     const button2Text = ctaData.button2Text || "Get A Free Demo";
     const button2Link = ctaData.button2Link || "/contact-us#demo";

     const handleDemoClick = (e) => {
          if (!button2Link || button2Link.includes("#demo")) {
               const demoElement = document.getElementById("demo-class") || document.getElementById("enroll-form");
               if (demoElement) {
                    e.preventDefault();
                    demoElement.scrollIntoView({ behavior: "smooth" });
               }
          }
     };

     return (
          <section className="w-full bg-secondary text-white py-12 sm:py-16 md:py-20 font-open-sans relative z-1 overflow-hidden border-b border-gray-800">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10 text-center">
                    <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight max-w-3xl mx-auto text-white">
                         {title.includes("journey?") ? (
                              <>
                                   Ready to start your <span className="text-primary">journey?</span>
                              </>
                         ) : (
                              title
                         )}
                    </h2>

                    <p className="text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed text-gray-300 mt-3 mb-8 sm:mb-10">
                         {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                         <Link
                              href={button1Link}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer min-w-42.5"
                         >
                              <UserCheck className="w-5 h-5 stroke-[2.5]" />
                              <span>{button1Text}</span>
                         </Link>

                         <Link
                              href={button2Link}
                              onClick={handleDemoClick}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl bg-transparent text-white border-2 border-primary hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer min-w-42.5"
                         >
                              <span>{button2Text}</span>
                         </Link>
                    </div>
               </div>
          </section>
     );
}
