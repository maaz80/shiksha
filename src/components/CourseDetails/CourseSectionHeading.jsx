"use client";

import React from "react";

/**
 * CourseSectionHeading - Reusable dynamic heading component
 *
 * Supports two design variants:
 * 1. "default": CourseBenefits design pattern (text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] with primary text highlight)
 * 2. "testimonial": Testimonials design pattern (text-[24px] md:text-[48px] 2xl:text-[72px] with text-orange and curved underline SVG)
 */
export default function CourseSectionHeading({
     variant = "default",
     title,
     subtitle,
     description,
     highlightText,
     startHeading,
     midHeading,
     endHeading,
     autoHighlightLastWord = true,
     align = "center",
     className = "",
     headingClassName = "",
     subtitleClassName = "",
     as: HeadingTag = "h2"
}) {
     const renderHighlightedSpan = (content, key) => {
          if (variant === "testimonial") {
               return (
                    <span key={key} className="relative inline-block text-orange">
                         {content}
                         <svg
                              className="absolute left-0 -bottom-2 lg:-bottom-6 w-full pointer-events-none"
                              viewBox="0 0 200 20"
                              preserveAspectRatio="none"
                         >
                              <path
                                   d="M5 15 Q100 -6 195 5"
                                   stroke="#F97316"
                                   strokeWidth="4"
                                   fill="none"
                                   strokeLinecap="round"
                              />
                         </svg>
                    </span>
               );
          }

          return (
               <span key={key} className="text-primary">
                    {content}
               </span>
          );
     };

     const renderTitleContent = () => {
          // 1. Explicit startHeading / midHeading / endHeading props
          if (startHeading !== undefined || midHeading !== undefined || endHeading !== undefined) {
               return (
                    <>
                         {startHeading && <>{startHeading}{midHeading ? " " : ""}</>}
                         {midHeading && renderHighlightedSpan(midHeading, "mid")}
                         {endHeading && <>{endHeading.startsWith(" ") ? "" : " "}{endHeading}</>}
                    </>
               );
          }

          // 2. Title is React element / JSX or null
          if (typeof title !== "string") {
               return title || null;
          }

          // 3. Asterisk markdown syntax: "Why Choose *Us?*"
          if (title.includes("*")) {
               const parts = title.split(/(\*[^*]+\*)/g);
               return parts.map((part, i) => {
                    if (part.startsWith("*") && part.endsWith("*")) {
                         return renderHighlightedSpan(part.slice(1, -1), i);
                    }
                    return part;
               });
          }

          // 4. highlightText prop
          if (highlightText && typeof highlightText === "string" && highlightText.trim()) {
               const trimmed = highlightText.trim();
               const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
               const regex = new RegExp(`(${escaped})`, "gi");
               const parts = title.split(regex);
               if (parts.length > 1) {
                    return parts.map((part, i) => {
                         if (part.toLowerCase() === trimmed.toLowerCase()) {
                              return renderHighlightedSpan(part, i);
                         }
                         return part;
                    });
               }
          }

          // 5. Smart auto-highlight last word if title has multiple words (or single word like FAQ)
          if (autoHighlightLastWord) {
               const trimmedTitle = title.trim();
               const words = trimmedTitle.split(/\s+/);
               if (words.length > 1) {
                    const lastWord = words.pop();
                    const leadingText = words.join(" ");
                    return (
                         <>
                              {leadingText}{" "}
                              {renderHighlightedSpan(lastWord, "last")}
                         </>
                    );
               } else if (words.length === 1 && variant === "testimonial") {
                    return renderHighlightedSpan(words[0], "single");
               }
          }

          return title;
     };

     const textSubtitle = subtitle || description;

     const alignMap = {
          center: "text-center mx-auto",
          left: "text-left mr-auto",
          right: "text-right ml-auto"
     };
     const containerAlign = alignMap[align] || alignMap.center;
     const subtitleAlign = align === "left" ? "text-left" : align === "right" ? "text-right ml-auto" : "text-center mx-auto";

     const isTestimonial = variant === "testimonial";

     const hasCustomHeadingAlign = headingClassName && (
          headingClassName.includes("text-center") ||
          headingClassName.includes("text-left") ||
          headingClassName.includes("text-start") ||
          headingClassName.includes("text-right")
     );
     const defaultHeadingAlign = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
     const headingAlign = hasCustomHeadingAlign ? "" : defaultHeadingAlign;

     const hasCustomWidth = headingClassName && (
          headingClassName.includes("w-[") ||
          headingClassName.includes("max-w-") ||
          headingClassName.includes("w-full")
     );
     const defaultWidth = isTestimonial
          ? (align === "left" ? "w-full" : "w-full md:w-[70%]")
          : "";
     const headingWidth = hasCustomWidth ? "" : defaultWidth;

     const headingMx = (align === "left" || hasCustomHeadingAlign) ? "" : "mx-auto";

     const hasCustomFontSize = headingClassName && (
          headingClassName.includes("text-[") ||
          headingClassName.includes("text-xl") ||
          headingClassName.includes("text-2xl") ||
          headingClassName.includes("text-3xl") ||
          headingClassName.includes("text-4xl") ||
          headingClassName.includes("text-5xl") ||
          headingClassName.includes("text-6xl")
     );
     const defaultFontSize = isTestimonial
          ? "text-[31px] md:text-[48px] 2xl:text-[72px]"
          : "text-[31px] sm:text-[36px] md:text-[40px] lg:text-[48px]";
     const headingFontSize = hasCustomFontSize ? "" : defaultFontSize;

     const hasCustomLeading = headingClassName && (
          headingClassName.includes("leading-") ||
          headingClassName.includes("leading-[")
     );
     const defaultLeading = isTestimonial
          ? "leading-10 md:leading-15 2xl:leading-20"
          : "leading-tight";
     const headingLeading = hasCustomLeading ? "" : defaultLeading;

     const defaultHeadingClasses = isTestimonial
          ? `${headingFontSize} ${headingLeading} font-bold ${headingAlign} ${headingWidth} ${headingMx} z-20 relative text-secondary`.replace(/\s+/g, ' ').trim()
          : `${headingFontSize} font-bold ${headingLeading} text-secondary`.replace(/\s+/g, ' ').trim();

     const defaultSubtitleClasses = isTestimonial
          ? `para text-gray-600 max-w-3xl ${subtitleAlign} mt-2 md:mt-6 z-20 relative`
          : `para text-gray-600 max-w-2xl leading-relaxed mt-2 ${subtitleAlign}`;

     const hasCustomMargin = className && (
          className.includes("mb-") ||
          className.includes("my-") ||
          className.includes("m-")
     );
     const defaultMargin = isTestimonial
          ? (align === "left" ? "mb-6" : "mb-6 md:mb-10")
          : "mb-6 md:mb-10";
     const containerMargin = hasCustomMargin ? "" : defaultMargin;

     const defaultContainerClasses = isTestimonial
          ? (align === "left" ? `w-full text-left ${containerMargin}`.trim() : `max-w-4xl ${containerAlign} ${containerMargin}`.trim())
          : `space-y-2 max-w-3xl ${containerMargin} ${containerAlign}`.trim();

     return (
          <div className={`${defaultContainerClasses} ${className}`.trim()}>
               <HeadingTag className={`${defaultHeadingClasses} ${headingClassName}`.trim()}>
                    {renderTitleContent()}
               </HeadingTag>

               {textSubtitle && (
                    <p className={`${defaultSubtitleClasses} ${subtitleClassName}`.trim()}>
                         {textSubtitle}
                    </p>
               )}
          </div>
     );
}
