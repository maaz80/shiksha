"use client";

import React from "react";
import { TrendingUp, Clock, RefreshCw, ShieldCheck, Coins, BarChart3 } from "lucide-react";

export default function CourseBenefits({ data }) {
     const courseName = data?.title || "UI/UX Design";
     
     const tag = data?.benefitsTag?.trim() || `WHY ${courseName.toUpperCase()}?`;
     const title = data?.benefitsTitle?.trim() || `Benefits of ${courseName}`;
     const subtitle = data?.benefitsSubtitle?.trim() || `${courseName} helps learners and businesses streamline workflows, improve efficiency, and drive smarter decisions.`;

     const defaultCards = [
          {
               icon: TrendingUp,
               title: "Improved Accuracy & Quality",
               description: "Automates processes and reduces manual errors, ensuring accurate and reliable results."
          },
          {
               icon: Clock,
               title: "Real-Time Visibility",
               description: "Get real-time insights into your data to make faster and more informed decisions."
          },
          {
               icon: RefreshCw,
               title: "Streamlined Processes",
               description: "Integrates core workflows, improving efficiency and reducing operational complexity."
          },
          {
               icon: ShieldCheck,
               title: "Better Compliance & Risk",
               description: "Ensures compliance with industry standards and internal policies, mitigating operational risks."
          },
          {
               icon: Coins,
               title: "Cost & Resource Optimization",
               description: "Helps identify cost-saving opportunities and optimizes resource allocation across projects."
          },
          {
               icon: BarChart3,
               title: "Scalability & Growth",
               description: "Supports long-term growth with scalable solutions that adapt to evolving organizational needs."
          }
     ];

     const cardsList = (Array.isArray(data?.benefitsCards) && data.benefitsCards.length > 0)
          ? data.benefitsCards
          : defaultCards;

     const hasKeyword = title.toLowerCase().startsWith("benefits of");
     const displayTitle = hasKeyword ? (
          <>
               Benefits of <span className="text-primary">{title.substring(12)}</span>
          </>
     ) : title;

     return (
          <section className="w-full py-12 sm:py-16 md:py-20 bg-primary-bg/30 font-open-sans border-b border-gray-100 relative z-1">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                    
                    <div className="text-center space-y-2 max-w-3xl mx-auto mb-10 md:mb-14">
                         <div>
                              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 mb-1">
                                   {tag}
                              </span>
                         </div>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
                              {displayTitle}
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed mt-2">
                              {subtitle}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {cardsList.map((item, idx) => {
                              const Icon = item.icon || TrendingUp;

                              return (
                                   <div
                                        key={idx}
                                        className="group bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 border border-gray-200/90 hover:border-primary/40"
                                   >
                                        <div>
                                             <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-all duration-300 bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white">
                                                  <Icon size={22} className="shrink-0" />
                                             </div>
                                             <h3 className="font-bold text-lg sm:text-xl text-secondary leading-snug mb-1.5">
                                                  {item.title}
                                             </h3>
                                             <div className="w-8 h-1 rounded-full my-2 bg-primary transition-all duration-300 group-hover:w-12" />
                                             <p className="text-xs sm:text-sm font-normal leading-relaxed text-gray-600">
                                                  {item.description}
                                             </p>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

               </div>
          </section>
     );
}
