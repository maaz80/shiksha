"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { enrollInCourse, getCourseEnrollment, isUserLoggedIn } from "../../utils/auth.js";
import { showSuccessToast, showErrorToast } from "../../utils/toast.js";
import { useUserAuth } from "../../context/UserAuthContext";

const Hero = ({ course, courseId, setIsLogin }) => {
     const router = useRouter();
     const { isCourseUnlocked: checkCourseUnlocked } = useUserAuth();
     const [isEnrolled, setIsEnrolled] = useState(false);
     const [loading, setLoading] = useState(false);
     const [userLoggedIn, setUserLoggedIn] = useState(false);

     const isUnlockedByAuth = checkCourseUnlocked(course || { _id: courseId });

     const notifyEnrollmentChanged = (enrollment) => {
          window.dispatchEvent(new CustomEvent("courseEnrollmentChanged", {
               detail: {
                    courseId,
                    enrolled: true,
                    enrollment,
               },
          }));
     };

     useEffect(() => {
          const checkEnrollment = async () => {
               const loggedIn = isUserLoggedIn();
               if (loggedIn) {
                    setUserLoggedIn(true);
                    try {
                         const enrollment = await getCourseEnrollment(courseId);
                         setIsEnrolled(enrollment.enrolled || isUnlockedByAuth);
                    } catch (error) {
                         console.error("Error checking enrollment:", error);
                    }
               } else {
                    setUserLoggedIn(false);
               }
          };

          checkEnrollment();
     }, [courseId, isUnlockedByAuth]);

     const handleStartNow = async () => {
          if (!userLoggedIn) {
               setIsLogin(true);
               return;
          }

          if (isEnrolled || isUnlockedByAuth) {
               router.push("/dashboard");
               return;
          }

          setLoading(true);
          try {
               const result = await enrollInCourse(courseId);
               setIsEnrolled(true);
               notifyEnrollmentChanged(result.enrollment || { progress: 0, completedLessons: [] });
               showSuccessToast("Payment successful! You are now enrolled in the course.");
               router.push("/dashboard");
          } catch (error) {
               console.error("Enrollment error in handleStartNow:", error);
               showErrorToast(error.message || "Enrollment failed. Please try again.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="relative w-full bg-primary pt-20 pb-8 md:pt-24 md:pb-0 px-4 sm:px-6 md:px-10 h-auto md:h-[47vh] flex flex-col justify-center">

               {/* CONTENT WRAPPER */}
               <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10">

                    {/* LEFT CONTENT */}
                    <div className="text-white w-full max-w-4xl">

                         {/* TAG + AUTHOR */}
                         <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
                              <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                                   {course?.category || "Development"}
                              </span>
                              <span className="text-xs sm:text-sm text-white/90">
                                   by <span className="font-medium text-white">{course?.name || "Instructor"}</span>
                              </span>
                         </div>

                         {/* TITLE */}
                         <h1 className="text-[24px] sm:text-[32px] md:text-[36px] xl:text-[48px] leading-tight font-bold text-start text-white">
                              {course?.title}
                         </h1>

                         {/* MOBILE ADMISSION CARD */}
                         <div className="md:hidden w-full max-w-sm mt-6 text-secondary">
                              <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100 space-y-4">
                                   {/* PRICE */}
                                   <div className="flex items-center justify-between gap-2">
                                        <div>
                                             <p className="text-[12px] text-gray-500 font-medium">
                                                  Total Admission Fee
                                             </p>
                                             <div className="flex items-baseline gap-1.5 mt-0.5">
                                                  <span className="text-2xl font-bold text-secondary">
                                                       ₹{course?.fees || '10000'}
                                                  </span>
                                                  <span className="text-[11px] text-gray-400">
                                                       (Inclusive of all charges)
                                                  </span>
                                             </div>
                                        </div>
                                   </div>

                                   {/* BUTTON */}
                                   <button
                                        onClick={handleStartNow}
                                        disabled={loading}
                                        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition text-sm cursor-pointer shadow-sm"
                                   >
                                        {loading
                                             ? "Processing..."
                                             : isEnrolled
                                                  ? "Continue Learning"
                                                  : userLoggedIn
                                                       ? "Start Now"
                                                       : "Login to Enroll"
                                        }
                                   </button>

                                   {/* DEADLINE (MOBILE) */}
                                   <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                                        <span>Application Deadline:</span>
                                        <span className="text-[#C20001] font-bold">{course?.deadline || '4th Oct 2025'}</span>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* DESKTOP RIGHT CARD */}
                    <div className="hidden md:block relative w-full md:w-146 h-67.5 mb-0 xl:-mb-10 text-secondary z-30">
                         <div className="bg-white rounded-xl shadow-xl p-5 border border-gray-100">
                              {/* PRICE */}
                              <div className="mb-4 text-center xl:text-start">
                                   <p className="text-[12px] xl:text-[16px] mb-1">
                                        Total Admission Fee
                                   </p>
                                   <div className="flex items-end gap-1 justify-center xl:justify-start">
                                        <span className="text-[20px] xl:text-[24px] font-bold">
                                             ₹{course?.fees || '10000'}
                                        </span>
                                        <span className="hidden xl:block text-[12px] mb-1">
                                             (Inclusive of all charges)
                                        </span>
                                   </div>
                              </div>

                              {/* BUTTON */}
                              <button
                                   onClick={handleStartNow}
                                   disabled={loading}
                                   className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-9 xl:h-12 rounded-md font-medium transition mb-4 text-[14px] xl:text-[16px] cursor-pointer"
                              >
                                   {loading
                                        ? "Processing..."
                                        : isEnrolled
                                             ? "Continue Learning"
                                             : userLoggedIn
                                                  ? "Start Now"
                                                  : "Login to Enroll"
                                   }
                              </button>

                              {/* DIVIDER */}
                              <div className="border-t border-gray-200 my-1 xl:my-3"></div>

                              {/* DEADLINE */}
                              <div>
                                   <p className="text-xs xl:text-sm mb-1">
                                        Upcoming Application <span className="hidden xl:block">Deadline</span>
                                   </p>
                                   <p className="text-xs xl:text-sm xl:hidden">
                                        Deadline is <span className="text-[#C20001]">{course?.deadline || '4th Oct 2025'}</span>
                                   </p>
                                   <div className="items-center justify-between hidden xl:flex">
                                        <span className="text-[#C20001] font-bold text-[24px]">
                                             {course?.deadline || '4th Oct 2025'}
                                        </span>
                                        <span className="text-[12px]">
                                             *EMI options available
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default Hero;
