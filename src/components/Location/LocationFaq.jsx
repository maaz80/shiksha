"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CourseSectionHeading from "../CourseDetails/CourseSectionHeading";

const defaultFaqs = [
     {
          ques: "What Does Royalty Free Mean?",
          ans:
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
     {
          ques: "What Does Royalty Free Mean?",
          ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
     {
          ques: "What Does Royalty Free Mean?",
          ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
];

export default function LocationFaq({ location, title, subtitle, align = "center" }) {
     const [activeIndex, setActiveIndex] = useState(0);

     const faqs = (location?.page?.faq && location.page.faq.length > 0)
          ? location.page.faq
          : defaultFaqs;

     const displayTitle = title || location?.page?.faqTitle || "Frequently Asked Questions";
     let autoHighlight = undefined;
     if (displayTitle) {
          if (displayTitle.toLowerCase().includes("questions")) {
               autoHighlight = "Questions";
          } else if (displayTitle.toLowerCase().includes("faq")) {
               autoHighlight = "FAQ";
          }
     }

     const displaySubtitle = subtitle || location?.page?.faqSubtitle || "Have questions? Everything you need to know about our services and process.";

     return (
          <div id="faqs" className="px-5 py-6 h-auto w-full max-w-450 mx-auto">
               {/* Heading */}
               <CourseSectionHeading
                    variant="testimonial"
                    title={displayTitle}
                    highlightText={autoHighlight}
                    subtitle={displaySubtitle}
                    align={align}
                    className="mb-8 md:mb-12"
               />

               {/* List */}
               <div className="divide-y divide-gray-200">
                    {faqs.map((item, index) => {
                         const isOpen = activeIndex === index;

                         return (
                              <div key={index} className="py-5">
                                   {/* Question */}
                                   <button
                                        onClick={() =>
                                             setActiveIndex(isOpen ? null : index)
                                        }
                                        className="w-full flex items-center justify-between text-left cursor-pointer"
                                   >
                                        <span
                                             className={`text-[16px] xl:text-[18px] cursor-pointer md:text-[18px] transition-all duration-500 ease-in-out hover:text-orange ${isOpen ? "text-orange font-medium" : "text-secondary"}`}
                                        >
                                             {item.ques}
                                        </span>

                                        <ChevronDown
                                             size={20}
                                             className={`transition-all duration-500 ${isOpen ? "rotate-180 text-orange" : "text-secondary"}`}
                                        />
                                   </button>

                                   {/* Answer */}
                                   <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-200 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                                   >
                                        <p className="text-[14px] xl:text-[16px] text-secondary leading-6 pr-10">
                                             {item.ans}
                                        </p>
                                   </div>
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}