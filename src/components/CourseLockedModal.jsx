"use client";

import { Lock, X } from "lucide-react";

export default function CourseLockedModal({ isOpen, onClose, course }) {
     if (!isOpen) return null;

     const handleEnquire = () => {
          onClose?.();
          if (typeof window !== "undefined") {
               window.dispatchEvent(
                    new CustomEvent("openLeadModal", {
                         detail: { courseId: course?._id || course?.slug }
                    })
               );
          }
     };

     return (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
               <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-center space-y-5 transform transition-all scale-100">

                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer p-1.5 rounded-full hover:bg-gray-100"
                         aria-label="Close"
                    >
                         <X size={18} />
                    </button>

                    {/* Lock Icon */}
                    <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200 shadow-xs">
                         <Lock size={32} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                         <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                              Course Locked 🔒
                         </h3>
                         <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                              {course?.title
                                   ? `"${course.title}" is currently locked for your account.`
                                   : "This course is locked for your account."}{" "}
                              To buy and unlock full access, please enquire with our team.
                         </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-2.5 pt-2">
                         <button
                              onClick={handleEnquire}
                              className="btn-action-primary w-full"
                         >
                              Enquire Now
                         </button>

                         <button
                              onClick={onClose}
                              className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 font-semibold cursor-pointer transition"
                         >
                              Cancel
                         </button>
                    </div>

               </div>
          </div>
     );
}
