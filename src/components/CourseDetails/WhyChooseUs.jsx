"use client";

import React from "react";
import { GraduationCap, BadgeDollarSign, UserCog, Zap, Layers, CalendarCheck, Award, ShieldCheck, HeartHandshake } from "lucide-react";

const ICON_MAP = {
     graduationCap: GraduationCap,
     badgeDollarSign: BadgeDollarSign,
     userCog: UserCog,
     zap: Zap,
     layers: Layers,
     calendarCheck: CalendarCheck,
     award: Award,
     shieldCheck: ShieldCheck,
     heartHandshake: HeartHandshake
};

export default function WhyChooseUs({ data }) {
     const whyData = data?.whyChooseUs || {};

     const sectionTitle = whyData.title || "Why Choose Us?";
     const sectionSubtitle = whyData.subtitle || "Real stories from learners who achieved career growth with our SAP courses.";

     const defaultCards = [
          {
               iconName: "graduationCap",
               title: "Qualified Candidates Pool",
               description: "Access a diverse range of ready-to-hire professionals"
          },
          {
               iconName: "badgeDollarSign",
               title: "No Cost Hiring",
               description: "Completely free recruitment"
          },
          {
               iconName: "userCog",
               title: "Dedicated Manager",
               description: "Receive personalized support throughout the hiring process"
          },
          {
               iconName: "zap",
               title: "Faster Hiring",
               description: "Reduce hiring time significantly"
          },
          {
               iconName: "layers",
               title: "Expertise in 150+ Technologies",
               description: "From Data Science to Cyber Security, find experts in any field."
          },
          {
               iconName: "calendarCheck",
               title: "Year-Round Hiring",
               description: "Flexible hiring options available anytime."
          }
     ];

     const items = (Array.isArray(whyData.items) && whyData.items.length > 0)
          ? whyData.items
          : defaultCards;

     const renderIcon = (iconName, idx) => {
          const IconComponent = ICON_MAP[iconName] || (idx % 3 === 0 ? GraduationCap : idx % 3 === 1 ? BadgeDollarSign : UserCog);
          return <IconComponent className="w-6 h-6 text-primary stroke-2" />;
     };

     return (
          <section className="w-full py-12 sm:py-16 md:py-20 bg-primary-bg/40 font-open-sans relative z-1 overflow-hidden border-b border-gray-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
                    
                    {/* Header Section */}
                    <div className="text-center space-y-2 max-w-3xl mx-auto mb-10 md:mb-14">
                         <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-[#0050B3] border border-primary/20 mb-1">
                              WHY CHOOSE US
                         </span>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
                              {sectionTitle}
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed mt-2">
                              {sectionSubtitle}
                         </p>
                    </div>

                    {/* 6 Cards Grid (3 columns on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {items.map((card, idx) => (
                              <div
                                   key={idx}
                                   className="group bg-white rounded-[20px] p-6 sm:p-7 flex flex-col justify-start text-left shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200/90 hover:border-primary/40"
                              >
                                   {/* Icon Container */}
                                   <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                                        {renderIcon(card.iconName, idx)}
                                   </div>

                                   {/* Card Title */}
                                   <h3 className="font-bold text-lg sm:text-xl text-secondary mt-4 mb-1.5 leading-snug">
                                        {card.title}
                                   </h3>

                                   {/* Underline Accent */}
                                   <div className="w-8 h-1 my-2 rounded-full bg-primary transition-all duration-300 group-hover:w-12" />

                                   {/* Card Description */}
                                   <p className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed">
                                        {card.description}
                                   </p>
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}
