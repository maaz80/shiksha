"use client";

import { useState, useEffect } from "react";
import login from '../assets/shiksha-login-image.webp';
import { Mail, User, X, KeyRound, Phone } from "lucide-react";
import { sendOTP, loginWithOTP, signupWithOTP } from "../utils/auth.js";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
     const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
     const [loading, setLoading] = useState(false);
     const [otpSent, setOtpSent] = useState(false);
     const [otpLoading, setOtpLoading] = useState(false);
     const [error, setError] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          otp: "",
          agreeTerms: false,
          keepSigned: false,
     });

     useEffect(() => {
          const html = document.documentElement;

          if (isOpen) {
               const scrollbarWidth = window.innerWidth - html.clientWidth;
               html.style.overflow = "hidden";
               html.style.paddingRight = `${scrollbarWidth}px`;
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
               // Reset modal state when closed
               setAuthMode("login");
               setOtpSent(false);
               setError("");
               setSuccessMessage("");
               setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    otp: "",
                    agreeTerms: false,
                    keepSigned: false,
               });
          }

          return () => {
               html.style.overflow = "";
               html.style.paddingRight = "";
          };
     }, [isOpen]);

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setError("");
          setSuccessMessage("");

          if (type === "checkbox") {
               setFormData(prev => ({
                    ...prev,
                    [name]: checked
               }));
               return;
          }

          if (name === "name") {
               let sanitized = value.replace(/^\s+/, "");
               sanitized = sanitized.replace(/[^a-zA-Z\s]/g, "");
               sanitized = sanitized.replace(/\s{2,}/g, " ");
               setFormData(prev => ({
                    ...prev,
                    [name]: sanitized
               }));
               return;
          }

          if (name === "phone" || name === "otp") {
               const sanitized = value.replace(/\D/g, "");
               setFormData(prev => ({
                    ...prev,
                    [name]: sanitized
               }));
               return;
          }

          setFormData(prev => ({
               ...prev,
               [name]: value
          }));
     };

     // Top-level Validations
     const validateName = (name) => {
          if (!name || name.trim().length < 2) return false;
          return /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name);
     };

     const validatePhone = (phone) => {
          return /^[0-9]{10}$/.test(phone);
     };

     const validateEmail = (email) => {
          return /^\S+@\S+\.\S+$/.test(email);
     };

     const handleSendOTP = async () => {
          setError("");
          setSuccessMessage("");

          if (authMode === "signup") {
               if (!formData.name) {
                    setError("Full Name is required.");
                    return;
               }
               if (!validateName(formData.name)) {
                    setError("Please enter a valid Name (letters and spaces only, at least 2 characters).");
                    return;
               }
               if (!formData.phone) {
                    setError("Phone number is required.");
                    return;
               }
               if (!validatePhone(formData.phone)) {
                    setError("Please enter a valid 10-digit Phone number.");
                    return;
               }
          }

          if (!formData.email) {
               setError("Email address is required.");
               return;
          }
          if (!validateEmail(formData.email)) {
               setError("Please enter a valid Email address.");
               return;
          }

          setOtpLoading(true);
          try {
               const res = await sendOTP(formData.email, authMode);
               setOtpSent(true);
               setSuccessMessage(res.message || "Verification OTP sent to your email!");
          } catch (err) {
               setError(err.message || "Failed to send OTP.");
          } finally {
               setOtpLoading(false);
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError("");
          setSuccessMessage("");

          if (!otpSent) {
               await handleSendOTP();
               return;
          }

          if (!formData.otp || formData.otp.trim().length < 6) {
               setError("Please enter a valid 6-digit OTP.");
               return;
          }

          setLoading(true);
          try {
               if (authMode === "signup") {
                    if (!formData.agreeTerms) {
                         setError("Please agree to the Terms & Conditions.");
                         setLoading(false);
                         return;
                    }
                    await signupWithOTP(formData.name, formData.email, formData.phone, formData.otp);
               } else {
                    await loginWithOTP(formData.email, formData.otp);
               }

               // Success
               onClose();
               onAuthSuccess?.();
          } catch (err) {
               setError(err.message || "Authentication failed.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className={`fixed open-sans inset-0 z-99999 flex items-center justify-center bg-secondary/30 backdrop-blur-sm ${isOpen ? 'translate-y-10 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-700 ease-in-out`} role="dialog" aria-labelledby="auth-modal-title" aria-modal="true">
               <h2 id="auth-modal-title" className="sr-only hidden">
                    {authMode === "signup" ? "Sign Up" : "Sign In"}
               </h2>
               {/* Modal */}
               <div className="w-87.5 md:w-261.5 bg-primary-bg rounded-md shadow-xl relative overflow-hidden p-3 md:p-10">

                    <div className="flex h-135">

                         {/* LEFT PANEL */}
                         <div className="w-1/2 hidden md:flex flex-col justify-center px-10 relative">
                              {/* Illustration */}
                              <img
                                   src={login?.src || login}
                                   alt="illustration"
                                   width={363}
                                   height={512}
                                   className="mt-6 w-[80%] h-auto"
                              />
                         </div>

                         {/* Divider */}
                         <div className="hidden md:block w-px bg-gray-300"></div>

                         {/* RIGHT PANEL */}
                         <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12">

                              {/* Google Button */}
                              <button className="flex items-center gap-2 border border-[#000000]/12 rounded-md px-4 h-10 md:h-13 text-[12px] md:text-[16px] bg-white hover:bg-gray-50">
                                   <span className="bg-[#E32729] text-white text-[12px] md:text-[16px] px-1 md:px-3 py-0.5 md:py-2 rounded font-bold">
                                        G+
                                   </span>
                                   Login with google
                              </button>

                              {/* Divider */}
                              <div className="flex items-center gap-3 mt-5 mb-3">
                                   <div className="flex-1 h-px bg-secondary"></div>
                                   <span className="text-[10px] md:text-[14px] text-secondary">
                                        Or login with your email
                                   </span>
                                   <div className="flex-1 h-px bg-secondary"></div>
                              </div>

                              {/* FORM */}
                              <form className="space-y-1 md:space-y-2" onSubmit={handleSubmit}>

                                   {/* Error Message */}
                                   {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-[12px] md:text-[14px]">
                                             {error}
                                        </div>
                                    )}

                                   {/* Success Message */}
                                   {successMessage && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-[12px] md:text-[14px]">
                                             {successMessage}
                                        </div>
                                    )}

                                   {/* Signup only */}
                                   {authMode === "signup" && (
                                        <>
                                             <div className="relative">
                                                  <label className="text-[12px] md:text-[16px] text-secondary">Full Name</label>
                                                  <input
                                                       type="text"
                                                       name="name"
                                                       disabled={otpSent}
                                                       value={formData.name}
                                                       onChange={handleChange}
                                                       placeholder="John Doe"
                                                       className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                  />
                                                  <User className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                                  <User className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                             </div>
                                             
                                             <div className="relative">
                                                  <label className="text-[12px] md:text-[16px] text-secondary">Phone Number</label>
                                                  <input
                                                       type="tel"
                                                       name="phone"
                                                       disabled={otpSent}
                                                       value={formData.phone}
                                                       onChange={handleChange}
                                                       placeholder="9876543210"
                                                       maxLength={10}
                                                       className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                  />
                                                  <Phone className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                                  <Phone className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                             </div>
                                        </>
                                   )}

                                   <div className="relative">
                                        <label className="text-[12px] md:text-[16px] text-secondary">Email</label>
                                        <input
                                             type="email"
                                             name="email"
                                             disabled={otpSent}
                                             value={formData.email}
                                             onChange={handleChange}
                                             placeholder="example@email.com"
                                             className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                        <Mail className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                        <Mail className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                   </div>

                                   {otpSent && (
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">Verification OTP</label>
                                             <input
                                                  type="text"
                                                  name="otp"
                                                  value={formData.otp}
                                                  onChange={handleChange}
                                                  placeholder="Enter 6-digit OTP"
                                                  maxLength={6}
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <KeyRound className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <KeyRound className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                   )}

                                   {authMode === "signup" && otpSent && (
                                        <div className="flex items-center justify-between text-[10px] md:text-[14px] text-secondary py-1">
                                             <label className="flex items-center gap-2">
                                                  <input
                                                       type="checkbox"
                                                       name="agreeTerms"
                                                       checked={formData.agreeTerms}
                                                       onChange={handleChange}
                                                       className="accent-primary"
                                                  />
                                                  I agreed to the Terms & Conditions
                                             </label>
                                        </div>
                                   )}

                                   {/* Button */}
                                   {!otpSent ? (
                                        <button
                                             type="button"
                                             onClick={handleSendOTP}
                                             disabled={otpLoading}
                                             className={`w-full bg-primary text-white h-12 rounded-md text-[12px] md:text-[16px] font-medium hover:bg-primary-hover transition-all duration-500 ease-in-out cursor-pointer mt-4 ${otpLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                                        >
                                             {otpLoading ? "Sending OTP..." : "Send OTP"}
                                        </button>
                                   ) : (
                                        <button
                                             type="submit"
                                             disabled={loading}
                                             className={`w-full bg-primary text-white h-12 rounded-md text-[12px] md:text-[16px] font-medium hover:bg-primary-hover transition-all duration-500 ease-in-out cursor-pointer mt-4 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                        >
                                             {loading ? "Verifying..." : (authMode === "signup" ? "Sign Up" : "Sign In")}
                                        </button>
                                   )}

                                   {/* Bottom Row */}
                                   {authMode === "login" && (
                                        <div className="flex items-center justify-between text-[10px] md:text-[14px] text-secondary bg-transparent pt-2">
                                             <label className="flex items-center gap-2 bg-transparent">
                                                  <input
                                                       type="checkbox"
                                                       name="keepSigned"
                                                       checked={formData.keepSigned}
                                                       onChange={handleChange}
                                                       className="accent-transparent bg-transparent"
                                                  />
                                                  keep me signed in
                                             </label>
                                        </div>
                                   )}
                              </form>

                              {/* Toggle */}
                              <p className="text-[10px] md:text-[14px] text-center mt-4 text-secondary">
                                   {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}
                                   {authMode === "login" && (
                                        <span
                                             onClick={() => { setAuthMode("signup"); setOtpSent(false); setError(""); setSuccessMessage(""); }}
                                             className="text-primary hover:text-primary-hover ml-1 cursor-pointer font-medium"
                                        >
                                             Sign up
                                        </span>
                                    )}
                                   {authMode === "signup" && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setOtpSent(false); setError(""); setSuccessMessage(""); }}
                                             className="text-primary hover:text-primary-hover ml-1 cursor-pointer font-medium"
                                        >
                                             Login
                                        </span>
                                    )}
                              </p>

                              {/* Warning Message at the bottom */}
                              <div className="mt-4 border-t border-gray-200 pt-3 text-center">
                                   <p className="text-[10px] md:text-[12px] text-red-500 font-medium">
                                        Warning: Please make sure to enter your correct details (Name, Email & Phone) for smooth account access.
                                   </p>
                              </div>

                         </div>
                    </div>

                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         aria-label="Close authentication modal"
                         className="absolute top-3 right-3 text-gray-500 hover:text-secondary cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out"
                    >
                         <X />
                    </button>
               </div>
          </div>
     );
};

export default AuthModal;