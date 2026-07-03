"use client";

import { useState, useEffect } from "react";
import login from '../assets/shiksha-login-image.webp';
import { Lock, Mail, User, X, KeyRound } from "lucide-react";
import { signupUser, loginUser, forgotPassword, resetPassword } from "../utils/auth.js";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
     const [authMode, setAuthMode] = useState("login"); // "login", "signup", "forgot", "reset"
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
          agreeTerms: false,
          keepSigned: false,
     });

     useEffect(() => {
          const html = document.documentElement;

          if (isOpen) {
               const scrollbarWidth =
                    window.innerWidth - html.clientWidth;

               html.style.overflow = "hidden";
               html.style.paddingRight = `${scrollbarWidth}px`;
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
               // Reset modal state when closed
               setAuthMode("login");
               setError("");
               setSuccessMessage("");
               setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
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
          setFormData(prev => ({
               ...prev,
               [name]: type === "checkbox" ? checked : value
          }));
          setError("");
          setSuccessMessage("");
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          setSuccessMessage("");

          try {
               if (authMode === "signup") {
                    if (!formData.name || !formData.email || !formData.password) {
                         setError("Please fill in all fields");
                         setLoading(false);
                         return;
                    }
                    if (!formData.agreeTerms) {
                         setError("Please agree to Terms & Conditions");
                         setLoading(false);
                         return;
                    }

                    await signupUser(formData.name, formData.email, formData.password);
                    
                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               } else if (authMode === "login") {
                    if (!formData.email || !formData.password) {
                         setError("Please enter email and password");
                         setLoading(false);
                         return;
                    }

                    await loginUser(formData.email, formData.password);

                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               } else if (authMode === "forgot") {
                    if (!formData.email) {
                         setError("Please enter your email");
                         setLoading(false);
                         return;
                    }

                    await forgotPassword(formData.email);
                    setSuccessMessage("OTP sent to your email successfully!");
                    setAuthMode("reset");
               } else if (authMode === "reset") {
                    if (!formData.otp || !formData.password || !formData.confirmPassword) {
                         setError("Please fill in all fields");
                         setLoading(false);
                         return;
                    }

                    if (formData.password !== formData.confirmPassword) {
                         setError("Passwords do not match");
                         setLoading(false);
                         return;
                    }

                    await resetPassword(formData.email, formData.otp, formData.password);
                    setSuccessMessage("Password reset successfully! Please log in.");
                    setAuthMode("login");
                    setFormData(prev => ({ ...prev, password: "", confirmPassword: "", otp: "" }));
               }
          } catch (err) {
               setError(err.message || "An error occurred");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className={`fixed open-sans inset-0 z-99999 flex items-center justify-center bg-secondary/30 backdrop-blur-sm ${isOpen ? 'translate-y-10 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-700 ease-in-out`} role="dialog" aria-labelledby="auth-modal-title" aria-modal="true">
               <h2 id="auth-modal-title" className="sr-only hidden">
                    {authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Forgot Password" : authMode === "reset" ? "Reset Password" : "Sign In"}
               </h2>
               {/* Modal */}
               <div className="w-87.5 md:w-261.5 bg-primary-bg rounded-md shadow-xl relative overflow-hidden p-3 md:p-10">

                    <div className="flex h-125">

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
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">Full Name</label>
                                             <input
                                                  type="text"
                                                  name="name"
                                                  value={formData.name}
                                                  onChange={handleChange}
                                                  placeholder="John Doe"
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <User className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <User className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                   )}

                                   {authMode !== "reset" && (
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">Email</label>
                                             <input
                                                  type="email"
                                                  name="email"
                                                  value={formData.email}
                                                  onChange={handleChange}
                                                  placeholder="example@email.com"
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <Mail className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <Mail className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                   )}

                                   {authMode === "reset" && (
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">Verification OTP</label>
                                             <input
                                                  type="text"
                                                  name="otp"
                                                  value={formData.otp}
                                                  onChange={handleChange}
                                                  placeholder="Enter 6-digit OTP"
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <KeyRound className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <KeyRound className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                   )}

                                   {authMode !== "forgot" && (
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">
                                                  {authMode === "reset" ? "New Password" : "Password"}
                                             </label>
                                             <input
                                                  type="password"
                                                  name="password"
                                                  value={formData.password}
                                                  onChange={handleChange}
                                                  placeholder={authMode === "reset" ? "Enter new password" : "Enter password"}
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <Lock className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <Lock className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                   )}

                                   {authMode === "reset" && (
                                        <div className="relative">
                                             <label className="text-[12px] md:text-[16px] text-secondary">Confirm New Password</label>
                                             <input
                                                  type="password"
                                                  name="confirmPassword"
                                                  value={formData.confirmPassword}
                                                  onChange={handleChange}
                                                  placeholder="Confirm new password"
                                                  className="w-full mt-0 md:mt-1 px-10 h-10 md:h-13 border border-[#000000]/12 rounded-md text-[12px] md:text-[16px] outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50"
                                             />
                                             <Lock className="absolute top-9 left-3 z-20 text-secondary md:hidden" size={16} />
                                             <Lock className="absolute top-11 left-3 z-20 text-secondary hidden md:block" size={20} />
                                        </div>
                                    )}

                                   {authMode === "signup" && (
                                        <div className="flex items-center justify-between text-[10px] md:text-[14px] text-secondary py-2">
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
                                   <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-primary text-white h-12 rounded-md text-[12px] md:text-[16px] font-medium hover:bg-primary-hover transition-all duration-500 ease-in-out cursor-pointer ${authMode === "signup" || authMode === "reset" ? "mt-0" : "my-3"} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                    >
                                         {loading ? "Loading..." : (authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Send OTP" : authMode === "reset" ? "Reset Password" : "Sign In")}
                                    </button>

                                   {/* Bottom Row */}
                                   {authMode === "login" && (
                                        <div className="flex items-center justify-between text-[10px] md:text-[14px] text-secondary bg-transparent">
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

                                             <span onClick={() => { setAuthMode("forgot"); setError(""); setSuccessMessage(""); }} className="cursor-pointer hover:underline text-primary">Forgot password?</span>
                                        </div>
                                   )}
                              </form>

                              {/* Toggle */}
                              <p className="text-[10px] md:text-[14px] text-center mt-4 text-secondary">
                                   {authMode === "signup" ? "Already have an account?" : authMode === "login" ? "Don't have an account?" : ""}
                                   {authMode === "login" && (
                                        <span
                                             onClick={() => { setAuthMode("signup"); setError(""); setSuccessMessage(""); }}
                                             className="text-primary hover:text-primary-hover ml-1 cursor-pointer font-medium"
                                        >
                                             Sign up
                                        </span>
                                   )}
                                   {authMode === "signup" && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setError(""); setSuccessMessage(""); }}
                                             className="text-primary hover:text-primary-hover ml-1 cursor-pointer font-medium"
                                        >
                                             Login
                                        </span>
                                   )}
                                   {(authMode === "forgot" || authMode === "reset") && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setError(""); setSuccessMessage(""); }}
                                             className="text-primary hover:text-primary-hover cursor-pointer font-medium"
                                        >
                                             Back to Login
                                        </span>
                                   )}
                              </p>

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