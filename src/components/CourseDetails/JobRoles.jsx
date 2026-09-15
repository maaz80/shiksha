"use client";

import React from "react";
import { Briefcase, BarChart3, Clock, UserCheck, Layers, Award } from "lucide-react";

export default function JobRoles({ data }) {
     const courseName = data?.title || "UI/UX Design";

     const jobRolesData = data?.jobRoles || {};
     const tag = jobRolesData.tag?.trim() || "JOB ROLES";
     const title = jobRolesData.title?.trim() || `Job Roles After ${courseName}`;
     const description = jobRolesData.description?.trim() || `Unlock exciting career opportunities with in-demand ${courseName} roles. Plan your path from fundamental skills to industry leadership.`;

     const defaultRoles = [
          {
               step: "01",
               iconName: "briefcase",
               title: "UI/UX Designer",
               description: "Design intuitive, user-centered digital interfaces and interactive product experiences using modern design systems and prototyping software.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "Wireframing, High-Fidelity Prototyping, Design Systems, Mobile & Web Layouts"
          },
          {
               step: "02",
               iconName: "chart",
               title: "Product Designer",
               description: "Lead end-to-end product design processes, bridging user needs, technical capabilities, and core business growth objectives.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "User Research, Product Strategy, Interaction Design, Cross-Functional Collaboration"
          },
          {
               step: "03",
               iconName: "user",
               title: "UX Researcher & Strategist",
               description: "Conduct usability testing, user interviews, and data-driven analysis to transform insights into user-focused design decisions.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "Usability Testing, User Interviews, Information Architecture, Persona Mapping"
          }
     ];

     const items = (Array.isArray(jobRolesData.items) && jobRolesData.items.length > 0)
          ? jobRolesData.items
          : defaultRoles;

     const getIcon = (iconName, idx) => {
          const key = iconName ? String(iconName).toLowerCase().trim() : "";
          if (key === "briefcase" || key === "job") return <Briefcase className="w-5 h-5 stroke-[2.2]" />;
          if (key === "chart" || key === "analytics" || key === "bar") return <BarChart3 className="w-5 h-5 stroke-[2.2]" />;
          if (key === "user" || key === "researcher" || key === "person") return <UserCheck className="w-5 h-5 stroke-[2.2]" />;
          if (key === "clock" || key === "time") return <Clock className="w-5 h-5 stroke-[2.2]" />;
          if (key === "layers") return <Layers className="w-5 h-5 stroke-[2.2]" />;
          if (key === "award") return <Award className="w-5 h-5 stroke-[2.2]" />;

          if (idx % 3 === 0) return <Briefcase className="w-5 h-5 stroke-[2.2]" />;
          if (idx % 3 === 1) return <BarChart3 className="w-5 h-5 stroke-[2.2]" />;
          return <UserCheck className="w-5 h-5 stroke-[2.2]" />;
     };

     return (
          <section className="w-full bg-primary-bg/30 py-12 sm:py-16 md:py-20 font-open-sans border-b border-gray-100 relative z-1">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="text-center space-y-2 max-w-3xl mx-auto mb-10 md:mb-14">
                         <div>
                              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-md bg-primary/10 text-[#0050B3] border border-primary/20 mb-1">
                                   {tag}
                              </span>
                         </div>
                         <h2 className="text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-secondary">
                              {title}
                         </h2>
                         <p className="text-sm sm:text-base font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed mt-2">
                              {description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {items.map((item, idx) => {
                              const stepNum = item.step || `0${idx + 1}`;

                              return (
                                   <div
                                        key={idx}
                                        className="group relative bg-white rounded-[20px] p-6 sm:p-7 border border-gray-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden border-l-4 border-l-primary hover:border-l-primary"
                                   >
                                        <div>
                                             <div className="flex items-center justify-between mb-5">
                                                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-primary/20 bg-primary/10 text-primary shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                                       {getIcon(item.iconName, idx)}
                                                  </div>
                                                  <span className="font-bold text-sm text-gray-600 group-hover:text-secondary tracking-wider">
                                                       {stepNum}
                                                  </span>
                                             </div>
                                             <h3 className="font-bold text-xl sm:text-2xl text-secondary leading-tight mb-2 transition-colors">
                                                  {item.title}
                                             </h3>
                                             <p className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed mb-6 transition-colors">
                                                  {item.description}
                                             </p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 group-hover:border-gray-200 mt-auto">
                                             <div className="flex items-center gap-1.5 font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-1 text-primary">
                                                  <span className="font-extrabold text-sm">&gt;</span>
                                                  <span>{item.keyFocusTitle || "KEY FOCUS AREAS"}</span>
                                             </div>
                                             <p className="text-xs sm:text-[13px] font-semibold text-secondary leading-normal">
                                                  {item.keyFocus}
                                             </p>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}
