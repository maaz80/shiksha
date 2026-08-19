"use client";

import { useState, useEffect } from "react";
import { X, Lock, CheckCircle2, Send, User, Mail, Phone } from "lucide-react";

const getApiBase = () => {
     let baseUrl = "";
     if (typeof process !== "undefined" && process.env) {
          baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "";
     }
     baseUrl = (baseUrl || "").trim().replace(/\/$/, "");
     if (!baseUrl || baseUrl === "/api") {
          return "http://localhost:5000/api";
     }
     return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

export default function LeadModal() {
     const [isOpen, setIsOpen] = useState(false);
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [phone, setPhone] = useState("");
     const [courseId, setCourseId] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);
     const [toast, setToast] = useState(null);

     const showToastNotification = (msg, type = "success") => {
          setToast({ message: msg, type });
          setTimeout(() => {
               setToast(null);
          }, 4500);
     };

     // Lock background scroll when modal is open
     useEffect(() => {
          if (typeof window === "undefined") return;
          const html = document.documentElement;
          if (isOpen) {
               const scrollbarWidth = window.innerWidth - html.clientWidth;
               html.style.overflow = "hidden";
               if (scrollbarWidth > 0) {
                    html.style.paddingRight = `${scrollbarWidth}px`;
               }
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
          }
          return () => {
               html.style.overflow = "";
               html.style.paddingRight = "";
          };
     }, [isOpen]);

     useEffect(() => {
          if (typeof window === "undefined") return;

          const API_BASE = getApiBase();

          // Event listener for manual trigger ("Download Syllabus", "Enquire Now", etc.)
          const handleOpen = async (e) => {
               const cId = e?.detail?.courseId || window.__currentCourseId || "";

               // Check if user already filled form previously
               let savedUser = null;
               try {
                    const raw = localStorage.getItem("leadUser");
                    if (raw) savedUser = JSON.parse(raw);
               } catch (err) { }

               if (savedUser && savedUser.email) {
                    // DIRECT SEND TO EMAIL! User already filled form previously
                    showToastNotification(`Sending course details to ${savedUser.email}...`, "info");
                    try {
                         const response = await fetch(`${API_BASE}/leads`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                   name: savedUser.name || "Returning Student",
                                   email: savedUser.email,
                                   phone: savedUser.phone || "",
                                   courseId: cId,
                                   source: "Course Page Brochure Request"
                              })
                         });
                         if (response.ok) {
                              showToastNotification(`Syllabus email sent to ${savedUser.email}!`, "success");
                              window.dispatchEvent(new CustomEvent("leadSubmitted"));
                         } else {
                              const errData = await response.json();
                              showToastNotification(`⚠️ ${errData.error || "Could not send email. Please try again."}`, "error");
                         }
                    } catch (fetchErr) {
                         showToastNotification("⚠️ Error sending email. Please check connection.", "error");
                    }
                    return;
               }

               // First time user: open modal form
               setError("");
               setSuccess(false);
               setIsOpen(true);
               setCourseId(cId);
          };

          window.addEventListener("openLeadModal", handleOpen);

          // 2. AUTO POPUP (10 Seconds Delay if not submitted & not shown today)
          const lastShown = localStorage.getItem("leadModalLastShown");
          const now = Date.now();
          const oneDayMs = 24 * 60 * 60 * 1000;
          const isSubmitted = localStorage.getItem("leadSubmitted") === "true";

          let timer = null;
          if (!isSubmitted && (!lastShown || now - Number(lastShown) > oneDayMs)) {
               timer = setTimeout(() => {
                    if (localStorage.getItem("leadSubmitted") !== "true") {
                         setError("");
                         setSuccess(false);
                         setIsOpen(true);
                         setCourseId(window.__currentCourseId || "");
                         localStorage.setItem("leadModalLastShown", now.toString());
                    }
               }, 10000); // 10 Seconds Auto Popup
          }

          return () => {
               if (timer) clearTimeout(timer);
               window.removeEventListener("openLeadModal", handleOpen);
          };
     }, []);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError("");

          if (!name.trim()) {
               setError("Please enter your full name.");
               return;
          }

          const cleanPhone = phone.replace(/\D/g, "");
          if (!cleanPhone) {
               setError("Please enter your mobile number.");
               return;
          }

          if (!/^[0-9]{10}$/.test(cleanPhone)) {
               setError("Please enter a valid 10-digit mobile number.");
               return;
          }

          if (!email.trim()) {
               setError("Please enter your email.");
               return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
               setError("Please enter a valid email address.");
               return;
          }

          setLoading(true);
          try {
               const API_BASE = getApiBase();
               const response = await fetch(`${API_BASE}/leads`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                         name: name.trim(),
                         email: email.trim(),
                         phone: cleanPhone,
                         courseId,
                         source: "Course Page Brochure Request"
                    })
               });

               const contentType = response.headers.get("content-type") || "";
               let data = {};
               if (contentType.includes("application/json")) {
                    data = await response.json();
               } else {
                    const text = await response.text();
                    throw new Error(`Server returned non-JSON response (${response.status})`);
               }

               if (!response.ok) {
                    throw new Error(data.error || "Something went wrong. Please try again.");
               }

               // Save lead user for future direct sends and suppress auto popup
               localStorage.setItem("leadSubmitted", "true");
               localStorage.setItem("leadModalLastShown", Date.now().toString());
               localStorage.setItem("leadUser", JSON.stringify({ name: name.trim(), email: email.trim(), phone: cleanPhone }));

               setSuccess(true);
               setLoading(false);

               // Let other components know the lead has been submitted successfully
               window.dispatchEvent(new CustomEvent("leadSubmitted"));

               // Close modal after 1.5 seconds success state
               setTimeout(() => {
                    setIsOpen(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setCourseId("");
               }, 1500);

          } catch (err) {
               setError(err.message);
               setLoading(false);
          }
     };

     return (
          <>
               {/* Toast Notification */}
               {toast && (
                    <div className="fixed top-20 right-4 md:right-8 z-99999999 flex items-center gap-3 bg-primary text-white px-5 py-3.5 rounded-2xl shadow-2xl font-sans text-xs md:text-sm font-semibold max-w-sm">
                         <Send className="w-5 h-5 text-white shrink-0 animate-pulse" />
                         <span>{toast.message}</span>
                         <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white ml-auto cursor-pointer">
                              <X size={16} />
                         </button>
                    </div>
               )}

               {/* Modal Popup with Full Deep Background Blur */}
               {isOpen && (
                    <div className="fixed inset-0 z-9999999 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 transition-all duration-300">
                         <div className="relative z-10000000 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-gray-900 text-center transform scale-100 transition-all duration-300 animate-in fade-in zoom-in-95 hide-scrollbar">

                              {/* Close Button */}
                              <button
                                   onClick={() => setIsOpen(false)}
                                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer p-1.5 rounded-full hover:bg-gray-100"
                                   aria-label="Close"
                              >
                                   <X size={18} />
                              </button>

                              {success ? (
                                   <div className="py-6 flex flex-col items-center">
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-200 animate-bounce">
                                             <CheckCircle2 size={32} />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Syllabus Sent to Email!</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                             Thank you for sharing your details. The complete course syllabus and curriculum details have been sent to your email address.
                                        </p>
                                   </div>
                              ) : (
                                   <>
                                        {/* Lock Icon */}
                                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-200 shadow-xs">
                                             <Lock size={22} />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                             Unlock Curriculum
                                        </h3>

                                        <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">
                                             Enter your details below to instantly unlock all chapters, lessons, and topics.
                                        </p>

                                        <form onSubmit={handleSubmit} className="text-left space-y-4">
                                             <div className="space-y-1">
                                                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Full Name</label>
                                                  <div className="relative">
                                                       <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="Enter your full name"
                                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition bg-gray-50/50 hover:bg-white text-gray-900 placeholder:text-gray-400"
                                                       />
                                                       <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                  </div>
                                             </div>

                                             <div className="space-y-1">
                                                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Email Address</label>
                                                  <div className="relative">
                                                       <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Enter your email address"
                                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition bg-gray-50/50 hover:bg-white text-gray-900 placeholder:text-gray-400"
                                                       />
                                                       <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                  </div>
                                             </div>

                                             <div className="space-y-1">
                                                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Mobile Number</label>
                                                  <div className="relative">
                                                       <input
                                                            type="tel"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                            placeholder="Enter 10-digit mobile number"
                                                            maxLength={10}
                                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-500/20 outline-none text-xs sm:text-sm transition bg-gray-50/50 hover:bg-white text-gray-900 placeholder:text-gray-400"
                                                       />
                                                       <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                  </div>
                                             </div>

                                             {error && (
                                                  <p className="text-xs font-medium text-red-600 mt-1 bg-red-50 p-2.5 rounded-lg border border-red-100 font-sans">
                                                       {error}
                                                  </p>
                                             )}

                                             <label className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-500 select-none pt-1">
                                                  <input
                                                       type="checkbox"
                                                       defaultChecked
                                                       className="mt-0.5 accent-primary shrink-0 rounded"
                                                  />
                                                  <span>
                                                       You accept our Terms & Condition, Disclaimer & Privacy Policy by entering your contact information.
                                                  </span>
                                             </label>

                                             <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="btn-action-primary w-full mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                             >
                                                  {loading ? "Enquiring..." : "Enquire Now"}
                                             </button>
                                        </form>
                                   </>
                              )}
                         </div>
                    </div>
               )}
          </>
     );
}
