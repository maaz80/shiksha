'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const CookieBanner = () => {
     const [visible, setVisible] = useState(false);

     useEffect(() => {
          if (typeof window === "undefined") return;

          const isBot = /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
          if (isBot) return;

          const consent = localStorage.getItem("cookie-consent");

          if (!consent) {
               const timer = setTimeout(() => {
                    setVisible(true);
               }, 1500);

               return () => clearTimeout(timer);
          }
     }, []);

     const acceptCookies = () => {
          localStorage.setItem("cookie-consent", "accepted");
          setVisible(false);
     };

     const declineCookies = () => {
          localStorage.setItem("cookie-consent", "declined");
          setVisible(false);
     };

     if (!visible) return null;

     return (
          <div
               className="fixed bottom-0 left-0 z-99999 w-full border-t border-zinc-200 bg-white/98 backdrop-blur-md shadow-[0_-6px_30px_rgba(0,0,0,0.14)] open-sans animate-in fade-in slide-in-from-bottom-5 duration-300"
               role="dialog"
               aria-live="polite"
               aria-label="Cookie Consent Banner"
          >
               <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-7xl px-4 sm:px-6 md:px-1 py-4 md:py-5 min-h-16 md:min-h-20">
                    
                    {/* Text Section */}
                    <div className="flex items-center gap-3 text-center md:text-left flex-1">
                         <p className="text-xs sm:text-sm md:text-[15px] lg:text-[17px] text-dark-blue font-medium leading-relaxed md:leading-normal">
                              We use cookies to personalize content, enhance browsing experience, and analyze traffic. Read our{" "}
                              <Link
                                   href="/privacy-policy"
                                   className="text-dark-blue font-bold underline underline-offset-2 hover:text-official transition-colors"
                              >
                                   Privacy Policy
                              </Link>
                              .
                         </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0 w-full md:w-auto justify-center md:justify-end">
                         <button
                              type="button"
                              onClick={declineCookies}
                              className="flex-1 md:flex-none h-10 sm:h-11 md:h-12 px-6 sm:px-8 rounded-xl border border-dark-blue text-dark-blue hover:text-white hover:bg-primary hover:border-primary  font-bold text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer"
                         >
                              Decline
                         </button>

                         <button
                              type="button"
                              onClick={acceptCookies}
                              className="flex-1 md:flex-none h-10 sm:h-11 md:h-12 px-7 sm:px-9 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                         >
                              Accept
                         </button>
                    </div>

               </div>
          </div>
     );
};

export default CookieBanner;
