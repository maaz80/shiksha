"use client";

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../context/CourseContext';
import { useBlogs } from '../context/BlogContext';
import Template from '../assets/template.webp';
import Breadcrumb from '../components/BreadCrumb';
import useFaq from '../hooks/useFaq';
import RelatedBlogs from '../components/RelatedBlogs';
import Testimonials from '../components/Home/Testimonials';
import AuthorWrittenBy from '../components/AuthorWrittenBy';
import AuthorAbout from '../components/AuthorAbout';
import FAQ from '../components/FAQ';

const CourseCardSkeleton = () => (
     <div className="w-full min-h-83 rounded-xl shadow-[0_0px_8px_0px] shadow-[#000000]/7 bg-white p-1.5 animate-pulse">
          <div className="h-27 w-full bg-gray-200 rounded-lg" />
          <div className="pt-3 px-1">
               <div className="h-5 bg-gray-200 rounded w-5/6 mb-2" />
               <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
               <div className="h-11.5 w-31 bg-gray-200 rounded mt-3 mb-4" />
               <div className="space-y-2 mb-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
               </div>
               <div className="h-12 bg-gray-200 rounded-lg w-full" />
          </div>
     </div>
);




const BlogContentFallback = () => (
     <>
          <div className="mb-10 animate-pulse">
               <div className="w-full h-114.5 bg-gray-100 rounded-md mx-auto" />
          </div>
          <div className="space-y-4 animate-pulse">
               {Array.from({ length: 10 }).map((_, index) => (
                    <div
                         key={index}
                         className={`h-4 bg-gray-100 rounded ${index % 3 === 0 ? 'w-11/12' : index % 3 === 1 ? 'w-full' : 'w-4/5'}`}
                    />
               ))}
          </div>
     </>
)

