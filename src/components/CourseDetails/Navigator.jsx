"use client";

import { useState } from "react";

const tabs = [
     { id: "overview", label: "Overview" },
     { id: "curriculum", label: "Curriculum" },
     { id: "faqs", label: "FAQs" },
     { id: "reviews", label: "Reviews" },
     { id: "blogs", label: "Blogs" },
];

const Navigator = () => {
     const [activeTab, setActiveTab] = useState("overview");

     return (
          <div className="border-b border-gray-200 px-2 open-sans">
               <div className="flex items-center gap-3 md:gap-8">
                    {tabs.map((tab) => (
                         <button
                              key={tab.id}
                              onClick={() => {
                                   setActiveTab(tab.id)
                                   document.getElementById(tab.id)?.scrollIntoView({
                                        behavior: 'smooth',
                                   });
                              }}
                              className={`pb-2 cursor-pointer pt-2 text-[12px] md:text-[16px] w-18.25 md:w-33 transition-all duration-200 border-b-2 -mb-0.5
              ${activeTab === tab.id
                                        ? "border-blue-700 text-gray-900 font-medium"
                                        : "border-transparent text-gray-500 hover:text-gray-800"
                                   }`}
                         >
                              {tab.label}
                         </button>
                    ))}
               </div>
          </div>
     );
};

export default Navigator;