import React from "react";

/**
 * Pure CSS Glassmorphic 3D Decorative Cube (adapted to Shiksha Theme)
 * Floating modern crystal cube with Shiksha Electric Blue (#0071E5) & Orange (#F97316) ambient glow
 */
export default function DecorativeGlassCube({ className = "", size = "md" }) {
  const sizeClasses = {
    sm: "w-20 h-20 sm:w-24 sm:h-24",
    md: "w-28 h-28 sm:w-36 sm:h-36",
    lg: "w-36 h-36 sm:w-48 sm:h-48"
  };

  return (
    <div className={`relative ${sizeClasses[size] || sizeClasses.md} pointer-events-none select-none ${className}`}>
      {/* Outer ambient glow matching Shiksha blue & orange */}
      <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl animate-pulse" />

      {/* Rotated glass tile */}
      <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-white/95 via-blue-50/70 to-white/80 border border-blue-200/80 backdrop-blur-md rotate-12 shadow-[0_12px_40px_rgba(0,113,229,0.18)] flex items-center justify-center transition-transform duration-700">
        <span className="text-primary text-3xl sm:text-4xl font-bold opacity-90 drop-shadow-[0_4px_12px_rgba(0,113,229,0.35)]">✦</span>
      </div>

      {/* Floating secondary accent lights (Shiksha Blue + Orange) */}
      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-orange/40 blur-md animate-ping" />
      <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-primary/30 blur-md" />
    </div>
  );
}
