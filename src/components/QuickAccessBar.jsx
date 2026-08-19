'use client';
import React from "react";
import { FiPhoneCall, FiPhone, FiMessageSquare } from "react-icons/fi";
import { useChat } from "../context/ChatContext";

const QuickAccessBar = ({
     barBackground = "fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
     linkClass = "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-semibold text-secondary transition hover:bg-gray-50",
     iconColor = "text-base shrink-0 text-primary",
     liveChatActive = "bg-primary text-white shadow-xs",
     liveChatInactive = "bg-primary text-white hover:bg-primary/80 border border-primary/20",
}) => {
     const { isChatbotOpen, setIsChatbotOpen } = useChat();

     return (
          <div className={barBackground}>
               <div className="mx-auto flex h-14 max-w-4xl open-sans">

                    {/* Request Callback */}
                    <a
                         href="https://wa.me/919311500424?text=Hi! I would like to request a callback."
                         target="_blank"
                         rel="noopener noreferrer"
                         className={linkClass}
                    >
                         <FiPhoneCall className={iconColor} />
                         <span className="hidden sm:inline">
                              Request Callback
                         </span>
                         <span className="sm:hidden">
                              Callback
                         </span>
                    </a>

                    {/* Call */}
                    <a
                         href="tel:919311500424"
                         className={linkClass}
                    >
                         <FiPhone className={iconColor} />
                         <span className="hidden md:inline">
                              Call us at +91 9311500424
                         </span>
                         <span className="md:hidden">
                              Call Now
                         </span>
                    </a>

                    {/* Live Chat */}
                    <div
                         onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                         className="flex flex-1 items-center justify-center gap-2 text-[14px] md:text-sm font-bold text-white transition cursor-pointer mr-2.5 md:mr-0 select-none"
                    >
                         <div className={`flex items-center justify-center bg-primary gap-2 w-35 h-10 my-2 rounded-lg transition-all duration-300 ${isChatbotOpen ? liveChatActive : liveChatInactive}`}>
                              <FiMessageSquare className="text-base shrink-0" />
                              <span>Live Chat</span>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default QuickAccessBar;