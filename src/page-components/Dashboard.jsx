"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useUserAuth } from "../context/UserAuthContext";
import { getCourses } from "../utils/courseService";
import { BookOpen, Video, CheckCircle2, Lock, Unlock, Play, PlayCircle, X, Film, AlertCircle } from "lucide-react";
import HorizontalCourseCard from "../components/HorizontalCourseCard";
import CloudinaryImage from "../components/CloudinaryImage";
import Form from "../components/CourseDetails/Form";

const getEmbedUrl = (url) => {
     if (!url) return "";
     const cleanUrl = url.trim();

     if (cleanUrl.includes("youtu.be/")) {
          const videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/shorts/")) {
          const videoId = cleanUrl.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/watch")) {
          const urlParams = new URLSearchParams(cleanUrl.split("?")[1] || "");
          const videoId = urlParams.get("v");
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/embed/")) {
          return cleanUrl.includes("?") ? `${cleanUrl}&autoplay=1` : `${cleanUrl}?autoplay=1`;
     }

     if (cleanUrl.includes("drive.google.com")) {
          if (cleanUrl.includes("/view")) {
               return cleanUrl.replace("/view", "/preview");
          }
          if (!cleanUrl.includes("/preview")) {
               return `${cleanUrl.split("?")[0]}/preview`;
          }
     }

     if (cleanUrl.includes("loom.com/share/")) {
          const videoId = cleanUrl.split("loom.com/share/")[1]?.split("?")[0];
          if (videoId) return `https://www.loom.com/embed/${videoId}`;
     }

     if (cleanUrl.includes("vimeo.com/") && !cleanUrl.includes("player.vimeo.com")) {
          const videoId = cleanUrl.split("vimeo.com/")[1]?.split("?")[0];
          if (videoId) return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
     }

     return cleanUrl;
};

const isIframeVideo = (url) => {
     if (!url) return false;
     const u = url.toLowerCase();
     return u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com") || u.includes("drive.google.com") || u.includes("loom.com");
};

