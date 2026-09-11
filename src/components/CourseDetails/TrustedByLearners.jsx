"use client";

import { Star } from "lucide-react";

export default function TrustedByLearners({ data }) {
  const title = data?.trustedByLearners?.title || "Trusted By Millions Of Learners";

  const defaultRatings = [
    {
      score: "4.9",
      image: "/images/google-logo-icon.webp",
      alt: "Google",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.89",
      image: "/images/course-report.png",
      alt: "Course Report",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.94",
      image: "/images/switchup.png",
      alt: "SwitchUp",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.7",
      image: "/images/career-karma-logo.png",
      alt: "Career Karma",
      heightClass: "h-5 sm:h-6"
    }
  ];

  const ratings = (Array.isArray(data?.trustedByLearners?.items) && data.trustedByLearners.items.length > 0)
    ? data.trustedByLearners.items
    : defaultRatings;

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-b border-gray-100 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-6">
        
        {/* Section Heading */}
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-secondary leading-tight">
          {title}
        </h2>

        {/* Badges Grid / Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
          {ratings.map((item, idx) => (
            <div
              key={idx}
              className="bg-primary-bg/30 border border-gray-200/90 rounded-[20px] px-5 py-3 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex items-center gap-3 shrink-0"
            >
              {/* Score */}
              <span className="font-bold text-base sm:text-lg text-secondary">
                {item.score}
              </span>

              {/* Star Icon */}
              <Star size={18} className="fill-amber-400 text-amber-400 shrink-0" />

              {/* Platform Logo Image */}
              <div className="pl-3 border-l border-gray-200 flex items-center">
                <img
                  src={item.image || "/images/google-logo-icon.webp"}
                  alt={item.alt || "Rating Badge"}
                  width="120"
                  height="24"
                  className={`w-auto ${item.heightClass || "h-5 sm:h-6"} object-contain max-w-27.5 sm:max-w-32.5`}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
