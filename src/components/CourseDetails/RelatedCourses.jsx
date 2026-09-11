"use client";

import React from "react";
import { useCourses } from "@/context/CourseContext";
import RelatedCourseCard from "./RelatedCourseCard";

const staticRelatedCourses = [
     {
          _id: "rc-1",
          title: "Advance Certificate in UI UX",
          slug: "advance-certificate-ui-ux",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "10th Dec, 26",
          courselength: "6 Months",
          category: "UI & UX Design"
     },
     {
          _id: "rc-2",
          title: "Interaction Design Masterclass",
          slug: "interaction-design-masterclass",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "15th Dec, 26",
          courselength: "3 Months",
          category: "UI & UX Design"
     },
     {
          _id: "rc-3",
          title: "AI-Powered Product Design",
          slug: "ai-product-design",
          description: "Learn to leverage generative AI models in your design workflows to speed up concept testing.",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "10th Dec, 26",
          courselength: "4 Months",
          category: "Generative AI"
     }
];

export default function RelatedCourses({ currentSlug, data }) {
     const context = useCourses() || {};
     const coursesData = context.courses || [];

     const tagline = (data?.tagline || data?.relatedCoursesTagline || "COURSES").trim();
     const startheading = (data?.startheading || "Explore").trim();
     const midheading = (data?.midheading || "Related").trim();
     const endheading = (data?.endheading || "Courses").trim();
     const description = (data?.description || data?.relatedCoursesSubtitle || "Enhance your career expertise with our industry-tailored certification programs.").trim();

     const getCourseList = (dataObj) => {
          if (!dataObj) return [];
          if (Array.isArray(dataObj)) return dataObj;
          if (Array.isArray(dataObj.course)) return dataObj.course;
          if (Array.isArray(dataObj.courses)) return dataObj.courses;
          if (Array.isArray(dataObj.data)) return dataObj.data;
          return [];
     };

     const rawCourses = getCourseList(coursesData);
     const availableCourses = rawCourses.length > 0 ? rawCourses : staticRelatedCourses;

     const formattedCourses = availableCourses.map(c => ({
          ...c,
          _id: c._id || c.slug,
          title: c.title || "Certification Course",
          slug: c.slug || c._id,
          description: c.description || c.overview || c.seodescription || "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: c.image || "/images/weekend-ux-program-image-template.webp",
          startdate: c.startdate || c.deadline || "10th Dec, 26",
          category: c.category || "Design"
     }));

     const filteredCourses = formattedCourses.filter(c => (c.slug !== currentSlug && c._id !== currentSlug)).slice(0, 3);
     const displayCourses = filteredCourses.length > 0 ? filteredCourses : formattedCourses.slice(0, 3);

     return (
          <section className="w-full pt-12 sm:pt-16 md:pt-20 font-open-sans bg-primary-bg/40 relative z-1 overflow-hidden border-b border-gray-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <div className="text-center space-y-2 max-w-3xl mx-auto mb-10 md:mb-14">
                         <div>
                              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 mb-1">
                                   {tagline}
                              </span>
                         </div>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
                              {startheading}{" "}
                              {midheading && <span className="text-primary">{midheading}</span>}
                              {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed mt-2">
                              {description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
                         {displayCourses.map((course, idx) => (
                              <div key={course._id || idx} className="w-full flex justify-center">
                                   <RelatedCourseCard course={course} />
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
