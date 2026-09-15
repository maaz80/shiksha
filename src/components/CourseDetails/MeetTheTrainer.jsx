"use client";

import { Star, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { getOptimizedCloudinaryUrl } from "../CloudinaryImage";

export default function MeetTheTrainer({ data }) {
  const defaultTrainers = [
    {
      name: "Mr. Manoj Pandey",
      role: "SENIOR ENGINEER @ GOOGLE",
      bio: "UI/UX & Design Systems lead with 10+ years experience. Expert in AI Workflows and Product Strategy.",
      rating: "4.9/5",
      students: "400+ Students",
      image: "/images/trainer-manoj-pandey.jpg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ms. Amrit Raj",
      role: "DATA SCIENTIST @ MICROSOFT",
      bio: "Ex-Adobe | PhD Statistics. Specialist in User Research, Predictive Analytics & Interaction Design.",
      rating: "5.0/5",
      students: "250+ Students",
      image: "/images/trainer-amrit-raj.jpg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Mr. Sudheer Sharma",
      role: "PRODUCT MANAGER @ AMAZON",
      bio: "Ex-Flipkart | MBA. Mentoring on Agile Delivery, Marketplace Dynamics & High-Fidelity Figma Prototyping.",
      rating: "4.8/5",
      students: "180+ Students",
      image: "/images/trainer-sudheer-sharma.jpg",
      linkedin: "https://linkedin.com"
    }
  ];

  const title = data?.trainers?.title?.trim() || "Meet The Trainers";
  const subtitle = data?.trainers?.subtitle?.trim() || "Get 1-on-1 mentorship and practical insights from active design leads and engineers at top companies.";
  const trainersList = (Array.isArray(data?.trainers?.items) && data.trainers.items.length > 0)
    ? data.trainers.items
    : (Array.isArray(data?.trainers) && data.trainers.length > 0)
    ? data.trainers
    : defaultTrainers;

  return (
    <section className="w-full bg-primary-bg/30 py-12 sm:py-16 md:py-20 border-b border-gray-100 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-[#0050B3] border border-primary/20 mb-1">
            LEARN FROM INDUSTRY LEADERS
          </span>
          <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
            {title}
          </h2>
          <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed mt-2">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trainersList.map((trainer, idx) => (
            <div
              key={idx}
              className="w-full max-w-sm mx-auto bg-white rounded-[20px] overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Trainer Photo Header (Hard Blurred) */}
              <div className="relative w-full h-64 sm:h-72 bg-gray-100 overflow-hidden">
                <img
                  src={getOptimizedCloudinaryUrl(trainer.image, { width: 500, quality: "50", format: "auto", crop: "fill" }) || "/images/trainer-manoj-pandey.jpg"}
                  alt={trainer.name || "Trainer"}
                  width="365"
                  height="288"
                  className="w-full h-full object-cover object-top filter blur-md sm:blur-lg scale-110 select-none opacity-80"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    {/* Name (Hard Blurred) */}
                    <h3 className="font-bold text-xl sm:text-2xl text-secondary select-none filter blur-sm sm:blur-md tracking-wider pointer-events-none">
                      {trainer.name || "Trainer Name"}
                    </h3>
                    {/* LinkedIn Link (Hard Blurred) */}
                    {trainer.linkedin && (
                      <span
                        role="img"
                        className="w-8 h-8 rounded-full bg-gray-100 text-secondary flex items-center justify-center shrink-0 select-none filter blur-xs sm:blur-sm pointer-events-none opacity-60"
                        aria-label={`${trainer.name} LinkedIn Profile`}
                      >
                        <FaLinkedinIn size={14} />
                      </span>
                    )}
                  </div>

                  {/* Role (Hard Blurred) */}
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary mb-2.5 select-none filter blur-xs sm:blur-sm pointer-events-none">
                    {trainer.role || "MENTOR"}
                  </p>

                  <p className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed line-clamp-3">
                    {trainer.bio || "Experienced industry practitioner and mentor."}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 font-bold text-secondary">
                    <span>{trainer.rating || "5.0/5"}</span>
                    <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" />
                    {trainer.students && (
                      <span className="text-gray-600 font-normal ml-0.5">({trainer.students})</span>
                    )}
                  </div>

                  <a
                    href="#demo-class"
                    className="font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
