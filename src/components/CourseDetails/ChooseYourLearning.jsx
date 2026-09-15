"use client";

import React from "react";
import { CreditCard, GraduationCap, Calendar, Check, ArrowRight, Sparkles, Percent, Clock, Zap } from "lucide-react";

export default function ChooseYourLearning({ data }) {
     // Support multiple possible dynamic data object paths from backend / props
     const learningData = data?.chooseLearning || data?.chooseYourLearning || data?.learningOptions || {};

     const sectionTitle = learningData.title?.trim() || data?.chooseLearningTitle || "Choose Your Learning Path";
     const sectionSubtitle = learningData.subtitle?.trim() || data?.chooseLearningSubtitle || "Explore flexible payment options, merit scholarships, and upcoming live batch schedules tailored for your growth.";

     // Default EMI Data
     const defaultEmi = {
          title: "EMI OPTION",
          subtitle: "Pay in easy monthly installments",
          badge: "0% INTEREST",
          callout: "Starting from ₹1,667/month",
          points: [
               "0% Interest EMI on selected partner banks",
               "Flexible tenure options (3 to 12 months)",
               "100% Digital approval with zero preclosure fees"
          ]
     };

     // Default Scholarship Data
     const defaultScholarship = {
          title: "SCHOLARSHIP",
          subtitle: "Learn more, pay less",
          badge: "UP TO 30% OFF",
          callout: "Merit & Early Bird Waivers",
          points: [
               "Performance & merit-based fee waivers",
               "Early bird enrollment discounts for fast applicants",
               "Special fee relief for students & fresh graduates"
          ]
     };

     // Default Batches Data
     const defaultBatches = {
          title: "UPCOMING BATCHES",
          subtitle: "Join a schedule that fits your routine",
          badge: "LIVE SESSIONS",
          callout: "Small Batches • 1-on-1 Mentorship",
          items: [
               {
                    dayDate: "01",
                    month: "JUN",
                    title: "Weekend Batch",
                    time: "Sat - Sun • 10:00 AM - 01:00 PM",
                    status: "Seats Available"
               },
               {
                    dayDate: "08",
                    month: "JUN",
                    title: "Weekday Evening Batch",
                    time: "Mon - Fri • 07:00 PM - 09:00 PM",
                    status: "Filling Fast"
               },
               {
                    dayDate: "15",
                    month: "JUN",
                    title: "Fast Track Morning",
                    time: "Mon - Fri • 10:00 AM - 01:00 PM",
                    status: "Upcoming"
               }
          ]
     };

     // Dynamic Merge with Fallbacks for Empty Strings
     const emiRaw = learningData.emi || data?.emi || {};
     const scholarshipRaw = learningData.scholarship || data?.scholarship || {};
     const batchesRaw = learningData.batches || learningData.upcomingBatches || data?.batches || data?.upcomingBatches || {};

     const emi = {
          title: emiRaw.title?.trim() || defaultEmi.title,
          subtitle: emiRaw.subtitle?.trim() || defaultEmi.subtitle,
          badge: emiRaw.badge?.trim() || defaultEmi.badge,
          callout: emiRaw.callout?.trim() || defaultEmi.callout,
          points: (Array.isArray(emiRaw.points) && emiRaw.points.length > 0) ? emiRaw.points : defaultEmi.points
     };

     const scholarship = {
          title: scholarshipRaw.title?.trim() || defaultScholarship.title,
          subtitle: scholarshipRaw.subtitle?.trim() || defaultScholarship.subtitle,
          badge: scholarshipRaw.badge?.trim() || defaultScholarship.badge,
          callout: scholarshipRaw.callout?.trim() || defaultScholarship.callout,
          points: (Array.isArray(scholarshipRaw.points) && scholarshipRaw.points.length > 0) ? scholarshipRaw.points : defaultScholarship.points
     };

     const batches = {
          title: batchesRaw.title?.trim() || defaultBatches.title,
          subtitle: batchesRaw.subtitle?.trim() || defaultBatches.subtitle,
          badge: batchesRaw.badge?.trim() || defaultBatches.badge,
          callout: batchesRaw.callout?.trim() || defaultBatches.callout,
          items: (Array.isArray(batchesRaw.items) && batchesRaw.items.length > 0) ? batchesRaw.items : defaultBatches.items
     };

     const emiPoints = emi.points;
     const scholarshipPoints = scholarship.points;
     const batchItems = batches.items;

     const handleLeadModalOpen = () => {
          if (typeof window !== "undefined") {
               window.dispatchEvent(new CustomEvent("openLeadModal"));
          }
     };

     return (
          <section className="w-full py-12 sm:py-16 md:py-20 bg-secondary text-white font-open-sans relative z-1 overflow-hidden border-b border-gray-800">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    
                    {/* Header */}
                    <div className="text-center space-y-2 max-w-3xl mx-auto mb-10 md:mb-14">
                         <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-white/10 text-white border border-white/20 mb-1">
                              FLEXIBLE PATHWAYS
                         </span>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold text-white leading-tight">
                              {sectionTitle}
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-300 max-w-2xl mx-auto leading-relaxed mt-2">
                              {sectionSubtitle}
                         </p>
                    </div>

                    {/* 3 Equal Height Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                         
                         {/* Card 1: EMI OPTION */}
                         <div className="group bg-white text-secondary rounded-[20px] overflow-hidden border border-gray-200 shadow-md hover:shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300 relative">
                              
                              {/* Header */}
                              <div className="bg-primary-bg/80 p-5 sm:p-6 flex items-center justify-between border-b border-gray-200/80 min-h-22.5">
                                   <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                             <CreditCard className="w-6 h-6" />
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-lg sm:text-xl tracking-wide uppercase leading-tight text-secondary">
                                                  {emi.title}
                                             </h3>
                                             <p className="text-xs font-normal text-gray-600 mt-0.5">
                                                  {emi.subtitle}
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white text-left">
                                   
                                   {/* Callout Banner */}
                                   <div className="bg-primary-bg/50 border border-primary/20 rounded-xl p-3.5 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0">
                                             %
                                        </div>
                                        <div>
                                             <p className="font-bold text-xs sm:text-sm text-secondary leading-snug">
                                                  {emi.callout || "No Cost EMI Available"}
                                             </p>
                                             <span className="text-[11px] font-semibold text-[#0050B3]">
                                                  {emi.badge || "0% Interest Options"}
                                             </span>
                                        </div>
                                   </div>

                                   {/* Points List */}
                                   <ul className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
                                        {emiPoints.map((point, idx) => (
                                             <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-normal text-gray-700">
                                                  <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                                                       <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                                  </span>
                                                  <span className="leading-relaxed flex-1">{point}</span>
                                             </li>
                                        ))}
                                   </ul>

                                   {/* CTA Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm mt-auto"
                                   >
                                        <span>Apply For EMI</span>
                                        <ArrowRight className="w-4 h-4" />
                                   </button>
                              </div>
                         </div>

                         {/* Card 2: SCHOLARSHIP (Featured / Highlighted) */}
                         <div className="group bg-white text-secondary rounded-[20px] overflow-hidden border-2 border-primary/60 shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300 relative">
                              
                              {/* Featured Badge */}
                              <div className="absolute top-3 right-4 z-10">
                                   <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-white shadow-xs">
                                   MOST POPULAR
                                   </span>
                              </div>

                              {/* Header */}
                              <div className="bg-primary/10 p-5 sm:p-6 flex items-center justify-between border-b border-primary/20 min-h-22.5">
                                   <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                                             <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-lg sm:text-xl tracking-wide uppercase leading-tight text-secondary">
                                                  {scholarship.title}
                                             </h3>
                                             <p className="text-xs font-normal text-gray-600 mt-0.5">
                                                  {scholarship.subtitle}
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white text-left">
                                   
                                   {/* Callout Banner */}
                                   <div className="bg-primary/10 border border-primary/30 rounded-xl p-3.5 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0">
                                             <Sparkles size={16} />
                                        </div>
                                        <div>
                                             <p className="font-bold text-xs sm:text-sm text-secondary leading-snug">
                                                  {scholarship.badge || "UP TO 30% OFF"}
                                             </p>
                                             <span className="text-[11px] font-semibold text-[#0050B3]">
                                                  {scholarship.callout || "Eligible for Early Applicants"}
                                             </span>
                                        </div>
                                   </div>

                                   {/* Points List */}
                                   <ul className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
                                        {scholarshipPoints.map((point, idx) => (
                                             <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-normal text-gray-700">
                                                  <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                                                       <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                                  </span>
                                                  <span className="leading-relaxed flex-1">{point}</span>
                                             </li>
                                        ))}
                                   </ul>

                                   {/* CTA Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm mt-auto"
                                   >
                                        <span>Check Scholarship Eligibility</span>
                                        <ArrowRight className="w-4 h-4" />
                                   </button>
                              </div>
                         </div>

                         {/* Card 3: COMING BATCHES */}
                         <div className="group bg-white text-secondary rounded-[20px] overflow-hidden border border-gray-200 shadow-md hover:shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300 relative">
                              
                              {/* Header */}
                              <div className="bg-primary-bg/80 p-5 sm:p-6 flex items-center justify-between border-b border-gray-200/80 min-h-22.5">
                                   <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                             <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-lg sm:text-xl tracking-wide uppercase leading-tight text-secondary">
                                                  {batches.title}
                                             </h3>
                                             <p className="text-xs font-normal text-gray-600 mt-0.5">
                                                  {batches.subtitle}
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white text-left">
                                   
                                   {/* Batches List */}
                                   <div className="space-y-3 flex-1 flex flex-col justify-center">
                                        {batchItems.map((batch, idx) => (
                                             <div key={idx} className="rounded-xl p-3 flex items-center justify-between gap-3 bg-primary-bg/40 border border-gray-200/80 hover:border-primary/40 transition-all">
                                                  <div className="rounded-lg px-2.5 py-1.5 text-center shrink-0 min-w-12 bg-primary text-white shadow-2xs">
                                                       <span className="block font-bold text-xs sm:text-sm leading-none">{batch.dayDate || `0${idx + 1}`}</span>
                                                       <span className="block font-semibold text-[9px] uppercase tracking-wider mt-0.5 leading-none">{batch.month || "JUN"}</span>
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                       <h4 className="font-bold text-xs sm:text-sm leading-tight text-secondary truncate">{batch.title}</h4>
                                                       <p className="text-[11px] font-normal text-gray-500 mt-0.5 leading-normal truncate">{batch.time}</p>
                                                  </div>
                                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 bg-primary/10 text-[#0050B3] border border-primary/20">
                                                       {batch.status || "Upcoming"}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>

                                   {/* CTA Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm mt-auto"
                                   >
                                        <span>Reserve Your Batch Seat</span>
                                        <ArrowRight className="w-4 h-4" />
                                   </button>
                              </div>
                         </div>

                    </div>
               </div>
          </section>
     );
}
