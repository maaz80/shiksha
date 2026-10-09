"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CourseSectionHeading from "./CourseDetails/CourseSectionHeading";

const defaultFaqData = [
     {
          question: "What Does Royalty Free Mean?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
     {
          question: "What Does Royalty Free Mean?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
     {
          question: "What Does Royalty Free Mean?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna, donec turpis egestas volutpat. Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in.",
     },
];

export default function FAQ({
     faqData,
     title,
     subtitle,
     highlightText,
     align = "center"
}) {
     const [activeIndex, setActiveIndex] = useState(0);
     const [faqs, setFaqs] = useState(defaultFaqData);

     useEffect(() => {
          if (Array.isArray(faqData) && faqData.length > 0) {
               setFaqs(faqData);
          } else if (faqData?.faq && Array.isArray(faqData.faq) && faqData.faq.length > 0) {
               setFaqs(faqData.faq);
          } else if (faqData?.items && Array.isArray(faqData.items) && faqData.items.length > 0) {
               setFaqs(faqData.items);
          } else {
               setFaqs(defaultFaqData);
          }
     }, [faqData]);

     const rawTitle = title || faqData?.title;
     const displayTitle = rawTitle ? rawTitle : "Frequently Asked Questions";

     let autoHighlight = highlightText;
     if (!autoHighlight) {
          if (displayTitle.toLowerCase().includes("questions")) {
               autoHighlight = "Questions";
          } else if (displayTitle.toLowerCase().includes("faqs")) {
               autoHighlight = "FAQs";
          } else if (displayTitle.toLowerCase().includes("faq")) {
               autoHighlight = "FAQ";
          } else {
               autoHighlight = displayTitle.split(" ").pop();
          }
     }

     const displaySubtitle = subtitle || faqData?.subtitle || "Have questions? Everything you need to know about the course and learning journey.";

     return (
          <div id="faqs" className="px-3 pb-6 h-auto w-full">
               <CourseSectionHeading
                    variant="testimonial"
                    title={displayTitle}
                    highlightText={autoHighlight}
                    subtitle={displaySubtitle}
                    align={align}
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
                                        className="w-full flex items-center justify-between text-left"
                                   >
                                        <span
                                             className={`text-[18px] xl:text-[22px] cursor-pointer md:text-[18px] transition-all duration-500 ease-in-out hover:text-orange ${isOpen ? "text-orange font-medium" : "text-secondary"}`}
                                        >
                                             {item.question || item.ques}
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
                                        <p className="para text-secondary  pr-10">
                                             {item.answer || item.ans}
                                        </p>
                                   </div>
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}