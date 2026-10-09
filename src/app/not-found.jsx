import React from "react";
import Link from "next/link";
import DecorativeGlassCube from "../components/DecorativeGlassCube";
import { ArrowLeft, Compass, Sparkles, Home } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Shiksha Design & Tech Academy",
  description: "The requested syllabus, module, or page does not exist or has been relocated to our drafting labs.",
};

export default function NotFound() {
  return (
    <main
      id="not-found-hero"
      className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-primary-bg flex items-center justify-center px-4 sm:px-6 py-20 md:py-28 plus-jakarta-sans"
    >
      {/* 1. Background Ambient Gradient Lighting matching Shiksha Palette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,113,229,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(249,115,22,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(0,113,229,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),rgba(240,247,255,0.8))]" />
      </div>

      {/* 2. Floating 3D Glowing Glassmorphic Cube (Top-Right) */}
      <div className="absolute z-1 top-[8%] right-[-5%] sm:top-[5%] sm:right-[3%] md:right-[8%] lg:right-[12%] pointer-events-none select-none opacity-90">
        <DecorativeGlassCube size="lg" />
      </div>

      {/* Secondary Floating Accent (Bottom-Left) */}
      <div className="hidden lg:block absolute z-1 bottom-[10%] left-[8%] pointer-events-none select-none opacity-70">
        <DecorativeGlassCube size="sm" />
      </div>

      {/* 3. Giant 404 Watermark in Background */}
      <div className="absolute z-0 left-1/2 top-[44%] md:top-[38%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-[42vw] md:text-[440px] lg:text-[500px] leading-none text-primary/[0.04] whitespace-nowrap tracking-tighter">
        404
      </div>

      {/* 4. Foreground Content Card */}
      <section className="relative z-10 w-full max-w-[720px] flex flex-col items-center text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/95 backdrop-blur-md px-4 py-1.5 mb-6 md:mb-7 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,113,229,0.8)] animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary -ml-3.5" />
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            ERROR 404 • UNRESOLVED WORKSHOP INDEX
          </span>
        </div>

        {/* Heading in Shiksha Typography */}
        <h1 className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[66px] font-extrabold leading-[1.1] tracking-tight text-secondary mb-4 md:mb-5">
          Lost in The{" "}
          <span className="relative inline-block text-primary">
            Archive.
            {/* Signature Shiksha curved accent underline */}
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

        {/* Description in Open Sans */}
        <p className="max-w-[540px] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] text-slate-600 mb-8 md:mb-10 font-normal open-sans">
          The studio syllabus or workshop module you&apos;re seeking does not exist or has been relocated to our drafting labs. Let&apos;s guide you back to active cohorts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_25px_rgba(0,113,229,0.25)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_10px_30px_rgba(0,113,229,0.35)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Active Programs</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 px-6 py-3.5 text-xs sm:text-sm font-semibold text-secondary hover:text-primary transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Micro Branding */}
        <div className="mt-12 flex items-center gap-2 text-slate-400 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>Shiksha Design & Tech Academy • Official Curriculum Portal</span>
        </div>
      </section>
    </main>
  );
}
