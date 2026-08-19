"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight, Download, Share2, PhoneCall } from "lucide-react";
import Form from "./Form";
import CallCard from "./CallCard";

export default function Details({ data }) {
     const [sliderIndex, setSliderIndex] = useState(0);
     const [caseStudyIndex, setCaseStudyIndex] = useState(0);
     const [visibleCards, setVisibleCards] = useState(3);
     const [shareUrl, setShareUrl] = useState("");

     useEffect(() => {
          if (typeof window !== "undefined") {
               setShareUrl(window.location.href);
          }
     }, []);

     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth < 640) {
                    setVisibleCards(1);
               } else if (window.innerWidth < 1024) {
                    setVisibleCards(2);
               } else {
                    setVisibleCards(3);
               }
          };
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     const promoTitle = data?.promoTitle || "UI UX Design Courses in Delhi at Affordable Fees";
     const promoDesc = data?.promoDescription || "The demand for skilled UI and UX designers has increased rapidly with the rise of digital experiences.\n\nAs a result, UI UX design courses are now more popular than ever. In Delhi, these programs are among the most in-demand career options in today's time. Our UI/UX design institute has been providing industry-oriented training in these courses since its inception.";

     const hasKeyword = promoTitle.toLowerCase().startsWith("ui ux design courses");
     const displayTitle = hasKeyword ? (
          <>
               <span className="text-primary font-bold">UI UX Design Courses</span> {promoTitle.substring(20)}
          </>
     ) : promoTitle;

     const paragraphs = promoDesc.split("\n\n").filter(Boolean);

     const benefitsString = data?.promoBenefits || "Training Since 2006, Small Batches for UX Design, Highly Experienced UX Faculty, 99% Hiring Rate, UX/UI Portfolio Development";
     const benefitsList = benefitsString.split(",").map(b => b.trim()).filter(Boolean);

     const defaultShortTermItems = [
          {
               title: "Adobe XD Course",
               description: "Adobe XD is a superb tool for UI and UX designers. It enables us for excellent designing, prototyping, and team collaborations. Best UX tool for users using Adobe software.",
               duration: "DURATION: 01 MONTH",
               iconText: "Xd"
          },
          {
               title: "Figma Fundamentals",
               description: "Learn how to build responsive layouts, reusable components, dynamic design systems and interactive high fidelity prototypes in Figma.",
               duration: "DURATION: 02 WEEKS",
               iconText: "Fg"
          }
     ];
     const shortTermItems = (data?.shortTerm?.items && data.shortTerm.items.length > 0)
          ? data.shortTerm.items
          : defaultShortTermItems;

     const handlePrev = () => {
          setSliderIndex(prev => (prev === 0 ? shortTermItems.length - 1 : prev - 1));
     };
     const handleNext = () => {
          setSliderIndex(prev => (prev === shortTermItems.length - 1 ? 0 : prev + 1));
     };

     const caseStudiesTitle = data?.caseStudies?.title || "UX Case Studies by Our Students";
     const hasStudiesKeyword = caseStudiesTitle.toLowerCase().startsWith("ux case studies");
     const displayCaseStudiesTitle = hasStudiesKeyword ? (
          <>
               <span className="text-primary font-bold">UX Case Studies</span> {caseStudiesTitle.substring(15)}
          </>
     ) : caseStudiesTitle;

     const defaultCaseStudies = [
          {
               image: "/images/shiksha-design-hero.webp",
               alt: "Rezeeride Web Ads Creative",
               link: "#"
          },
          {
               image: "/images/shiksha-design-hero.webp",
               alt: "Photoshop Creative Poster Design",
               link: "#"
          },
          {
               image: "/images/shiksha-design-hero.webp",
               alt: "Responsive Frontend Layout Project",
               link: "#"
          }
     ];
     const caseStudiesItems = (data?.caseStudies?.items && data.caseStudies.items.length > 0)
          ? data.caseStudies.items
          : defaultCaseStudies;

     const handleCaseStudyPrev = () => {
          setCaseStudyIndex(prev => (prev === 0 ? Math.max(0, caseStudiesItems.length - visibleCards) : prev - 1));
     };
     const handleCaseStudyNext = () => {
          setCaseStudyIndex(prev => (prev >= caseStudiesItems.length - visibleCards ? 0 : prev + 1));
     };

     const defaultCareerDomains = [
          { name: "Graphic Design", link: "#", iconName: "graphic", color: "#10B981" },
          { name: "Web Design", link: "#", iconName: "web", color: "#2563EB" },
          { name: "Post Production", link: "#", iconName: "post", color: "#9333EA" },
          { name: "Data Analytics", link: "#", iconName: "analytics", color: "#701A75" },
          { name: "CAD & Architecture", link: "#", iconName: "cad", color: "#854D0E" },
          { name: "3D Animation", link: "#", iconName: "animation", color: "#0D9488" },
          { name: "Web Development", link: "#", iconName: "code", color: "#1E3A8A" },
          { name: "CAD Textile Design", link: "#", iconName: "textile", color: "#D97706" },
          { name: "Software Development", link: "#", iconName: "software", color: "#16A34A" },
          { name: "Digital Marketing", link: "#", iconName: "marketing", color: "#0891B2" },
          { name: "Machine Learning & AI", link: "#", iconName: "ai", color: "#C026D3" },
          { name: "Video Editing", link: "#", iconName: "video", color: "#DC2626" }
     ];

     const careerDomainsItems = (data?.careerDomains?.items && data.careerDomains.items.length > 0)
          ? data.careerDomains.items
          : defaultCareerDomains;

     const careerDomainsTitle = data?.careerDomains?.title || "Explore More Career Domains";
     const careerDomainsDescription = data?.careerDomains?.description || "Discover diverse courses to continuously enhance your skills through diploma programs in various fields.";

     const hasExploreMoreKeyword = careerDomainsTitle.toLowerCase().startsWith("explore more");
     const displayCareerDomainsTitle = hasExploreMoreKeyword ? (
          <>
               <span className="text-primary font-bold">Explore More</span> {careerDomainsTitle.substring(12)}
          </>
     ) : careerDomainsTitle;

     const downloadSyllabus = async () => {
          if (!data) return;

          if (!window.jsPDF) {
               await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                    script.onload = () => {
                         window.jsPDF = window.jspdf.jsPDF;
                         resolve();
                    };
                    document.body.appendChild(script);
               });
          }

          const doc = new window.jsPDF({
               orientation: "portrait",
               unit: "mm",
               format: "a4"
          });

          // Top Header Primary Accent (#0071E5)
          doc.setFillColor(0, 113, 229);
          doc.rect(0, 0, 210, 8, "F");

          // Brand Header
          doc.setFont("helvetica", "bold");
          doc.setFontSize(22);
          doc.setTextColor(38, 57, 77); // #26394D
          doc.text("SHIKSHA", 15, 24);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(115, 115, 115);
          doc.text("Professional Learning & Career Development Platform", 15, 29);

          // Course title and meta details
          doc.setFont("helvetica", "bold");
          doc.setFontSize(18);
          doc.setTextColor(38, 57, 77);
          doc.text((data.title || "UI/UX DESIGN COURSE").toUpperCase(), 15, 44);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10.5);
          doc.setTextColor(115, 115, 115);
          doc.text(`Category: ${data.category || "UI/UX Design"}   |   Start Date: ${data.startdate || "Upcoming Intake"}`, 15, 50);

          // Divider Line
          doc.setDrawColor(228, 228, 231);
          doc.setLineWidth(0.4);
          doc.line(15, 55, 195, 55);

          // Course Overview Section
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12.5);
          doc.setTextColor(38, 57, 77);
          doc.text("Course Overview", 15, 65);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(63, 63, 70);
          const overviewText = data.overview || "Master the art of design. Learn through interactive projects, expert mentorship, and industry-standard workflows.";
          const splitOverview = doc.splitTextToSize(overviewText, 180);
          doc.text(splitOverview, 15, 71);

          let y = 71 + (splitOverview.length * 5.2) + 12;

          // Course Curriculum Section
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12.5);
          doc.setTextColor(38, 57, 77);
          doc.text("Course Curriculum", 15, y);
          y += 8;

          const curriculum = data.chapter || data.sections || [];
          if (curriculum.length > 0) {
               curriculum.forEach((chap, cIdx) => {
                    if (y > 255) {
                         doc.addPage();
                         doc.setFillColor(0, 113, 229);
                         doc.rect(0, 0, 210, 8, "F");
                         y = 25;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);
                    doc.setTextColor(38, 57, 77);
                    doc.text(`Chapter ${cIdx + 1}: ${chap.chaptername || chap.title || "Untitled Chapter"}`, 15, y);
                    y += 6.5;

                    const lessons = chap.lessons || chap.items || [];
                    lessons.forEach((les) => {
                         if (y > 265) {
                              doc.addPage();
                              doc.setFillColor(0, 113, 229);
                              doc.rect(0, 0, 210, 8, "F");
                              y = 25;
                         }
                         doc.setFont("helvetica", "normal");
                         doc.setFontSize(9.5);
                         doc.setTextColor(63, 63, 70);
                         const lessonName = typeof les === "object" ? (les.lessonname || les.name || les.title) : les;
                         doc.text(`•  ${lessonName}`, 20, y);
                         y += 5.5;
                    });
                    y += 4;
               });
          } else {
               doc.setFont("helvetica", "normal");
               doc.setFontSize(10);
               doc.setTextColor(63, 63, 70);
               doc.text("Curriculum details will be provided upon class commencement.", 15, y);
               y += 8;
          }

          // Footer branding and page numbers
          const pageCount = doc.internal.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
               doc.setPage(i);
               doc.setDrawColor(244, 244, 245);
               doc.line(15, 278, 195, 278);

               doc.setFont("helvetica", "normal");
               doc.setFontSize(8);
               doc.setTextColor(161, 161, 170);
               doc.text(`Contact: ${data.brochurePhones || "+91 9911782350"}  |  Visit: www.shiksha.com`, 15, 284);
               doc.text(`Page ${i} of ${pageCount}`, 180, 284);
          }

          const fileName = `${(data.title || "syllabus").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-syllabus.pdf`;
          doc.save(fileName);
     };

     const getIconBadge = (iconText) => (
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-base flex items-center justify-center shrink-0 border border-primary/20">
               {iconText || "UX"}
          </div>
     );

     return (
          <div className="w-full space-y-0">
               {/* SECTION 1: Promo Content, Benefits, Social Share & Admission Form */}
               <section className="bg-primary-bg/50 py-12 lg:py-16 w-full border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-0">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

                              {/* LEFT COLUMN: Content */}
                              <div className="space-y-8 lg:col-span-2">
                                   <div>
                                        <h2 className="text-[28px] md:text-[40px] font-bold leading-tight text-secondary">
                                             {displayTitle}
                                        </h2>
                                        <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
                                   </div>

                                   <div className="space-y-4 text-[16px] text-secondary/80 leading-relaxed">
                                        {paragraphs.map((p, idx) => (
                                             <p key={idx}>{p}</p>
                                        ))}
                                   </div>

                                   {/* Benefits List */}
                                   <div className="space-y-3 pt-2">
                                        <h3 className="text-lg font-bold text-secondary">Key Course Highlights:</h3>
                                        <ul className="space-y-3 text-[15px] md:text-[16px] font-semibold text-secondary">
                                             {benefitsList.map((benefit, idx) => (
                                                  <li key={idx} className="flex items-center gap-3">
                                                       <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                       <span>{benefit}</span>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>

                                   {/* Social Media Share */}
                                   <div className="pt-6 border-t border-gray-200">
                                        <div className="flex flex-col gap-3">
                                             <span className="text-xs uppercase tracking-wider text-secondary/70 font-bold">
                                                  Share This Course
                                             </span>
                                             <div className="flex items-center gap-3">
                                                  <a
                                                       href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-white border border-gray-200 text-secondary hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center shadow-xs cursor-pointer"
                                                       aria-label="Share on Facebook"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                                       </svg>
                                                  </a>
                                                  <a
                                                       href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-white border border-gray-200 text-secondary hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center shadow-xs cursor-pointer"
                                                       aria-label="Share on LinkedIn"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                                       </svg>
                                                  </a>
                                                  <a
                                                       href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Check out the " + (data?.title || "UI/UX Design") + " course on Shiksha!")}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-white border border-gray-200 text-secondary hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center shadow-xs cursor-pointer"
                                                       aria-label="Share on Twitter"
                                                  >
                                                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                       </svg>
                                                  </a>
                                                  <a
                                                       href={`mailto:?subject=${encodeURIComponent("Check out the " + (data?.title || "UI/UX Design") + " course")}&body=${encodeURIComponent("I found this course on Shiksha: " + shareUrl)}`}
                                                       className="w-10 h-10 rounded-full bg-white border border-gray-200 text-secondary hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center shadow-xs cursor-pointer"
                                                       aria-label="Share via Email"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                                       </svg>
                                                  </a>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Rich Text Bottom Content */}
                                   {data?.promoSocialBottomContent && (
                                        <div className="pt-6 border-t border-gray-200">
                                             <div
                                                  className="prose prose-zinc max-w-none text-[16px] text-secondary/80 leading-relaxed space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-secondary [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-secondary [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-secondary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-primary [&_a]:font-bold hover:[&_a]:underline"
                                                  dangerouslySetInnerHTML={{ __html: data.promoSocialBottomContent }}
                                             />
                                        </div>
                                   )}
                              </div>

                              {/* RIGHT COLUMN: Sidebar Form & CallCard */}
                              <div className="space-y-3 lg:sticky lg:top-30 top-24">
                                   <Form />
                                   <CallCard
                                        title="Design is more than just being creative!"
                                        subtitle="Learn how to make design that sells"
                                        buttonText="Enquire Now"
                                        onButtonClick={() => {
                                             if (typeof window !== "undefined") {
                                                  window.dispatchEvent(new CustomEvent("openLeadModal"));
                                             }
                                        }}
                                   />
                              </div>

                         </div>
                    </div>
               </section>

               {/* SECTION 2: Syllabus Brochure Banner & Dynamic PDF Downloader */}
               <section className="bg-white py-10 w-full border-b border-gray-100">
                    <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-14">
                         <div className="relative overflow-hidden bg-primary-bg/60 border border-primary/20 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                              <div className="flex-1 space-y-2 text-left">
                                   <h2 className="text-[22px] md:text-[26px] font-bold text-secondary leading-tight">
                                        {data?.brochureTitle || "Comprehensive Syllabus for UI UX Design Training"}
                                   </h2>
                                   <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed max-w-2xl">
                                        {data?.brochureSubtext || "Explore our detailed course syllabus and module breakdown. Download the full brochure PDF now."}
                                   </p>
                                   <p className="text-sm text-secondary font-medium pt-1">
                                        Get in touch: <span className="font-bold text-primary">{data?.brochurePhones || "+91 9911782350 or +91 9811818122"}</span>
                                   </p>
                              </div>
                              <div className="shrink-0 flex items-center gap-3">
                                   <button
                                        onClick={() => {
                                             if (typeof window !== "undefined") {
                                                  window.dispatchEvent(
                                                       new CustomEvent("openLeadModal", {
                                                            detail: { courseId: data?._id || data?.slug }
                                                       })
                                                  );
                                             }
                                        }}
                                        className="btn-action-primary"
                                   >
                                        Get Brochure
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>

               {/* SECTION 3: Short-Term Courses Interactive Slider */}
               <section className="bg-primary text-white py-12 md:py-16 w-full">
                    <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-14">
                         <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_520px] gap-10 items-center">

                              {/* Left Controls & Headings */}
                              <div className="space-y-6 text-left">
                                   <div>
                                        <h2 className="text-[28px] md:text-[36px] font-bold leading-tight text-white">
                                             {data?.shortTerm?.title || "Short-term UX Design Courses"}
                                        </h2>
                                        <p className="text-gray-200 text-[15px] md:text-[16px] leading-relaxed max-w-lg mt-3">
                                             {data?.shortTerm?.description || "Check out short duration courses for building a strong foundation in UI & UX design."}
                                        </p>
                                   </div>

                                   <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
                                        <Link
                                             href="/contact-us"
                                             className="btn-action-white"
                                        >
                                             Enquire Now
                                        </Link>

                                        {shortTermItems.length > 1 && (
                                             <div className="flex items-center gap-3">
                                                  <button
                                                       onClick={handlePrev}
                                                       className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary hover:border-white text-white transition-all cursor-pointer"
                                                       aria-label="Previous Course"
                                                  >
                                                       <ChevronLeft size={20} />
                                                  </button>
                                                  <button
                                                       onClick={handleNext}
                                                       className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary hover:border-white text-white transition-all cursor-pointer"
                                                       aria-label="Next Course"
                                                  >
                                                       <ChevronRight size={20} />
                                                  </button>
                                             </div>
                                        )}
                                   </div>
                              </div>

                              {/* Right Active Card Display */}
                              <div className="w-full">
                                   <div className="bg-white text-secondary rounded-2xl p-6 shadow-xl border border-white/10 min-h-55 flex flex-col justify-between">
                                        <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-6">
                                             {shortTermItems[sliderIndex]?.description}
                                        </p>
                                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                                             {shortTermItems[sliderIndex]?.image ? (
                                                  <img
                                                       src={shortTermItems[sliderIndex].image}
                                                       alt={shortTermItems[sliderIndex]?.alt || "Course"}
                                                       className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
                                                  />
                                             ) : (
                                                  getIconBadge(shortTermItems[sliderIndex]?.iconText)
                                             )}
                                             <div>
                                                  <p className="font-bold text-secondary text-base md:text-lg leading-tight">
                                                       {shortTermItems[sliderIndex]?.title}
                                                  </p>
                                                  <p className="text-xs font-bold text-primary tracking-wider uppercase mt-1">
                                                       {shortTermItems[sliderIndex]?.duration}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                         </div>
                    </div>
               </section>

               {/* SECTION 4: Student Case Studies Slider / Showcase Gallery */}
               <section className="bg-gray-50 py-12 md:py-16 w-full border-b border-gray-100">
                    <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-14 overflow-hidden">
                         <div className="text-center space-y-2 mb-10">
                              <h2 className="text-[28px] md:text-[36px] font-bold text-secondary">
                                   {displayCaseStudiesTitle}
                              </h2>
                              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
                                   {data?.caseStudies?.description || "Explore real-world UX case studies and projects created by our students."}
                              </p>
                         </div>

                         {/* Responsive Carousel */}
                         <div className="overflow-hidden relative w-full px-1">
                              <div
                                   className="flex transition-transform duration-500 ease-in-out"
                                   style={{ transform: `translateX(-${caseStudyIndex * (100 / visibleCards)}%)` }}
                              >
                                   {caseStudiesItems.map((study, idx) => (
                                        <div
                                             key={idx}
                                             className="shrink-0 px-3"
                                             style={{ width: `${100 / visibleCards}%` }}
                                        >
                                             <Link
                                                  href={study.link || "#"}
                                                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 transform mb-1"
                                             >
                                                  <div className="aspect-4/3 bg-gray-100 overflow-hidden relative">
                                                       {study.image ? (
                                                            <img
                                                                 src={study.image}
                                                                 alt={study.alt || "Case Study"}
                                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                       ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                                 Student Project Work
                                                            </div>
                                                       )}
                                                  </div>
                                                  <div className="p-4 border-t border-gray-100 text-left">
                                                       <p className="font-semibold text-secondary text-sm md:text-base group-hover:text-primary transition-colors line-clamp-1">
                                                            {study.alt || `Case Study ${idx + 1}`}
                                                       </p>
                                                  </div>
                                             </Link>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Navigation controls */}
                         {caseStudiesItems.length > visibleCards && (
                              <div className="flex items-center justify-center gap-4 mt-8">
                                   <button
                                        onClick={handleCaseStudyPrev}
                                        className="w-10 h-10 rounded-full border border-gray-300 hover:border-primary text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer bg-white shadow-xs"
                                        aria-label="Previous Case Study"
                                   >
                                        <ChevronLeft size={20} />
                                   </button>
                                   <button
                                        onClick={handleCaseStudyNext}
                                        className="w-10 h-10 rounded-full border border-gray-300 hover:border-primary text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer bg-white shadow-xs"
                                        aria-label="Next Case Study"
                                   >
                                        <ChevronRight size={20} />
                                   </button>
                              </div>
                         )}
                    </div>
               </section>

               {/* SECTION 5: Explore More Career Domains Grid */}
               <section className="relative py-12 md:py-20 w-full bg-primary-bg/30">
                    <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-14 relative z-10">
                         <div className="text-left space-y-2 mb-10">
                              <h2 className="text-[28px] md:text-[36px] font-bold text-secondary">
                                   {displayCareerDomainsTitle}
                              </h2>
                              <p className="text-gray-600 text-sm md:text-base max-w-2xl">
                                   {careerDomainsDescription}
                              </p>
                         </div>

                         {/* Career Domains Flex Layout */}
                         <div className="flex flex-wrap gap-3 justify-start">
                              {careerDomainsItems.map((item, idx) => (
                                   <Link
                                        key={idx}
                                        href={item.link || "#"}
                                        className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:shadow-md hover:border-primary transition-all duration-300 group cursor-pointer"
                                        onMouseEnter={(e) => {
                                             if (item.color) e.currentTarget.style.borderColor = item.color;
                                        }}
                                        onMouseLeave={(e) => {
                                             e.currentTarget.style.borderColor = "";
                                        }}
                                   >
                                        <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                                             {getDomainIconSVG(item.iconName, item.color)}
                                        </div>
                                        <span
                                             className="font-bold text-sm md:text-base text-secondary transition-colors"
                                             style={{ color: item.color || "#26394D" }}
                                        >
                                             {item.name}
                                        </span>
                                   </Link>
                              ))}
                         </div>
                    </div>
               </section>
          </div>
     );
}

function getDomainIconSVG(iconName, color = "#0071E5") {
     const stroke = color;
     const fill = `${color}15`;
     const normalized = (iconName || "").toLowerCase().trim();

     switch (normalized) {
          case "graphic":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m12 22 1-1c1.4-1.4 2.4-3.2 3-5.2l.5-1.8H7.5l.5 1.8c.6 2 1.6 3.8 3 5.2Z" fill={fill} />
                         <path d="M19 3a3.5 3.5 0 0 0-5 0l-7.5 7.5c-.6.6-.9 1.4-.9 2.3V14h1.2c.9 0 1.7-.3 2.3-.9L19 5a3.5 3.5 0 0 0 0-5Z" />
                         <path d="m14 8 2-2" />
                    </svg>
               );
          case "web":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="10" fill={fill} />
                         <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                         <path d="M2 12h20" />
                    </svg>
               );
          case "post":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <line x1="4" x2="4" y1="21" y2="14" />
                         <line x1="4" x2="4" y1="10" y2="3" />
                         <line x1="12" x2="12" y1="21" y2="12" />
                         <line x1="12" x2="12" y1="8" y2="3" />
                         <line x1="20" x2="20" y1="21" y2="16" />
                         <line x1="20" x2="20" y1="12" y2="3" />
                         <line x1="2" x2="6" y1="14" y2="14" />
                         <line x1="10" x2="14" y1="8" y2="8" />
                         <line x1="18" x2="22" y1="16" y2="16" />
                    </svg>
               );
          case "analytics":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M3 3v18h18" />
                         <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
               );
          case "cad":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M4 22h16" />
                         <path d="M20 22V10" />
                         <path d="M4 22V10" />
                         <path d="M12 2 2 7v3h20V7L12 2Z" fill={fill} />
                    </svg>
               );
          case "animation":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" fill={fill} />
                         <path d="M12 21v-9" />
                         <path d="m21 8-9 4-9-4" />
                    </svg>
               );
          case "code":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m18 16 4-4-4-4" />
                         <path d="m6 8-4 4 4 4" />
                         <path d="m14.5 4-5 16" />
                    </svg>
               );
          case "textile":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <polygon points="12 2 22 8.5 22 19.5 12 22 2 19.5 2 8.5" fill={fill} />
                    </svg>
               );
          case "software":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="3" fill={fill} />
                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
               );
          case "marketing":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                         <path d="M2 13h4.4a2 2 0 0 0 1.4-.6L11 9H2v4Z" fill={fill} />
                         <path d="M22 6 12 11v8l10-5V6Z" fill={fill} />
                    </svg>
               );
          case "ai":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <rect x="3" y="11" width="18" height="10" rx="2" fill={fill} />
                         <circle cx="12" cy="5" r="2" />
                         <path d="M12 7v4" />
                         <line x1="8" y1="16" x2="8" y2="16" />
                         <line x1="16" y1="16" x2="16" y2="16" />
                    </svg>
               );
          case "video":
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <rect x="2" y="4" width="20" height="16" rx="2.18" fill={fill} />
                         <line x1="7" y1="4" x2="7" y2="20" />
                         <line x1="17" y1="4" x2="17" y2="20" />
                         <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
               );
          default:
               return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="10" fill={fill} />
                    </svg>
               );
     }
}
