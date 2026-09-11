"use client";

import { Briefcase, GraduationCap, Compass, Calculator } from "lucide-react";

export default function WhoShouldEnroll({ data }) {
  const title = data?.whoShouldEnroll?.title || "This Course Is Ideal For";
  const subtitle = data?.whoShouldEnroll?.subtitle || "Real stories and tailored learning tracks for professionals and learners aiming to advance their careers.";

  const defaultCards = [
    {
      icon: Briefcase,
      title: "WORKING PROFESSIONALS",
      description: "Looking to upgrade skills and grow in their career."
    },
    {
      icon: GraduationCap,
      title: "STUDENTS",
      description: "Seeking practical knowledge and industry-ready skills."
    },
    {
      icon: Compass,
      title: "CAREER SWITCHERS",
      description: "Planning to switch to a better role or domain."
    },
    {
      icon: Calculator,
      title: "ACCOUNTING PROFESSIONALS",
      description: "Who want to enhance their expertise and stay competitive."
    }
  ];

  const items = (Array.isArray(data?.whoShouldEnroll?.items) && data.whoShouldEnroll.items.length > 0)
    ? data.whoShouldEnroll.items
    : defaultCards;

  return (
    <section className="w-full bg-secondary text-white font-open-sans relative z-1 py-12 sm:py-16 md:py-20 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/20 text-primary border border-primary/30 mb-1">
            TARGET AUDIENCE
          </span>
          <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base font-normal text-gray-300 max-w-2xl mx-auto leading-relaxed mt-2">
            {subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((card, idx) => {
            const Icon = card.icon || Briefcase;
            return (
              <div
                key={idx}
                className="bg-white rounded-[20px] p-6 sm:p-7 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-200/90 hover:border-primary/40 group min-h-60"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon size={24} className="shrink-0" />
                </div>

                {/* Card Title */}
                <h3 className="font-bold text-lg tracking-wider uppercase text-secondary leading-snug">
                  {card.title}
                </h3>

                {/* Underline Accent */}
                <div className="w-8 h-1 my-3 bg-primary rounded-full group-hover:w-12 transition-all duration-300" />

                {/* Description */}
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
