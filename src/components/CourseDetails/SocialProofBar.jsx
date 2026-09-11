"use client";

import { Star, GraduationCap, Briefcase, Trophy } from "lucide-react";

const GENERAL_ICONS = [Star, GraduationCap, Briefcase, Trophy];

function getIconForItem(item, idx) {
  const name = (item?.name || "").toLowerCase();

  if (name.includes("rating") || name.includes("star") || name.includes("google"))
    return Star;

  if (
    name.includes("alumni") ||
    name.includes("student") ||
    name.includes("trained") ||
    name.includes("graduat")
  )
    return GraduationCap;

  if (
    name.includes("placement") ||
    name.includes("job") ||
    name.includes("career") ||
    name.includes("rate")
  )
    return Briefcase;

  if (
    name.includes("partner") ||
    name.includes("company") ||
    name.includes("trophy") ||
    name.includes("award")
  )
    return Trophy;

  return GENERAL_ICONS[idx % GENERAL_ICONS.length];
}

export default function SocialProofBar({ items }) {
  const defaultItems = [
    { value: "5 / 5", name: "Google Rating" },
    { value: "1,000+", name: "Alumni Trained" },
    { value: "99%", name: "Placement Rate" },
    { value: "500+", name: "Hiring Partners" },
  ];

  const displayItems =
    Array.isArray(items) && items.length > 0 ? items : defaultItems;

  return (
    <section className="w-full bg-primary-bg/60 border-y border-primary/10 relative z-20 py-4 sm:pt-20 sm:pb-5 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {displayItems.slice(0, 4).map((item, idx) => {
            const IconComponent = getIconForItem(item, idx);

            return (
              <div
                key={idx}
                className="
                  group flex flex-wrap flex-col md:flex-row items-start md:items-center
                  gap-2.5 sm:gap-3.5
                  px-3.5 py-3 sm:px-5 sm:py-3.5
                  rounded-xl
                  shadow-2xs
                  bg-white
                  border border-gray-200/80
                  text-secondary
                  transition-all duration-300
                  hover:shadow-md
                  hover:border-primary/40
                  hover:-translate-y-0.5
                "
              >
                {/* Icon */}
                <div
                  className="
                    shrink-0
                    w-9 h-9 sm:w-11 sm:h-11
                    rounded-xl
                    bg-primary/10
                    border border-primary/20
                    flex items-center justify-center
                    text-primary
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  <IconComponent
                    size={20}
                    strokeWidth={2}
                    className="w-5 h-5 text-primary"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex flex-col">
                  <span
                    className="
                      text-lg sm:text-xl md:text-2xl
                      font-bold
                      leading-none
                      tracking-tight
                      text-secondary
                      truncate
                    "
                  >
                    {item.value || "100%"}
                  </span>

                  <span
                    className="
                      mt-1
                      text-[11px] sm:text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-gray-500
                      truncate
                    "
                  >
                    {item.name || "Metric"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
