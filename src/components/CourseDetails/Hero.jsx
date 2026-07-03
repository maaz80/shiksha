"use client";

import { Clock, Users, BarChart3, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { enrollInCourse, getCourseEnrollment, isUserLoggedIn } from "../../utils/auth.js";
import { showSuccessToast, showErrorToast, showInfoToast } from "../../utils/toast.js";

const Hero = ({ course, courseId, setIsLogin }) => {
     const [isEnrolled, setIsEnrolled] = useState(false);
     const [loading, setLoading] = useState(false);
     const [userLoggedIn, setUserLoggedIn] = useState(false);

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
               console.log("User logged in:", loggedIn);
               if (loggedIn) {
                    setUserLoggedIn(true);
                    try {
                         const enrollment = await getCourseEnrollment(courseId);
                         console.log("Enrollment status:", enrollment);
                         setIsEnrolled(enrollment.enrolled);
                    } catch (error) {
                         console.error("Error checking enrollment:", error);
                    }
               } else {
                    setUserLoggedIn(false);
               }
          };

          checkEnrollment();
     }, [courseId]);

     const handleStartNow = async () => {
          console.log("handleStartNow called, userLoggedIn:", userLoggedIn, "isEnrolled:", isEnrolled);
          if (!userLoggedIn) {
               setIsLogin(true)
               return;
          }

          if (isEnrolled) {
               showInfoToast("You are already enrolled in this course");
               return;
          }

          setLoading(true);
          try {
               console.log("Calling enrollInCourse with courseId:", courseId);
               const result = await enrollInCourse(courseId);
               setIsEnrolled(true);
               notifyEnrollmentChanged(result.enrollment || { progress: 0, completedLessons: [] });
               showSuccessToast("Payment successful! You are now enrolled in the course.");
          } catch (error) {
               console.error("Enrollment error in handleStartNow:", error);
               showErrorToast(error.message || "Enrollment failed. Please try again.");
          } finally {
               setLoading(false);
          }
     };
     return (
          <div className="relative w-full bg-primary pt-18 md:pt-24 -pb-2 px-4 md:px-10 h-[55vh] md:h-[47vh]">

               {/* CONTENT WRAPPER */}
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">

                    {/* LEFT CONTENT */}
                    <div className="text-white max-w-4xl">

                         {/* TAG + AUTHOR */}
                         <div className="flex items-center gap-3 mb-4">
                              <span className="bg-white text-black text-xs px-3 py-1 rounded-md">
                                   {course.category || "Development"}
                              </span>
                              <span className="text-sm text-white">
                                   by {course.name || "Instructor"}
                              </span>
                         </div>

                         {/* TITLE */}
                         <h1 className="text-[24px] md:text-[36px] xl:text-[48px] leading-8 md:leading-10 2xl:leading-15 font-bold text-start text-white">
                              {course.title}
                         </h1>


                         <div className="flex items-start flex-col md:flex-row">
                              {/* META */}
                              <div className="flex flex-wrap items-start md:items-center gap-2 md:gap-6 text-sm text-white mt-5 md:mt-0 h-20">
                                   <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-orange" />
                                        <span>{course.courseLength || "--"}</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <Users size={16} className="text-orange" />
                                        <span>{course.students || 0} Students</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <BarChart3 size={16} className="text-orange" />
                                        <span>{course.level || "All levels"}</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <FileText size={16} className="text-orange" />
                                        <span>{course.totalLessons || 0} Lessons</span>
                                   </div>
                              </div>


                              {/* RIGHT CARD */}
                              <div className="md:hidden relative w-72.5 md:w-90 h-69.25 mt-5 md:mt-10 text-secondary z-9999">

                                   <div className="bg-white rounded-xl shadow-xl p-2 border border-gray-100">

                                        {/* PRICE */}
                                        <div className="mb-4 text-center xl:text-start">
                                             <p className="text-[12px] xl:text-[16px] mb-1">
                                                  Total Admission Fee
                                             </p>
                                             <div className="flex items-end gap-1 justify-center xl:justify-start">
                                                  <span className="text-[20px] xl:text-[24px] font-bold">
                                                       ₹{course.fees || '10000'}
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
                                             className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-9 xl:h-12 rounded-md font-medium transition text-[14px] xl:text-[16px] cursor-pointer"
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
                                        <div className="border-t border-gray-200 my-1 xl:my-3 hidden md:block"></div>

                                        {/* DEADLINE */}
                                        <div className="hidden md:block">
                                             <p className="text-xs xl:text-sm mb-1">
                                                  Upcoming Application <span className="hidden xl:block">Deadline</span>
                                             </p>
                                             <p className="text-xs xl:text-sm xl:hidden">
                                                  Deadline is <span className="text-[#C20001]">{course.deadline || '4th Oct 2025'}</span>
                                             </p>
                                             <div className=" items-center justify-between hidden xl:flex">
                                                  <span className="text-[#C20001] font-bold text-[24px]">
                                                       4th Oct 2025
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
                    {/* RIGHT CARD */}
                    <div className="hidden md:block relative w-full md:w-90 h-69.25 mb-0 xl:-mb-10 text-secondary z-9999">

                         <div className="bg-white rounded-xl shadow-xl p-5 border border-gray-100">

                              {/* PRICE */}
                              <div className="mb-4 text-center xl:text-start">
                                   <p className="text-[12px] xl:text-[16px] mb-1">
                                        Total Admission Fee
                                   </p>
                                   <div className="flex items-end gap-1 justify-center xl:justify-start">
                                        <span className="text-[20px] xl:text-[24px] font-bold">
                                             ₹{course.fees || '10000'}
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
                                   className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-9 xl:h-12 rounded-md font-medium transition mb-4 text-[14px] xl:text-[16px] cursor-pointer"
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
                              <div className="border-t border-gray-200 my-1 xl:my-3 hidden md:block"></div>

                              {/* DEADLINE */}
                              <div className="hidden md:block">
                                   <p className="text-xs xl:text-sm mb-1">
                                        Upcoming Application <span className="hidden xl:block">Deadline</span>
                                   </p>
                                   <p className="text-xs xl:text-sm xl:hidden">
                                        Deadline is <span className="text-[#C20001]">{course.deadline || '4th Oct 2025'}</span>
                                   </p>
                                   <div className=" items-center justify-between hidden xl:flex">
                                        <span className="text-[#C20001] font-bold text-[24px]">
                                             {course.deadline || '4th Oct 2025'}
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
