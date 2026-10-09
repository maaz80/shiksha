'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronUp } from "react-icons/bs";

// High-resolution fallback WhatsApp SVG Icon
function WhatsAppSVGIcon({ className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#25D366"
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
      />
    </svg>
  );
}

export default function WhatsAppButton({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919311500424",
  defaultMessage = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG || "Hi Shiksha, I visited your website and would like to know more details about your courses.",
  whatsappIcon = "/images/whatsapp-icon.webp"
}) {
  const [imageError, setImageError] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Clean phone number (strip non-digits)
  const cleanPhone = String(phoneNumber).replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  // Show scroll-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScrollTop(window.scrollY > 250);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <aside aria-label="WhatsApp Contact">
        <a
          href={whatsappUrl}
          target="_blank"
          aria-label="Chat with Shiksha Admissions on WhatsApp"
          rel="noopener noreferrer"
          className="group fixed z-40 flex items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl cursor-pointer p-1"
          style={{
            bottom: "8.5rem",
            right: "1.5rem",
            width: "3.75rem",
            height: "3.75rem",
            boxShadow: "0px 8px 24px rgba(37, 211, 102, 0.4)"
          }}
        >
          {/* Subtle pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 group-hover:scale-125 transition-transform duration-500 -z-10 animate-ping"
            style={{ animationDuration: "3s" }}
          />

          {!imageError && whatsappIcon ? (
            <Image
              src={whatsappIcon}
              alt="Shiksha WhatsApp Support"
              width={56}
              height={56}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain rounded-full select-none"
            />
          ) : (
            <WhatsAppSVGIcon className="w-10 h-10" />
          )}

          {/* Hover Tooltip for desktop */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900/95 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-all">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* Smooth Scroll-To-Top Button */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={`fixed z-40 flex items-center justify-center rounded-full bg-white text-secondary hover:text-primary hover:border-primary shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          bottom: "4.25rem",
          right: "1.75rem",
          width: "3.25rem",
          height: "3.25rem",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)"
        }}
      >
        <BsChevronUp className="text-xl font-black" />
      </button>
    </>
  );
}
