"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, Lock, Check, Play, X } from "lucide-react";
import { getCourseEnrollment, completeLessonAndUnlockNext, isUserLoggedIn } from "../../utils/auth.js";
import { showErrorToast, showInfoToast } from "../../utils/toast.js";
import { useUserAuth } from "../../context/UserAuthContext";
import CourseLockedModal from "../CourseLockedModal";

const defaultData = [
     {
          title: "Lessons with video content",
          lessons: 5,
          duration: "45 Mins",
          content: [
               { title: "Lessons with video content", isPreview: true, duration: "12:30", isLocked: false },
               { title: "Lessons with video content", isPreview: false, duration: "12:30", isLocked: false },
               { title: "Lessons with video content", isPreview: true, duration: "12:30", isLocked: true },
               { title: "Lessons with video content", isPreview: false, duration: "12:30", isLocked: true },
               { title: "Lessons with video content", isPreview: false, duration: "12:30", isLocked: true },
          ],
     },
];

export default function Accordion({ sections = [], courseId, course }) {
     const [activeIndex, setActiveIndex] = useState(0);
     const [playingVideo, setPlayingVideo] = useState(null);
     const [showVideoPlayer, setShowVideoPlayer] = useState(false);
     const [isLoadingVideo, setIsLoadingVideo] = useState(false);
     const [userProgress, setUserProgress] = useState(null);
     const [isEnrolled, setIsEnrolled] = useState(false);
     const [loading, setLoading] = useState(true);
     const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);

     const { isCourseUnlocked: checkCourseUnlocked } = useUserAuth();
     const videoRef = useRef(null);
     const data = sections.length ? sections : defaultData;
     const getSectionLessons = (section) => section?.lessons || section?.content || [];

     const isUnlockedByAuth = checkCourseUnlocked(course || { _id: courseId });

     const refreshEnrollment = async () => {
          if (!isUserLoggedIn()) {
               setIsEnrolled(isUnlockedByAuth);
               setUserProgress(null);
               setLoading(false);
               return;
          }

          try {
               const enrollment = await getCourseEnrollment(courseId);
               setIsEnrolled(enrollment.enrolled || isUnlockedByAuth);
               setUserProgress(enrollment.enrollment || null);
          } catch (error) {
               console.error("Error fetching user progress:", error);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          refreshEnrollment();
     }, [courseId, isUnlockedByAuth]);

     useEffect(() => {
          const handleEnrollmentChange = (event) => {
               if (event.detail?.courseId !== courseId) return;
               setIsEnrolled(true);
               setUserProgress(event.detail?.enrollment || { progress: 0, completedLessons: [] });
          };

          window.addEventListener("courseEnrollmentChanged", handleEnrollmentChange);

          return () => {
               window.removeEventListener("courseEnrollmentChanged", handleEnrollmentChange);
          };
     }, [courseId]);

     const calculateTotalDuration = (content) => {
          let totalMinutes = 0;

          content.forEach(lesson => {
               if (!lesson.duration) return;

               if (typeof lesson.duration === "string" && lesson.duration.includes(":")) {
                    const [min, sec] = lesson.duration.split(':').map(Number);
                    totalMinutes += min + (sec / 60);
               } else {
                    const min = parseFloat(lesson.duration);
                    if (!isNaN(min)) totalMinutes += min;
               }
          });

          if (totalMinutes === 0) return "--";

          const hours = Math.floor(totalMinutes / 60);
          const minutes = Math.round(totalMinutes % 60);

          if (hours > 0) {
               return `${hours} hr ${minutes} min`;
          }

          return `${minutes} min`;
     };

     const isLessonUnlocked = (sectionIndex, lessonIndex) => {
          if (isUnlockedByAuth) return true;
          if (!isEnrolled) return false;

          if (userProgress?.completedLessons) {
               if (sectionIndex === 0 && lessonIndex === 0) return true;

               const prevLessonKey = lessonIndex === 0
                    ? `${sectionIndex - 1}-${getSectionLessons(data[sectionIndex - 1]).length - 1}`
                    : `${sectionIndex}-${lessonIndex - 1}`;

               return userProgress.completedLessons.includes(prevLessonKey);
          }

          return sectionIndex === 0 && lessonIndex === 0;
     };

     const isLessonCompleted = (sectionIndex, lessonIndex) => {
          if (!userProgress?.completedLessons) return false;
          return userProgress.completedLessons.includes(`${sectionIndex}-${lessonIndex}`);
     };

     const handleLessonClick = (lesson, sectionIndex, lessonIndex) => {
          const unlocked = isUnlockedByAuth || lesson.isPreview || isLessonUnlocked(sectionIndex, lessonIndex);

          if (!unlocked) {
               setIsLockedModalOpen(true);
               return;
          }

          if (!lesson.videoUrl) {
               console.log("Missing video URL");
               return;
          }

          setIsLoadingVideo(true);
          setPlayingVideo({ ...lesson, sectionIndex, lessonIndex });
          setShowVideoPlayer(true);
     };

     const handleVideoEnd = async () => {
          if (!playingVideo) return;

          const { sectionIndex, lessonIndex } = playingVideo;

          try {
               const result = await completeLessonAndUnlockNext(courseId, sectionIndex, lessonIndex);
               setUserProgress(result.enrollment || { progress: 0, completedLessons: [] });
          } catch (error) {
               console.error("Error completing lesson:", error);
               showErrorToast("Failed to save progress. Please try again.");
          }

          setShowVideoPlayer(false);
          setPlayingVideo(null);
     };

     const closeVideoPlayer = () => {
          setShowVideoPlayer(false);
          setPlayingVideo(null);
          setIsLoadingVideo(false);
          if (videoRef.current) {
               videoRef.current.pause();
          }
     };

     const handleVideoLoaded = () => {
          setIsLoadingVideo(false);
     };

     if (loading) {
          return (
               <div className="max-w-4xl mx-auto open-sans">
                    <h2 className="text-[24px] xl:text-[32px] font-bold text-primary mb-5">
                         Curriculum
                    </h2>
                    <div className="flex justify-center items-center py-8">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
               </div>
          );
     }

     return (
          <>
               <div id='curriculum' className="max-w-4xl mx-auto open-sans">
                    {/* Heading */}
                    <h2 className="text-[24px] xl:text-[32px] font-bold text-primary mb-5">
                         Curriculum
                    </h2>

                    {/* Accordion */}
                    <div className="space-y-4">
                         {data.map((item, index) => {
                              const isOpen = activeIndex === index;
                              const lessons = getSectionLessons(item);
                              const totalLessons = lessons.length;
                              const duration = calculateTotalDuration(lessons);
                              const content = getSectionLessons(item);

                              return (
                                   <div
                                        key={index}
                                        className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                                   >
                                        {/* Header */}
                                        <button
                                             onClick={() => setActiveIndex(isOpen ? null : index)}
                                             className={`w-full cursor-pointer flex items-center justify-between px-5 py-4 text-left transition-all ${isOpen ? "bg-transparent" : "bg-transparent"}`}
                                        >
                                             <div className="flex items-center gap-3">
                                                  <ChevronDown
                                                       className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                                       size={18}
                                                  />
                                                  <span className={`text-[15px] hover:text-orange ${isOpen ? "text-orange" : "text-gray-700"}`}>
                                                       {item.title || "Section"}
                                                  </span>
                                             </div>

                                             <div className="text-sm text-gray-500 flex gap-4">
                                                  <span>{totalLessons} Lessons</span>
                                                  <span>{duration}</span>
                                             </div>
                                        </button>

                                        {/* Content */}
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}>
                                             <div className="px-5 pb-4 space-y-3">
                                                  {content.map((lesson, i) => {
                                                       const isUnlocked = isUnlockedByAuth || lesson.isPreview || isLessonUnlocked(index, i);
                                                       const isCompleted = isLessonCompleted(index, i);
                                                       const canPlay = (isUnlocked || lesson.isPreview) && lesson.videoUrl;

                                                       return (
                                                            <div
                                                                 key={i}
                                                                 onClick={() => handleLessonClick(lesson, index, i)}
                                                                 className={`flex items-center justify-between h-15 rounded-2xl px-6 py-3 transition-all duration-500 ease-in-out text-sm mt-3 group ${isUnlocked ? 'cursor-pointer hover:bg-primary hover:text-white' : 'cursor-pointer hover:bg-amber-50 text-gray-400'
                                                                      }`}
                                                            >
                                                                 <div className="flex items-center gap-3">
                                                                      {canPlay ? <Play size={16} /> : <FileText size={16} />}
                                                                      <span>{lesson.title}</span>
                                                                 </div>

                                                                 <div className="flex items-center gap-3">
                                                                      {lesson.isPreview && (
                                                                           <span className="group-hover:bg-white group-hover:text-primary bg-primary text-white text-xs px-2 py-1 rounded font-bold">
                                                                                Preview
                                                                           </span>
                                                                      )}

                                                                      <span>{lesson.duration || "--"} min</span>

                                                                      {isCompleted ? (
                                                                           <Check size={16} className="text-green-500" />
                                                                      ) : isUnlocked ? (
                                                                           <Check size={16} className="group-hover:text-white text-gray-700" />
                                                                      ) : (
                                                                           <Lock size={16} className="text-amber-500" />
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       );
                                                  })}
                                             </div>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>

               {/* Loading Modal */}
               {isLoadingVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                         <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                              <p className="text-gray-700 font-medium">Loading video...</p>
                         </div>
                    </div>
               )}

               {/* Video Player Modal */}
               {showVideoPlayer && playingVideo && (
                    <div className="fixed inset-0 bg-white/30 backdrop-blur-lg flex items-center justify-center z-[999999] h-screen">
                         <div className="relative w-full h-screen max-w-350 max-h-screen p-4">
                              <button
                                   onClick={closeVideoPlayer}
                                   className="absolute top-3 -right-10 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all cursor-pointer"
                              >
                                   <X size={24} />
                              </button>

                              <div className="rounded-2xl w-full overflow-hidden h-[99vh] flex items-center justify-center mt-10 md:mt-0">
                                   <video
                                        ref={videoRef}
                                        src={playingVideo.videoUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-[99vh] object-fill "
                                        onEnded={handleVideoEnd}
                                        onLoadedData={handleVideoLoaded}
                                   >
                                        Your browser does not support the video tag.
                                   </video>
                              </div>
                         </div>
                    </div>
               )}

               {/* Course Locked Modal */}
               <CourseLockedModal
                    isOpen={isLockedModalOpen}
                    onClose={() => setIsLockedModalOpen(false)}
                    course={course || { _id: courseId }}
               />
          </>
     );
}