const BlogDetails = ({ blog: propBlog, slug: propSlug, initialTestimonials = [] }) => {
     const { courses, loading: coursesLoading } = useCourses();
     const { slug: routeSlug } = useParams();
     const slug = propSlug || routeSlug;
     const { loading: blogsLoading, getBlogBySlug } = useBlogs();
     const blog = propBlog || getBlogBySlug(slug);
     const error = !blogsLoading && !blog ? "Blog not found" : null;
     const { faqData } = useFaq('blog-details');



     const [activeId, setActiveId] = useState("");

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
     }, []);

     const htmlContent = blog?.content || "";

     // Pre-parse headings and inject IDs/styles to support Table of Contents
     const { processedHtmlContent, headingsList } = useMemo(() => {
          const headings = [];
          if (!htmlContent) return { processedHtmlContent: "", headingsList: [] };

          let headingIndex = 0;
          const processed = htmlContent.replace(/<h[23]\b([^>]*)>(.*?)<\/h[23]>/gi, (match, attrs, content) => {
               const id = `blog-heading-${headingIndex}`;
               headingIndex++;
               
               const text = content.replace(/<[^>]*>/g, "").trim();
               if (text) {
                    headings.push({
                         id,
                         text,
                    });
               }

               let newAttrs = attrs;
               if (/style="/i.test(attrs)) {
                    newAttrs = attrs.replace(/style="/i, 'style="scroll-margin-top: 130px; ');
               } else {
                    newAttrs = `${attrs} style="scroll-margin-top: 130px;"`;
               }

               if (/id="/i.test(attrs)) {
                    newAttrs = newAttrs.replace(/id="[^"]*"/i, `id="${id}"`);
               } else {
                    newAttrs = `${newAttrs} id="${id}"`;
               }

               const tagMatch = match.match(/^<(h[23])/i);
               const tagName = tagMatch ? tagMatch[1] : 'h2';

               return `<${tagName}${newAttrs}>${content}</${tagName}>`;
          });

          return { processedHtmlContent: processed, headingsList: headings };
     }, [htmlContent]);

     useEffect(() => {
          if (headingsList.length > 0 && !activeId) {
               setActiveId(headingsList[0].id);
          }
     }, [headingsList, activeId]);

     useEffect(() => {
          if (!headingsList.length) return;

          const handleScrollSpy = () => {
               const headerOffset = 160;
               let currentActiveId = headingsList[0]?.id || "";

               for (let i = 0; i < headingsList.length; i++) {
                    const el = document.getElementById(headingsList[i].id);
                    if (el) {
                         const rect = el.getBoundingClientRect();
                         if (rect.top <= headerOffset) {
                              currentActiveId = headingsList[i].id;
                         } else {
                              break;
                         }
                    }
               }

               setActiveId(currentActiveId);
          };

          handleScrollSpy();
          window.addEventListener("scroll", handleScrollSpy, { passive: true });
          return () => window.removeEventListener("scroll", handleScrollSpy);
     }, [headingsList]);

     const handleScrollToHeading = (id) => {
          setActiveId(id);
          const element = document.getElementById(id);
          if (element) {
               const yOffset = -130;
               const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
               window.scrollTo({ top: y, behavior: 'smooth' });
          }
     };

     const imageSrc = blog?.image || Template;

     const cloudinaryLoader = ({ src, width }) => {
          if (typeof src === 'string' && src.includes("/upload/")) {
               return src.replace(
                    "/upload/",
                    `/upload/w_${width},c_fill,q_auto:eco,f_auto/`
               );
          }
          return src;
     };

     return (
          <main className=''>
               {Array.isArray(blog?.schemas) && blog.schemas.length > 0 ? (
                    blog.schemas.map((schemaStr, idx) => {
                         if (!schemaStr || typeof schemaStr !== 'string' || !schemaStr.trim()) return null;
                         return (
                              <script
                                   key={idx}
                                   type="application/ld+json"
                                   dangerouslySetInnerHTML={{ __html: schemaStr }}
                              />
                         );
                    })
               ) : blog ? (
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                   "@context": "https://schema.org",
                                   "@type": "BlogPosting",
                                   "headline": blog.seoTitle || blog.title || "Blog Article",
                                   "description": blog.seoDescription || (blog.content ? blog.content.replace(/<[^>]+>/g, '').slice(0, 160) : "Article on Shiksha Design"),
                                   "image": blog.image ? [blog.image] : [],
                                   "datePublished": blog.createdAt || blog.date || new Date().toISOString(),
                                   "author": {
                                        "@type": "Person",
                                        "name": blog.author?.name || blog.author || "Shiksha Team"
                                   },
                                   "publisher": {
                                        "@type": "EducationalOrganization",
                                        "name": "Shiksha",
                                        "logo": {
                                             "@type": "ImageObject",
                                             "url": `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '')}/images/shiksha-logo.webp`
                                        }
                                   }
                              })
                         }}
                    />
               ) : null}
               <Breadcrumb />
               <div className='pt-7 max-w-90 sm:max-w-150 lg:max-w-200 xl:max-w-327.5 mx-auto text-secondary'>
                    <div className='w-full flex flex-col md:flex-row justify-between gap-8 md:gap-12'>

                         {/* ================= LEFT SIDEBAR ================= */}
                         <aside className='w-full md:w-[32%] lg:w-[28%] order-2 md:order-1 flex flex-col gap-6 self-stretch px-2 md:px-0'>
                              
                              {/* Related Course */}
                              <div className='w-full flex flex-col gap-4'>
                                   <h2 className="text-[22px] md:text-[28px] leading-8 font-bold text-start z-20 relative text-primary">
                                        Related Course
                                   </h2>
                                   {coursesLoading ? (
                                        <CourseCardSkeleton />
                                   ) : courses && courses.length > 0 ? (
                                        <CourseCard course={courses[0]} className="w-full" />
                                   ) : null}
                              </div>

                               {/* Table of Contents - Desktop View */}
                               {headingsList.length > 0 && (
                                    <div className="hidden md:block w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm md:sticky md:top-31 z-10">
                                         <h3 className="font-bold text-[18px] text-primary uppercase tracking-wide border-b border-gray-100 pb-3 mb-3">
                                              Table Of Contents
                                         </h3>
                                         <div className="space-y-1.5 max-h-96 overflow-y-auto hide-scrollbar">
                                              {headingsList.map((item) => {
                                                   const isActive = item.id === activeId;
                                                   return (
                                                        <button
                                                             key={item.id}
                                                             onClick={() => handleScrollToHeading(item.id)}
                                                             className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer leading-normal line-clamp-2 ${isActive
                                                                  ? "bg-primary text-white font-semibold shadow-sm"
                                                                  : "text-secondary hover:bg-gray-100 hover:text-primary font-medium"
                                                             }`}
                                                        >
                                                             {item.text}
                                                        </button>
                                                   );
                                              })}
                                         </div>
                                    </div>
                               )}
                         </aside>

                         {/* ================= RIGHT MAIN CONTENT ================= */}
                         <article className='w-full md:w-[65%] lg:w-[68%] order-1 md:order-2 px-2.5 md:px-0 h-entry hentry'>
                              <h1 className="text-[24px] md:text-[44px] leading-8 md:leading-[1.2] font-bold text-start z-20 relative pb-6 text-secondary p-name entry-title">
                                   {blog ? blog.title : error || 'Loading...'}
                              </h1>

                              {blog ? (
                                   <>
                                        {/* Author Written By Card at Start */}
                                        <AuthorWrittenBy author={blog?.authorRef || blog?.author} blog={blog} />

                                         {/* Table of Contents - Mobile View (Above image & content) */}
                                         {headingsList.length > 0 && (
                                              <div className="block md:hidden w-full bg-white border border-gray-200 rounded-xl p-4 shadow-xs mb-6">
                                                   <h3 className="font-bold text-sm text-primary uppercase tracking-wide border-b border-gray-100 pb-2 mb-2">
                                                        Table Of Contents
                                                   </h3>
                                                   <div className="space-y-1 max-h-56 overflow-y-auto hide-scrollbar">
                                                        {headingsList.map((item) => {
                                                             const isActive = item.id === activeId;
                                                             return (
                                                                  <button
                                                                       key={item.id}
                                                                       onClick={() => handleScrollToHeading(item.id)}
                                                                       className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer leading-normal line-clamp-2 ${isActive
                                                                            ? "bg-primary text-white font-semibold shadow-xs"
                                                                            : "text-secondary hover:bg-gray-100 hover:text-primary font-medium"
                                                                       }`}
                                                                  >
                                                                       {item.text}
                                                                  </button>
                                                             );
                                                        })}
                                                   </div>
                                              </div>
                                         )}

                                        <div className="mb-8 relative w-full h-72 md:h-114.5">
                                             <Image
                                                  loader={cloudinaryLoader}
                                                  priority
                                                  src={imageSrc}
                                                  sizes="(max-width: 480px) 500px, (max-width: 768px) 800px, 890px"
                                                  alt={blog?.alt || blog?.title || "Blog Image"}
                                                  fill
                                                  className="object-cover rounded-md mx-auto"
                                             />
                                        </div>

                                        <div
                                             className="text-dark-black/75 leading-6 lg:leading-8 blog-content"
                                             dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                                        />

                                        {/* Author About Card at End */}
                                        <AuthorAbout author={blog?.authorRef || blog?.author} blog={blog} />
                                   </>
                              ) : (
                                   <BlogContentFallback />
                              )}
                         </article>

                    </div>
               </div>

               <div className="relative">
                    <Testimonials initialTestimonials={initialTestimonials} />
               </div>

               <div className='max-w-330 mx-auto space-y-10 my-10 px-3 sm:px-0'>
                    <RelatedBlogs />


                    <FAQ faqData={blog?.faq && blog.faq.length > 0 ? { faq: blog.faq } : faqData} />
               </div>
          </main>
     )
}

export default BlogDetails;
