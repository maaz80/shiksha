"use client";

import { lazy, Suspense, useEffect } from 'react'
import { useParams } from 'next/navigation';
import CourseCard from '../components/CourseCard'
import { useCourses } from '../context/CourseContext';
import { useBlogs } from '../context/BlogContext';
import Template from '../assets/template.webp';
import Breadcrumb from '../components/BreadCrumb';
import useFaq from '../hooks/useFaq';
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const CourseCardSkeleton = () => (
     <div className="w-70 md:w-51 2xl:w-70 min-h-83 rounded-xl shadow-[0_0px_8px_0px] shadow-[#000000]/7 bg-white p-1.5 animate-pulse">
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
)

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

const RelatedBlogsFallback = () => (
     <div className="relative min-w-90 min-h-130 max-h-152 overflow-hidden open-sans" aria-hidden="true">
          <div className="h-9 w-52 bg-gray-100 rounded-md animate-pulse mb-6 ml-6 md:ml-0" />
          <div className="overflow-hidden min-h-103">
               <div className="flex">
                    <div className="shrink-0 w-full md:w-1/2 xl:w-1/4 pl-6 lg:px-0">
                         <div className="w-86 h-103 bg-white rounded-xl border border-gray-200 shadow-sm p-3 animate-pulse">
                              <div className="w-full h-52.25 bg-gray-200 rounded-lg" />
                              <div className="mt-4 px-1">
                                   <div className="h-5 bg-gray-200 rounded mb-2 w-4/5" />
                                   <div className="h-5 bg-gray-200 rounded mb-3 w-3/5" />
                                   <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
                                   <div className="h-10 bg-gray-200 rounded w-full" />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div className="min-h-12 mt-6" />
     </div>
)

const FAQFallback = () => (
     <div className="px-5 min-h-135 md:min-h-110 max-h-138 md:max-h-112 animate-pulse" aria-hidden="true">
          <div className="h-9 w-16 bg-gray-100 rounded-md mb-5" />
          {Array.from({ length: 5 }).map((_, index) => (
               <div key={index} className="py-5 border-t border-gray-200 first:border-t-0">
                    <div className="h-5 bg-gray-100 rounded w-4/5" />
                    {index === 1 && (
                         <div className="mt-3 space-y-2">
                              <div className="h-4 bg-gray-100 rounded w-full" />
                              <div className="h-4 bg-gray-100 rounded w-11/12" />
                              <div className="h-4 bg-gray-100 rounded w-3/4" />
                         </div>
                    )}
               </div>
          ))}
     </div>
)

const BlogDetails = ({ blog: propBlog, slug: propSlug }) => {
     const { courses, loading: coursesLoading } = useCourses()
     const { slug: routeSlug } = useParams();
     const slug = propSlug || routeSlug;
     const { loading, getBlogBySlug } = useBlogs();
     const blog = propBlog || getBlogBySlug(slug);
     const error = !loading && !blog ? "Blog not found" : null;
     const { faqData } = useFaq('blog-details');
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
     }, []);

     const optimizeImage = (url, width) => {
          // 👉 fallback to local image
          if (!url) return Template;

          // 👉 agar Cloudinary image hai tabhi transform karo
          if (url.includes("/upload/")) {
               return url.replace(
                    "/upload/",
                    `/upload/w_${width},c_fill,q_auto:eco,f_auto/`
               );
          }

          // 👉 warna direct return (local / external)
          return url;
     };
     const imageSrc = blog?.image || Template;
     return (
          <main className=''>
               <Breadcrumb />
               <div className='pt-7 max-w-90 sm:max-w-150 lg:max-w-200 xl:max-w-327.5 mx-auto text-secondary'>
                    <div className='w-full flex flex-col md:flex-row items-start justify-between'>
                         <div className='w-full md:w-[70%]'>
                              <h1 className="text-[24px] md:text-[48px] leading-8 md:leading-15 2xl:leading-15 font-bold text-start mx-auto z-20 relative pb-8">
                                   {blog ? blog.title : error || 'Loading...'}
                              </h1>

                              {blog ? (
                                   <>
                                        <div className="mb-10">
                                             <img
                                                  fetchPriority="high"
                                                  loading="eager"
                                                  decoding="async"
                                                  src={optimizeImage(imageSrc, 890)}
                                                  srcSet={
                                                       blog?.image
                                                            ? `
        ${optimizeImage(blog.image, 500)} 480w,
        ${optimizeImage(blog.image, 800)} 768w,
        ${optimizeImage(blog.image, 890)} 1200w
      `
                                                            : undefined
                                                  }
                                                  sizes="(max-width: 480px) 500px, (max-width: 768px) 800px, 890px"
                                                  alt={blog?.alt || blog?.title || "Blog Image"}
                                                  width={890}
                                                  height={486}
                                                  className="w-full h-114.5 object-cover rounded-md mx-auto"
                                             />
                                        </div>

                                        <div
                                             className="text-dark-black/75 leading-5 lg:leading-8 blog-content"
                                             dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                   </>
                              ) : (
                                   <BlogContentFallback />
                              )}
                         </div>

                         <div className='w-full md:w-[30%] min-h-180 md:min-h-185 flex items-start md:items-start justify-start flex-col gap-5 pl-2 md:pl-15 mt-10 md:mt-0'>
                              <h2 className="text-[24px] md:text-[32px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start z-20 relative text-primary">
                                   Related Course
                              </h2>
                              {coursesLoading
                                   ? Array.from({ length: 2 }).map((_, index) => (
                                        <CourseCardSkeleton key={index} />
                                   ))
                                   : courses.slice(0, 2).map((course) => (
                                        <CourseCard key={course._id} course={course} />
                                   ))}
                         </div>
                    </div>
               </div>

               <div className='max-w-330 mx-auto space-y-10 mt-10 min-h-282.5 md:min-h-250'>
                    <Suspense fallback={<RelatedBlogsFallback />}>
                         <RelatedBlogs />
                    </Suspense>

                    <Suspense fallback={<FAQFallback />}>
                         <FAQ faqData={blog?.faq && blog.faq.length > 0 ? { faq: blog.faq } : faqData} />
                    </Suspense>
               </div>
          </main>
     )
}

export default BlogDetails
