"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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

export default function FAQ({ faqData, title }) {
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

     return (
          <div id="faqs" className=" pt-10 pb-6 h-auto w-full">
               {/* Heading */}
               <h2 className="text-[24px] xl:text-[32px] font-bold text-primary mb-5">
                    {title || faqData?.title || "FAQ"}
               </h2>

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
                                             className={`text-[16px] xl:text-[18px] cursor-pointer md:text-[18px] transition-all duration-500 ease-in-out hover:text-orange ${isOpen ? "text-orange font-medium" : "text-secondary"}`}
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
                                        <p className="text-[14px] xl:text-[16px] text-secondary leading-6 pr-10">
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