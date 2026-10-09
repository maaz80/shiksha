"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DecorativeGlassCube from "../../components/DecorativeGlassCube";
import { Mail, ArrowRight, CheckCircle2, Sparkles, Home } from "lucide-react";

const getApiBase = () => {
  let url = (process.env.NEXT_PUBLIC_API_URL || "https://api.shikshadesign.com/api").trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api";
  }
  if (url.startsWith("http") && !url.endsWith("/api")) {
    return `${url}/api`;
  }
  return url;
};

export default function ComingSoonPage() {
  // Target Launch Date: 18 days 14 hours 42 mins 9 secs default
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 14,
    mins: 42,
    secs: 9,
  });

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 1-Second Interval Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Form Submission: Hooks directly to CRM Lead Engine (/api/leads)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const API_BASE = getApiBase();

      const res = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Early Access Applicant",
          email: email.trim(),
          phone: "",
          course: "Upcoming 2026 Fellowship Cohort",
          source: "Coming Soon Waitlist",
          priority: "Hot"
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not join waitlist. Please try again.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Waitlist capture error:", err);
      // Even if network fails locally, provide friendly optimistic confirmation
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      id="coming-soon-hero"
      className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-primary-bg flex items-center justify-center px-4 sm:px-6 py-20 md:py-28 plus-jakarta-sans"
    >
      {/* 1. Ambient Shiksha Palette Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,113,229,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(249,115,22,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(0,113,229,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),rgba(240,247,255,0.8))]" />
      </div>

      {/* 2. Floating 3D Glowing Glassmorphic Cube (Top-Right) */}
      <div className="absolute z-1 top-[8%] right-[-5%] sm:top-[4%] sm:right-[3%] md:top-[6%] md:right-[6%] lg:right-[11%] pointer-events-none select-none opacity-90">
        <DecorativeGlassCube size="lg" />
      </div>

      {/* Secondary Floating Accent (Bottom-Left) */}
      <div className="hidden lg:block absolute z-1 bottom-[8%] left-[7%] pointer-events-none select-none opacity-70">
        <DecorativeGlassCube size="sm" />
      </div>

      {/* 3. Giant SOON Watermark in Background */}
      <div className="absolute z-0 left-1/2 top-[44%] md:top-[36%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-[34vw] md:text-[360px] lg:text-[420px] leading-none text-primary/4 whitespace-nowrap tracking-tighter">
        SOON
      </div>

      {/* 4. Foreground Content Section */}
      <section className="relative z-10 w-full max-w-190 flex flex-col items-center text-center">
        {/* Top Pill Tag in Shiksha Orange */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/95 backdrop-blur-md px-4 py-1.5 mb-6 md:mb-7 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            COHORT ENROLLMENT OPENS SOON • SUMMER 2026
          </span>
        </div>

        {/* Heading in Plus Jakarta Sans */}
        <h1 className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-extrabold leading-[1.1] tracking-tight text-secondary mb-4 md:mb-5">
          The Studio &amp; Tech Lab is{" "}
          <span className="relative inline-block text-primary">
            Preparing.
            {/* Signature curved underline */}
            <svg
              className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-3 text-orange"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12 Q100 2 195 4"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle / Description in Open Sans */}
        <p className="max-w-[540px] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.75] text-slate-600 mb-8 md:mb-10 text-center font-normal open-sans">
          A comprehensive and hands-on residency track is currently under final peer critique, live benchmark stress testing, and prototype iteration.
        </p>

        {/* Countdown Timer Block (Days, Hours, Mins, Secs) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-[460px] sm:max-w-[500px] w-full mb-8 md:mb-10">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.mins },
            { label: "SECS", value: timeLeft.secs },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-blue-100/90 shadow-xl shadow-blue-500/5 py-3.5 sm:py-5 px-2 sm:px-3 flex flex-col items-center justify-center hover:border-primary/40 transition-all hover:-translate-y-0.5"
            >
              <span className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-secondary mb-1 tracking-tight">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Email Waitlist Form Container */}
        <div className="w-full max-w-[520px] mb-6 sm:mb-7">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl py-4 px-6 flex items-center justify-center gap-3 text-xs sm:text-sm text-emerald-800 font-bold shadow-xs animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>You are on the priority waitlist! We will notify you when admissions open.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative w-full bg-white border border-slate-200/90 rounded-full p-1.5 pl-5 flex items-center justify-between gap-2 shadow-xl shadow-blue-500/8 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-500/15 transition-all"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Mail className="text-slate-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for private early access..."
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 open-sans font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_16px_rgba(249,115,22,0.30)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.40)] cursor-pointer disabled:opacity-50 hover:-translate-y-0.5"
              >
                <span>{loading ? "Joining..." : "Join Early Access"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {errorMsg && (
            <p className="mt-2 text-rose-500 text-xs font-semibold">{errorMsg}</p>
          )}
        </div>

        {/* Social Proof & Features Micro Footer */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12.5px] text-slate-600 font-medium">
          {/* Avatar Circles */}
          <div className="flex items-center -space-x-1.5 mr-1">
            <div className="w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-xs">
              AK
            </div>
            <div className="w-6 h-6 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-xs">
              VJ
            </div>
            <div className="w-6 h-6 rounded-full bg-orange border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-xs">
              SY
            </div>
          </div>

          <span>
            <strong className="text-secondary font-bold">1,240+ candidates on waitlist</strong>
          </span>
          <span className="text-slate-300 font-bold">•</span>
          <span>Strictly capped cohorts of 18 fellows</span>
          <span className="text-slate-300 font-bold">•</span>
          <span>100% Practical AI-Integrated Curriculum</span>
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition underline underline-offset-4"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Shiksha Homepage</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
