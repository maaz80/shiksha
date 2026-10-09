"use client";

import { useState } from "react";
import { ChevronDown as FiChevronDown, ChevronUp as FiChevronUp } from "lucide-react";
import CourseSectionHeading from "./CourseSectionHeading";

export default function SkillsYouWillLearn({ data }) {
  const [showAll, setShowAll] = useState(false);

  const defaultSkills = [
    "AGENTIC AI SYSTEMS",
    "RETRIEVAL-AUGMENTED GENERATION (RAG)",
    "FINE-TUNING (LORA QLORA PEFT)",
    "MULTI-AGENT SYSTEMS",
    "AGENT EVALUATION & HUMAN-IN-THE-LOOP",
    "UI/UX DESIGN & WIREFRAMING",
    "FIGMA & DESIGN SYSTEMS",
    "PROTOTYPING & USER TESTING"
  ];

  const title = data?.skillsYouWillLearn?.title?.trim() || "Skills you will learn";
  const defaultSubtitle = "Gain hands-on expertise in high-demand tools, practical techniques, and industry-standard workflows.";
  const subtitle = data?.skillsYouWillLearn?.subtitle?.trim() || data?.skillsYouWillLearn?.description?.trim() || defaultSubtitle;
  const rawSkills = data?.skillsYouWillLearn?.skills;
  const skillsList = Array.isArray(rawSkills) && rawSkills.length > 0
    ? rawSkills.filter(s => s && String(s).trim())
    : defaultSkills;

  const INITIAL_LIMIT = 5;
  const visibleSkills = showAll ? skillsList : skillsList.slice(0, INITIAL_LIMIT);
  const hasMore = skillsList.length > INITIAL_LIMIT;

  return (
    <section className="w-full bg-white pt-0 pb-8 sm:py-16 border-b border-gray-100 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <CourseSectionHeading
          title={title}
          highlightText={data?.skillsYouWillLearn?.highlightText?.trim() || (title.toLowerCase().startsWith("skills") ? "Skills" : undefined)}
          subtitle={subtitle}
        />

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          {visibleSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-block px-4 py-2.5 sm:px-5 sm:py-3 bg-secondary text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase rounded-md shadow-2xs hover:bg-primary transition-all duration-200 cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>

        {hasMore && (
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-xs sm:text-sm font-bold text-primary hover:text-primary/80 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>{showAll ? "VIEW LESS" : "VIEW MORE"}</span>
              {showAll ? (
                <FiChevronUp className="text-base sm:text-lg" />
              ) : (
                <FiChevronDown className="text-base sm:text-lg" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
