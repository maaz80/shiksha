"use client";

import { Grip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const fields = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Email Id", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "text" }
];

const ContactForm = () => {
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
            const firstErrorField = Object.keys(validationErrors)[0];
            const errorElement = document.getElementById(`location-field-${firstErrorField}`);
            if (errorElement) errorElement.focus();
            return;
        }

        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)}/send-otp`, {
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
            const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)}/send-otp`, {
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
            const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)}/submit-booking`, {
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
                setSuccessMessage("✅ Booking submitted successfully! We'll contact you soon.");
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
        <div className="w-full max-w-100 mx-auto lg:ml-auto">
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-10">
                <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-4 plus-jakarta-sans text-white" noValidate>
                    {successMessage && (
                        <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg" role="alert">
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}

                    {!otpStep ? (
                        <>
                            {fields.map((field) => {
                                const fieldId = `location-field-${field.name}`;
                                const hasError = !!errors[field.name];

                                return (
                                    <div key={field.name} className="flex flex-col gap-1">
                                        <label htmlFor={fieldId} className="text-sm text-white">
                                            {field.label}
                                            {field.name === "phone" && <span className="text-cust-orange ml-1">*</span>}
                                        </label>
                                        <input
                                            id={fieldId}
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                                            aria-invalid={hasError}
                                            className={`w-full bg-white/10 border rounded-md px-4 h-10 text-sm placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${hasError ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-white/30"}`}
                                        />
                                        {hasError && <p className="text-red-300 text-xs mt-1">{errors[field.name]}</p>}
                                    </div>
                                );
                            })}

                            <div className="flex flex-col gap-1">
                                <label htmlFor="location-field-message" className="text-sm text-white">
                                    Description <span className="text-white/70">(optional)</span>
                                </label>
                                <textarea
                                    id="location-field-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 h-20 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${loading ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:text-white"} flex h-12 md:h-14 justify-center w-full rounded-md bg-orange text-white text-[14px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-orange-hover cursor-pointer transition-all duration-300 ease-in-out  mt-2`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        <span className="relative z-10 ml-2">Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        {/* <span className="relative z-10">Book a Call</span>
                                            <GoArrowUpRight size={24} className={`relative z-10 text-heading transition-all duration-300 ${!loading && 'group-hover:text-white'}`} /> */}
                                            <Grip />
                                            Explore Program
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                <p className="text-sm text-black mb-1 font-medium">
                                    ✓ OTP sent to <span className="text-cust-orange">{formData.email}</span>
                                </p>
                                <p className="text-xs text-gray-600">Enter the 6-digit verification code sent to your email</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="location-otp-input" className="text-sm text-white">
                                    OTP Code <span className="text-cust-orange">*</span>
                                </label>
                                <input
                                    id="location-otp-input"
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    className={`w-full bg-white/10 border rounded-md px-4 h-10 text-sm placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${errors.otp ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-white/30"}`}
                                />
                                {errors.otp && <p className="text-red-300 text-xs mt-1">{errors.otp}</p>}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={resendTimer > 0 || loading}
                                    className={`text-sm ${resendTimer > 0 || loading ? "text-white/50 cursor-not-allowed" : "text-cust-orange hover:underline cursor-pointer"}`}
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
                                    className="text-sm text-white/80 hover:text-cust-orange cursor-pointer"
                                >
                                    ← Edit Details
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                    className={`${status === "loading" ? "cursor-not-allowed opacity-60" : "cursor-pointer"} flex h-12 md:h-14 justify-center w-full rounded-md bg-orange text-white text-[14px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-orange-hover cursor-pointer transition-all duration-300 ease-in-out  ${status === "loading"
                                    ? "text-white bg-orange"
                                    : status === "success"
                                        ? "text-green-600 bg-white border-green-500 border"
                                        : status === "error" || status === "timeout"
                                            ? "text-white bg-orange"
                                            : "text-primary bg-orange hover:text-white"
                                    }`}
                            >
                                {status === "idle" && (
                                    <>
                                        <span className="relative z-10">Verify & Submit</span>
                                        <HiOutlineArrowLongRight size={24} className="relative z-10 transition-all duration-300" />
                                    </>
                                )}
                                {status === "loading" && (
                                    <>
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        <span className="relative z-10 ml-2">Verifying...</span>
                                    </>
                                )}
                                {status === "success" && <span className="relative z-10">✓ Submitted Successfully</span>}
                                {(status === "error" || status === "timeout") && (
                                    <span className="relative z-10">
                                        {status === "error" ? "Failed. Try Again" : "Timed Out. Try Again"}
                                    </span>
                                )}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;