export default function Dashboard() {
     const { user, isLoggedIn, loading: authLoading, isCourseUnlocked } = useUserAuth();
     const [courses, setCourses] = useState([]);
     const [coursesLoading, setCoursesLoading] = useState(true);
     const [activeTab, setActiveTab] = useState("my-courses"); // "my-courses" | "session-recordings"
     const [selectedVideo, setSelectedVideo] = useState(null); // { videoUrl, title }

     // Route Guard: Non-logged-in users cannot access dashboard page. Redirect to home page "/" immediately!
     useEffect(() => {
          if (!authLoading && !isLoggedIn) {
               if (typeof window !== "undefined") {
                    window.location.href = "/";
               }
          }
     }, [authLoading, isLoggedIn]);

     useEffect(() => {
          const fetchAllCourses = async () => {
               setCoursesLoading(true);
               try {
                    const data = await getCourses();
                    setCourses(Array.isArray(data) ? data : []);
               } catch (err) {
                    console.error("Dashboard fetch courses error:", err);
               } finally {
                    setCoursesLoading(false);
               }
          };

          fetchAllCourses();
     }, []);

     // Split into Unlocked Courses vs Locked Courses
     const unlockedCourses = useMemo(() => courses.filter((c) => isCourseUnlocked(c)), [courses, isCourseUnlocked]);
     const lockedCourses = useMemo(() => courses.filter((c) => !isCourseUnlocked(c)), [courses, isCourseUnlocked]);

     // Recordings MUST ONLY come from UNLOCKED courses (🎬 Course Session Recording Videos)
     const recordingCourses = useMemo(() => {
          return unlockedCourses.filter((c) => Array.isArray(c.videos) && c.videos.length > 0);
     }, [unlockedCourses]);

     const totalVideosCount = useMemo(() => {
          return recordingCourses.reduce((sum, c) => sum + (c.videos?.length || 0), 0);
     }, [recordingCourses]);

     const handleOpenAuth = () => {
          if (typeof window !== "undefined") {
               window.dispatchEvent(new CustomEvent("openAuthModal"));
          }
     };

     if (authLoading || coursesLoading) {
          return (
               <div className="min-h-[75vh] flex items-center justify-center bg-primary-bg/30">
                    <div className="flex flex-col items-center space-y-3">
                         <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-secondary font-semibold text-xs">Loading Student Dashboard...</p>
                    </div>
               </div>
          );
     }

     if (!isLoggedIn) {
          return (
               <main className="min-h-[75vh] bg-primary-bg/30 py-16 px-4">
                    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 text-center space-y-6">
                         <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
                              <BookOpen size={32} />
                         </div>

                         <div className="space-y-2">
                              <h1 className="text-2xl font-bold text-secondary">
                                   Student Dashboard Access
                              </h1>
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                   Please log in to your account to view your unlocked course materials and session recordings.
                              </p>
                         </div>

                         <div className="pt-2 flex flex-col gap-3">
                              <button
                                   onClick={handleOpenAuth}
                                   className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                              >
                                   Log In / Sign Up
                              </button>

                              <Link
                                   href="/courses"
                                   className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-secondary font-semibold rounded-xl text-xs transition-all text-center"
                              >
                                   Browse All Courses
                              </Link>
                         </div>
                    </div>
               </main>
          );
     }

     return (
          <main className="min-h-screen text-secondary py-10 mt- px-4 sm:px-6 lg:px-12 open-sans">
               <div className="max-w-7xl mx-auto space-y-8">

                    {/* GREETING BANNER */}
                    <div className="space-y-1">
                         <div className="flex items-center gap-2">
                              <span className="text-2xl">🎓</span>
                              <h1 className="text-2xl sm:text-3xl font-bold text-secondary">
                                   Student Dashboard
                              </h1>
                         </div>
                         <p className="text-xs sm:text-sm text-gray-600 font-medium">
                              Welcome back, <strong className="text-secondary">{user?.name || "Student"}</strong>! Access your unlocked courses and live session recordings.
                         </p>
                    </div>

                    {/* TOP SUMMARY STAT CARDS (2 CARDS) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                         {/* Card 1: Course To do */}
                         <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                   <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                        <CheckCircle2 size={13} /> Active Learning
                                   </span>
                                   <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                                        Course To Do
                                   </h2>
                                   <p className="text-xs text-gray-600 font-medium">
                                        <strong className="text-emerald-600 text-sm font-bold">{unlockedCourses.length}</strong> course{unlockedCourses.length !== 1 ? 's' : ''} enrolled & unlocked.
                                   </p>
                              </div>
                              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                                   <BookOpen size={24} />
                              </div>
                         </div>

                         {/* Card 2: Recordings */}
                         <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                   <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                                        <Video size={13} /> Live Archive
                                   </span>
                                   <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                                        Recordings ({totalVideosCount})
                                   </h2>
                                   <p className="text-xs text-gray-600 font-medium">
                                        Access recorded live lectures & session workshops for unlocked courses.
                                   </p>
                              </div>
                              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                                   <Video size={24} />
                              </div>
                         </div>
                    </div>

                    {/* MAIN NAVIGATION TOGGLE TABS */}
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-4 overflow-x-auto">
                         <button
                              onClick={() => setActiveTab("my-courses")}
                              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "my-courses"
                                        ? "bg-primary text-white shadow-md font-bold"
                                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                   }`}
                         >
                              <BookOpen size={16} />
                              <span>My Courses</span>
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${activeTab === "my-courses" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}>
                                   {unlockedCourses.length}
                              </span>
                         </button>

                         <button
                              onClick={() => setActiveTab("session-recordings")}
                              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "session-recordings"
                                        ? "bg-primary text-white shadow-md font-bold"
                                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                   }`}
                         >
                              <Video size={16} />
                              <span>Session Recordings</span>
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${activeTab === "session-recordings" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}>
                                   {totalVideosCount}
                              </span>
                         </button>
                    </div>

                    {/* MAIN BODY GRID: LEFT CONTENT + RIGHT SIDEBAR */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                         {/* LEFT COLUMN */}
                         <div className="lg:col-span-2 space-y-8">
                              {/* TAB 1: MY COURSES VIEW */}
                              {activeTab === "my-courses" && (
                                   <div className="space-y-8">
                                        {/* SECTION A: ENROLLED / UNLOCKED COURSES */}
                                        <div className="space-y-4">
                                             <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-2">
                                                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                                       <h2 className="text-lg sm:text-xl font-bold text-secondary">
                                                            Enrolled Courses (Unlocked)
                                                       </h2>
                                                  </div>
                                                  <span className="text-xs text-gray-500 font-semibold">
                                                       {unlockedCourses.length} Unlocked
                                                  </span>
                                             </div>

                                             {unlockedCourses.length > 0 ? (
                                                  <div className="flex flex-col gap-4">
                                                       {unlockedCourses.map((course) => (
                                                            <HorizontalCourseCard
                                                                 key={course._id}
                                                                 course={course}
                                                                 unlocked={true}
                                                            />
                                                       ))}
                                                  </div>
                                             ) : (
                                                  <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-3">
                                                       <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                                                       <h3 className="text-sm font-bold text-gray-800">No Unlocked Courses Yet</h3>
                                                       <p className="text-xs text-gray-500 max-w-sm mx-auto">
                                                            Once our team unlocks a course for your account, your course access will appear here.
                                                       </p>
                                                  </div>
                                             )}
                                        </div>

                                        {/* SEPARATOR BORDER BETWEEN UNLOCKED AND LOCKED */}
                                        <div className="pt-4 border-t-2 border-gray-200 my-6 sm:my-8" />

                                        {/* SECTION B: REMAINING LOCKED COURSES */}
                                        {lockedCourses.length > 0 && (
                                             <div className="space-y-4">
                                                  <div className="flex items-center justify-between">
                                                       <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                                            <h2 className="text-lg sm:text-xl font-bold text-secondary">
                                                                 Remaining Courses (Locked)
                                                            </h2>
                                                       </div>
                                                       <span className="text-xs text-gray-500 font-semibold">
                                                            {lockedCourses.length} Available
                                                       </span>
                                                  </div>

                                                  <div className="flex flex-col gap-4">
                                                       {lockedCourses.map((course) => (
                                                            <HorizontalCourseCard
                                                                 key={course._id}
                                                                 course={course}
                                                                 unlocked={false}
                                                            />
                                                       ))}
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              )}

                              {/* TAB 2: SESSION RECORDINGS VIEW (ONLY UNLOCKED COURSES '🎬 Course Session Recording Videos') */}
                              {activeTab === "session-recordings" && (
                                   <div className="space-y-6">
                                        {recordingCourses.length > 0 ? (
                                             recordingCourses.map((course) => {
                                                  const courseVideos = course.videos || [];
                                                  return (
                                                       <div key={course._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
                                                            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                                                 <div>
                                                                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                                                           {course.category || "Track"}
                                                                      </span>
                                                                      <h3 className="text-lg font-bold text-secondary mt-0.5">
                                                                           {course.title}
                                                                      </h3>
                                                                 </div>
                                                                 <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1">
                                                                      <Film size={12} /> {courseVideos.length} Video{courseVideos.length !== 1 ? 's' : ''}
                                                                 </span>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                                 {courseVideos.map((v, vIdx) => (
                                                                      <div
                                                                           key={vIdx}
                                                                           onClick={() => setSelectedVideo({ videoUrl: v.video, title: v.title || `${course.title} - Session #${vIdx + 1}` })}
                                                                           className="group relative bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:border-primary/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between"
                                                                      >
                                                                           {/* Thumbnail & Video Badges Overlay */}
                                                                           <div className="relative aspect-video bg-gray-950 overflow-hidden">
                                                                                <CloudinaryImage
                                                                                     src={v.thumbnail || course.image}
                                                                                     alt={v.title || course.title}
                                                                                     className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out opacity-90"
                                                                                />
                                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-300" />
                                                                                
                                                                                {/* Live Recording Badge */}
                                                                                <div className="absolute top-3 left-3 z-10">
                                                                                     <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                                                                                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                                                                          Live Session
                                                                                     </span>
                                                                                </div>

                                                                                {/* Session Tag */}
                                                                                <div className="absolute top-3 right-3 z-10">
                                                                                     <span className="bg-primary text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                                                          #{vIdx + 1}
                                                                                     </span>
                                                                                </div>

                                                                                {/* Center Play Button Icon */}
                                                                                <div className="absolute inset-0 z-10 flex items-center justify-center">
                                                                                     <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-primary-hover group-hover:shadow-primary/40 transition-all duration-300 ring-4 ring-white/30">
                                                                                          <Play size={20} fill="white" className="ml-0.5" />
                                                                                     </div>
                                                                                </div>
                                                                           </div>

                                                                           {/* Card Content & Action Bar */}
                                                                           <div className="p-4 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                                                                                <div className="space-y-1">
                                                                                     <h4 className="font-bold text-xs sm:text-sm text-secondary group-hover:text-primary transition-colors line-clamp-1">
                                                                                          {v.title || `Session Video #${vIdx + 1}`}
                                                                                     </h4>
                                                                                     {v.alt && (
                                                                                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                                                                                               {v.alt}
                                                                                          </p>
                                                                                     )}
                                                                                </div>

                                                                                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 text-xs font-bold text-primary">
                                                                                     <span className="flex items-center gap-1.5">
                                                                                          <PlayCircle size={14} className="text-primary group-hover:rotate-12 transition-transform" />
                                                                                          Watch Recording
                                                                                     </span>
                                                                                     <span className="text-[11px] text-gray-400 group-hover:text-primary transition-colors font-medium">
                                                                                          HD Video →
                                                                                     </span>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  );
                                             })
                                        ) : (
                                             <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-2">
                                                  <Video className="w-10 h-10 text-gray-400 mx-auto" />
                                                  <h3 className="text-sm font-bold text-secondary">No Session Recordings Available</h3>
                                                  <p className="text-xs text-gray-500">
                                                       Only session recordings for your unlocked courses will appear here once published by your instructor.
                                                  </p>
                                             </div>
                                        )}
                                   </div>
                              )}
                         </div>

                         {/* RIGHT COLUMN: ADMISSION / COUNSELOR FORM */}
                         <div className="lg:col-span-1">
                              <Form />
                         </div>

                    </div>

               </div>

               {/* VIDEO MODAL PLAYER OVERLAY */}
               {selectedVideo && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999999] flex items-center justify-center p-4">
                         <div className="bg-gray-900 text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col h-[75vh] max-h-[700px]">
                              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
                                   <h3 className="text-sm font-bold line-clamp-1">{selectedVideo.title}</h3>
                                   <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
                                   >
                                        <X size={18} />
                                   </button>
                              </div>

                              <div className="bg-black w-full flex-1 flex items-center justify-center relative overflow-hidden">
                                   {selectedVideo.videoUrl ? (
                                        isIframeVideo(selectedVideo.videoUrl) ? (
                                             <iframe
                                                  src={getEmbedUrl(selectedVideo.videoUrl)}
                                                  className="w-full h-full border-0 block"
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                  allowFullScreen
                                             />
                                        ) : (
                                             <video
                                                  key={selectedVideo.videoUrl}
                                                  controls
                                                  autoPlay
                                                  playsInline
                                                  className="w-full h-full object-contain"
                                             >
                                                  <source src={selectedVideo.videoUrl} />
                                                  Your browser does not support the video tag.
                                             </video>
                                        )
                                   ) : (
                                        <div className="p-6 text-center text-gray-400">
                                             <Film className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                                             <p className="text-xs font-semibold">Video stream link not configured for this lesson.</p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               )}
          </main>
     );
}
