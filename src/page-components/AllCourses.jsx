"use client";

import { lazy, Suspense, useEffect, useState } from "react"
import Courses from '../components/AllCourses/AllCourses';
import Breadcrumb from "../components/BreadCrumb";
import { API_URL } from "../utils/api";
import useFaq from "../hooks/useFaq";
import { getHomeData } from "../utils/homeService";
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const RelatedBlogsSkeleton = () => (
     <div className="px-6 md:px-0">
          <div className="h-9 w-52 animate-pulse rounded-md bg-gray-100 mb-6" />
          <div className="flex gap-5 overflow-hidden">
               <div className="w-full md:w-1/2 xl:w-1/3 shrink-0 h-103 animate-pulse rounded-xl bg-gray-100" />
               <div className="hidden md:block w-1/2 xl:w-1/3 shrink-0 h-103 animate-pulse rounded-xl bg-gray-100" />
               <div className="hidden xl:block w-1/3 shrink-0 h-103 animate-pulse rounded-xl bg-gray-100" />
          </div>
          {/* Carousel dots placeholder to match height of loaded component dots */}
          <div className="flex justify-center mt-6 gap-2 py-2">
               <div className="w-6 h-2 rounded-full bg-gray-200 animate-pulse" />
               <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
               <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
          </div>
     </div>
)

const FAQSkeleton = () => (
     <div className="min-h-105 px-5">
          <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100 mb-5" />
          {Array.from({ length: 5 }).map((_, index) => (
               <div key={index} className="border-b border-gray-200 py-5">
                    <div className="h-6 w-full animate-pulse rounded-md bg-gray-100" />
                    {index === 1 && <div className="h-16 w-4/5 animate-pulse rounded-md bg-gray-100 mt-3" />}
               </div>
          ))}
     </div>
)

const AllCourses = () => {
     const { faqData } = useFaq();
     const [coursePageData, setCoursePageData] = useState(null);
     const [homeData, setHomeData] = useState(null);

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          const fetchCoursePageData = async () => {
               try {
                    const res = await fetch(`${API_URL}/coursepage-data`);
                    if (res.ok) {
                         const data = await res.json();
                         setCoursePageData(data);
                    }
               } catch (err) {
                    console.error("Failed to fetch course page data:", err);
               }
          };

          const fetchHomeContent = async () => {
               try {
                    const data = await getHomeData();
                    setHomeData(data);
               } catch (err) {
                    console.error("Failed to load home data on courses page:", err);
               }
          };

          fetchCoursePageData();
          fetchHomeContent();
     }, []);

     return (
          <main className="">
               <Breadcrumb />
               <div className='pt-5 max-w-80 sm:max-w-150 lg:max-w-200 xl:max-w-7xl mx-auto'>
                    <Courses title={coursePageData?.coursestitle} />
               </div>

               <div className='max-w-330 mx-auto space-y-10 min-h-245'>
                    <Suspense fallback={<RelatedBlogsSkeleton />}>
                         <RelatedBlogs title={homeData?.relatedblogstitle} />
                    </Suspense>

                    <Suspense fallback={<FAQSkeleton />}>
                         <FAQ faqData={faqData} />
                    </Suspense>
               </div>
          </main>
     )
}

export default AllCourses
