"use client";

import { useState } from "react";
import { X, ExternalLink, Copy, Check, Radio, Clock, ShieldCheck } from "lucide-react";

export default function ZoomMeetingModal({ liveClass, courseTitle, onClose }) {
     const [copiedId, setCopiedId] = useState(false);
     const [copiedPass, setCopiedPass] = useState(false);
     const [notification, setNotification] = useState("");

     if (!liveClass) return null;

     const {
          meetUrl = "",
          zoomMeetingId = "",
          passcode = "",
          title = "Live Zoom Session",
          scheduledAt = "Live Now",
          instructions = "",
     } = liveClass;

     let effectiveId = zoomMeetingId;
     let effectivePasscode = passcode;

     // Auto-extract Meeting ID and Passcode if missing from raw meetUrl
     if (meetUrl) {
          if (!effectiveId) {
               const idMatch = meetUrl.match(/\/(?:j|wc\/join)\/(\d+)/);
               if (idMatch && idMatch[1]) effectiveId = idMatch[1];
          }
          if (!effectivePasscode) {
               const pwdMatch = meetUrl.match(/[?&]pwd=([^&]+)/);
               if (pwdMatch && pwdMatch[1]) effectivePasscode = pwdMatch[1];
          }
     }

     const handleCopy = (text, type) => {
          if (!text) return;
          navigator.clipboard.writeText(text);
          if (type === "id") {
               setCopiedId(true);
               setTimeout(() => setCopiedId(false), 2000);
               setNotification("Meeting ID copied to clipboard!");
          } else {
               setCopiedPass(true);
               setTimeout(() => setCopiedPass(false), 2000);
               setNotification("Passcode copied to clipboard!");
          }
          setTimeout(() => setNotification(""), 3000);
     };

     const handleJoinMeeting = () => {
          if (meetUrl) {
               window.open(meetUrl, "_blank", "noopener,noreferrer");
          }
     };

     return (
          <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 open-sans">
               <div className="bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-3xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                         <div className="space-y-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200 uppercase tracking-wider">
                                   <Radio size={12} className="animate-pulse text-red-600" />
                                   Live Zoom Class Active
                              </span>
                              <h2 className="text-lg sm:text-xl font-bold text-secondary">{title}</h2>
                              <p className="text-xs text-gray-500 font-medium">
                                   Course: <strong className="text-gray-800">{courseTitle || "Enrolled Course"}</strong>
                              </p>
                         </div>
                         <button 
                              onClick={onClose} 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
                         >
                              <X size={18} />
                         </button>
                    </div>

                    {/* Notification Toast */}
                    {notification && (
                         <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-3 rounded-xl text-center flex items-center justify-center gap-1.5">
                              <ShieldCheck size={16} />
                              <span>{notification}</span>
                         </div>
                    )}

                    {/* Class Details & Credentials */}
                    <div className="space-y-4 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200/80">
                         <div className="flex items-center justify-between text-xs border-b border-gray-200/80 pb-3">
                              <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                                   <Clock size={14} className="text-primary" /> Scheduled Status:
                              </span>
                              <span className="font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">
                                   {scheduledAt}
                              </span>
                         </div>

                         {/* Meeting ID & Passcode Cards */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              {effectiveId ? (
                                   <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center shadow-2xs">
                                        <div>
                                             <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Meeting ID</span>
                                             <span className="font-mono font-bold text-xs sm:text-sm text-gray-800">{effectiveId}</span>
                                        </div>
                                        <button 
                                             type="button"
                                             onClick={() => handleCopy(effectiveId, "id")} 
                                             className="text-primary hover:text-primary-hover p-1.5 rounded-lg hover:bg-primary/10 transition cursor-pointer"
                                             title="Copy Meeting ID"
                                        >
                                             {copiedId ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                                        </button>
                                   </div>
                              ) : null}

                              {effectivePasscode ? (
                                   <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center shadow-2xs">
                                        <div>
                                             <span className="text-[10px] text-primary font-bold block uppercase tracking-wider">Passcode</span>
                                             <span className="font-mono font-bold text-xs sm:text-sm text-gray-800">{effectivePasscode}</span>
                                        </div>
                                        <button 
                                             type="button"
                                             onClick={() => handleCopy(effectivePasscode, "pass")} 
                                             className="text-primary hover:text-primary-hover p-1.5 rounded-lg hover:bg-primary/10 transition cursor-pointer"
                                             title="Copy Passcode"
                                        >
                                             {copiedPass ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                                        </button>
                                   </div>
                              ) : null}
                         </div>

                         {instructions ? (
                              <div className="pt-2 border-t border-gray-200/80 text-xs text-gray-700 leading-relaxed">
                                   <strong className="text-secondary font-bold">Instructor Notes:</strong> {instructions}
                              </div>
                         ) : null}
                    </div>

                    {/* Join Button */}
                    <button
                         type="button"
                         onClick={handleJoinMeeting}
                         className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-2xl text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
                    >
                         <ExternalLink size={18} />
                         <span>Join Zoom Live Class Now</span>
                    </button>
               </div>
          </div>
     );
}
