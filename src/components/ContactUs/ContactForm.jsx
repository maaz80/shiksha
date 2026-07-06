"use client";

import { useEffect, useRef, useState } from "react";
import { User, Mail, Phone, ArrowLeft } from "lucide-react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";

export default function ContactForm() {
     const [status, setStatus] = useState("idle");
     const [otpStep, setOtpStep] = useState(false);
     const [formData, setFormData] = useState({
          fullName: "",
          phone: "",
          email: "",
          message: "",
          otp: ""
     });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [resendTimer, setResendTimer] = useState(0);
     const [successMessage, setSuccessMessage] = useState("");
     const [termsAgree, setTermsAgree] = useState(true);
     const timerRef = useRef(null);

     useEffect(() => {
          if (!successMessage) return undefined;
          const timer = setTimeout(() => setSuccessMessage(""), 5000);
          return () => clearTimeout(timer);
     }, [successMessage]);

     useEffect(() => {
          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
          };
     }, []);

     const handleChange = (e) => {
          const { name, value } = e.target;

          if (name === "phone") {
               const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
               setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
          } else if (name === "otp") {
               const otpDigits = value.replace(/\D/g, "").slice(0, 6);
               setFormData((prev) => ({ ...prev, otp: otpDigits }));
          } else {
               setFormData((prev) => ({ ...prev, [name]: value }));
          }

          if (errors[name]) {
               setErrors((prev) => ({ ...prev, [name]: "" }));
          }
     };

     const validateForm = () => {
          const newErrors = {};
          if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
          if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";
          if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
          if (!termsAgree) newErrors.terms = "You must agree to the Terms of Use and Privacy Policy";
          return newErrors;
     };

     const startResendTimer = () => {
          setResendTimer(60);
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = setInterval(() => {
               setResendTimer((prev) => {
                    if (prev <= 1) {
                         if (timerRef.current) clearInterval(timerRef.current);
                         return 0;
                    }
                    return prev - 1;
               });
          }, 1000);
     };

     const handleSendOTP = async (e) => {
          e.preventDefault();
          const validationErrors = validateForm();
          if (Object.keys(validationErrors).length > 0) {
               setErrors(validationErrors);
               return;
          }

          setLoading(true);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          try {
               const response = await fetch(`${API_URL}/send-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setOtpStep(true);
                    setErrors({});
                    startResendTimer();
               } else {
                    setErrors({ phone: result.error || "Failed to send OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               setErrors({ phone: error.name === "AbortError" ? "Request timeout" : "Failed to send OTP" });
          }

          setLoading(false);
     };

     const handleResendOTP = async () => {
          if (resendTimer > 0) return;
          setLoading(true);

          try {
               const response = await fetch(`${API_URL}/send-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    })
               });

               const result = await response.json();
               if (response.ok) {
                    setErrors({});
                    startResendTimer();
               } else {
                    setErrors({ otp: result.error || "Failed to resend OTP" });
               }
          } catch (error) {
               console.error(error);
               setErrors({ otp: "Failed to resend OTP" });
          }

          setLoading(false);
     };

     const handleSubmitWithOTP = async (e) => {
          e.preventDefault();

          if (!formData.otp || formData.otp.length !== 6) {
               setErrors({ otp: "Please enter 6-digit OTP" });
               return;
          }

          setStatus("loading");
          setLoading(true);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);

          try {
               const response = await fetch(`${API_URL}/submit-booking`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         fullName: formData.fullName,
                         phone: formData.phone,
                         email: formData.email,
                         message: formData.message,
                         otp: formData.otp
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setStatus("success");
                    setSuccessMessage("Query submitted successfully! We'll contact you soon.");
                    setFormData({ fullName: "", phone: "", email: "", message: "", otp: "" });
                    setOtpStep(false);
                    setErrors({});
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimeout(() => setStatus("idle"), 3000);
               } else {
                    setStatus("error");
                    setErrors({ otp: result.error || "Invalid OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               if (error.name === "AbortError") {
                    setStatus("timeout");
                    setErrors({ otp: "Request timeout. Please try again." });
               } else {
                    setStatus("error");
                    setErrors({ otp: "Failed to submit. Please try again." });
               }
          }

          setLoading(false);
     };

     return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-secondary">
               <div className="bg-[#E1EAF5] border border-gray-200 rounded-xl p-5 md:p-8">

                    <h2 className="text-[20px] md:text-[32px] font-bold text-primary mb-6">
                         Have Queries? Reach out to us!
                    </h2>

                    <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-3">
                         {successMessage && (
                              <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg text-sm mb-4" role="alert">
                                   <span>{successMessage}</span>
                              </div>
                         )}

                         {!otpStep ? (
                              <>
                                   {/* Full Name */}
                                   <div>
                                        <label htmlFor="full-name" className="text-[14px] mb-1 block">
                                             Full Name
                                        </label>
                                        <div className={`flex items-center h-10 px-3 rounded-md border bg-white ${errors.fullName ? "border-red-500" : "border-black/12"}`}>
                                             <User size={16} className="text-gray-400 mr-2" />
                                             <input
                                                  id="full-name"
                                                  type="text"
                                                  name="fullName"
                                                  value={formData.fullName}
                                                  onChange={handleChange}
                                                  placeholder="John Doe"
                                                  className="w-full text-sm outline-none placeholder-gray-400"
                                             />
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Email */}
                                        <div>
                                             <label htmlFor="email" className="text-[14px] mb-1 block">
                                                  Email
                                             </label>
                                             <div className={`flex items-center h-10 px-3 rounded-md border bg-white ${errors.email ? "border-red-500" : "border-black/12"}`}>
                                                  <Mail size={16} className="text-gray-400 mr-2" />
                                                  <input
                                                       id="email"
                                                       type="email"
                                                       name="email"
                                                       value={formData.email}
                                                       onChange={handleChange}
                                                       placeholder="abc@example.com"
                                                       className="w-full text-sm outline-none placeholder-gray-400"
                                                  />
                                             </div>
                                             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                             <label htmlFor="phone" className="text-[14px] mb-1 block">
                                                  Phone Number
                                             </label>
                                             <div className={`flex items-center h-10 px-3 rounded-md border bg-white ${errors.phone ? "border-red-500" : "border-black/12"}`}>
                                                  <Phone size={16} className="text-gray-400 mr-2" />
                                                  <span className="text-sm text-gray-500 mr-2">+91</span>
                                                  <input
                                                       id="phone"
                                                       type="tel"
                                                       name="phone"
                                                       value={formData.phone}
                                                       onChange={handleChange}
                                                       placeholder="Enter 10 digit number"
                                                       className="w-full text-sm outline-none placeholder-gray-400"
                                                  />
                                             </div>
                                             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                   </div>

                                   {/* Textarea */}
                                   <div>
                                        <label htmlFor="query" className="text-[14px] mb-1 block">
                                             Describe your query
                                        </label>
                                        <textarea
                                             id="query"
                                             name="message"
                                             value={formData.message}
                                             onChange={handleChange}
                                             rows={4}
                                             placeholder="Describe your query here"
                                             className="w-full text-sm outline-none placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 bg-white resize-none"
                                        />
                                   </div>

                                   <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        {/* Checkbox */}
                                        <div className="flex flex-col gap-1">
                                             <div className="flex items-start gap-2">
                                                  <input
                                                       type="checkbox"
                                                       id="terms-checkbox"
                                                       checked={termsAgree}
                                                       onChange={(e) => {
                                                            setTermsAgree(e.target.checked);
                                                            if (errors.terms) {
                                                                 setErrors((prev) => ({ ...prev, terms: "" }));
                                                            }
                                                       }}
                                                       className="mt-1 accent-primary"
                                                  />
                                                  <label htmlFor="terms-checkbox" className="text-[12px] text-gray-600 leading-4">
                                                       By providing your contact details, you agree to our{" "}
                                                       <span className="text-[#0050B3] cursor-pointer">Terms of Use</span>
                                                       {" "}&{" "}
                                                       <span className="text-[#0050B3] cursor-pointer">Privacy Policy</span>
                                                  </label>
                                             </div>
                                             {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                                        </div>

                                        <button
                                             type="submit"
                                             disabled={loading}
                                             className="h-9 w-27.5 px-6 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all duration-500 ease-in-out cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                        >
                                             {loading ? (
                                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                             ) : (
                                                  "Send"
                                             )}
                                        </button>
                                   </div>
                              </>
                         ) : (
                              <>
                                   {/* OTP Screen */}
                                   <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 text-primary mb-4">
                                        <p className="text-sm mb-1 font-semibold">
                                             ✓ OTP sent to <span className="underline">{formData.email}</span>
                                        </p>
                                        <p className="text-xs text-gray-600">Enter the 6-digit verification code sent to your email</p>
                                   </div>

                                   <div>
                                        <label htmlFor="otp-input" className="text-[14px] mb-1 block">
                                             OTP Code <span className="text-red-500">*</span>
                                        </label>
                                        <div className={`flex items-center h-10 px-3 rounded-md border bg-white ${errors.otp ? "border-red-500" : "border-black/12"}`}>
                                             <input
                                                  id="otp-input"
                                                  type="text"
                                                  name="otp"
                                                  value={formData.otp}
                                                  onChange={handleChange}
                                                  placeholder="Enter 6-digit OTP"
                                                  maxLength={6}
                                                  className="w-full text-sm outline-none placeholder-gray-400"
                                             />
                                        </div>
                                        {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                                   </div>

                                   <div className="flex justify-between items-center text-xs my-4">
                                        <button
                                             type="button"
                                             onClick={handleResendOTP}
                                             disabled={resendTimer > 0 || loading}
                                             className={`font-semibold ${resendTimer > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-primary hover:underline cursor-pointer"}`}
                                        >
                                             {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                        </button>
                                        <button
                                             type="button"
                                             onClick={() => {
                                                  setOtpStep(false);
                                                  setFormData((prev) => ({ ...prev, otp: "" }));
                                                  setErrors({});
                                                  setStatus("idle");
                                                  if (timerRef.current) clearInterval(timerRef.current);
                                             }}
                                             className="text-gray-500 hover:text-primary cursor-pointer flex items-center gap-1"
                                        >
                                             <ArrowLeft size={12} /> Edit Details
                                        </button>
                                   </div>

                                   <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="h-10 w-full rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all duration-500 ease-in-out flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-450 disabled:cursor-not-allowed"
                                   >
                                        {status === "loading" ? (
                                             <>
                                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                  <span>Verifying...</span>
                                             </>
                                        ) : status === "success" ? (
                                             <span>✓ Submitted Successfully</span>
                                        ) : (
                                             <>
                                                  <span>Verify & Submit</span>
                                                  <HiOutlineArrowLongRight size={18} />
                                             </>
                                        )}
                                   </button>
                              </>
                         )}

                    </form>
               </div>
          </div>
     );
}