"use client";

import { lazy, Suspense, useEffect, useState } from 'react'

// ✅ Top pe hain — lazy nahi
import BlogBigCard from '../components/Blogs/BlogBigCard'
import BlogCard from '../components/Blogs/BlogCard'
import { useBlogs } from '../context/BlogContext'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import { getHomeData } from '../utils/homeService'

// ✅ Below fold — lazy
const FeaturedBlogs = lazy(() => import('../components/Blogs/FeaturedBlogs'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const BlogCardSkeleton = () => (
     <div className="w-full max-w-96 h-118 bg-white rounded-xl border border-gray-200 shadow-sm p-3 animate-pulse">
          <div className="w-full h-52.25 bg-gray-200 rounded-lg" />
          <div className="mt-4 px-1">
               <div className="h-5 bg-gray-200 rounded mb-3 w-4/5" />
               <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
               <div className="h-4 bg-gray-200 rounded mb-2 w-11/12" />
               <div className="h-4 bg-gray-200 rounded mb-4 w-10/12" />
               <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
               <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
     </div>
)

const FeaturedBlogsFallback = () => (
     <div className="text-secondary mt-5 min-h-300" aria-hidden="true">
          <div className="h-9 w-32 bg-gray-100 rounded-md animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mt-2">
               {Array.from({ length: 9 }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
               ))}
          </div>
          <div className="min-h-10 mt-10" />
     </div>
)

const RelatedBlogsFallback = () => (
     <div className="relative min-w-90 min-h-130 max-h-152 overflow-hidden open-sans" aria-hidden="true">
          <div className="h-9 w-52 bg-gray-100 rounded-md animate-pulse mb-6 ml-6 md:ml-0" />
          <div className="overflow-hidden min-h-103">
               <div className="flex">
                    <div className="shrink-0 w-full md:w-1/2 xl:w-1/4 pl-6 lg:px-0">
                         <BlogCardSkeleton />
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

const Blogs = () => {
     const { blogs } = useBlogs();
     const { faqData } = useFaq();
     const blog = blogs?.[0];
     const [blogPageData, setBlogPageData] = useState(null);
     const [homeData, setHomeData] = useState(null);

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });

          const fetchBlogPageData = async () => {
               try {
                    const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";
                    const res = await fetch(`${API_URL}/blogpage-data`);
                    if (res.ok) {
                         const data = await res.json();
                         setBlogPageData(data);
                    }
               } catch (err) {
                    console.error("Failed to load blog page configuration:", err);
               }
          };

          const fetchHomeContent = async () => {
               try {
                    const data = await getHomeData();
                    setHomeData(data);
               } catch (err) {
                    console.error("Failed to load home data on blogs page:", err);
               }
          };

          fetchBlogPageData();
          fetchHomeContent();
     }, []);

     return (
          <main className=''>
               <Breadcrumb />
               <div className='pt-5 max-w-80 sm:max-w-190 lg:max-w-250 xl:max-w-7xl mx-1 md:mx-auto text-secondary'>
                    <h1 className="text-[24px] md:text-[48px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start mx-auto z-20 relative pb-4 md:pb-8 px-1.5 md:px-0">
                         {blogPageData?.blogstitle || "Blog"}
                    </h1>

                    {/* {isMobile ? <BlogCard blog={blog} isEager='true' /> : <BlogBigCard blog={blog} />} */}
                    <div>
                         {/* Mobile */}
                         <div className="block md:hidden px-1.5 md:px-0">
                              <BlogCard blog={blog} isEager />
                         </div>

                         {/* Desktop */}
                         <div className="hidden md:block">
                              <BlogBigCard blog={blog} />
                         </div>
                    </div>

                    <Suspense fallback={<FeaturedBlogsFallback />}>
                         <FeaturedBlogs title={blogPageData?.featuredblogstitle} />
                    </Suspense>
               </div>

               <div className='max-w-7xl mx-auto space-y-10 mt-10 ' >
                    <Suspense fallback={<RelatedBlogsFallback />}>
                         <RelatedBlogs title={homeData?.relatedblogstitle} />
                    </Suspense>

                    <Suspense fallback={<FAQFallback />}>
                         <FAQ faqData={faqData} />
                    </Suspense>
               </div>
          </main>
     )
}

export default Blogs;
