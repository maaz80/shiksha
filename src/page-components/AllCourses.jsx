"use client";

import { lazy, Suspense, useEffect, useState } from "react"
import Courses from '../components/AllCourses/AllCourses';
import Breadcrumb from "../components/BreadCrumb";
import useFaq from "../hooks/useFaq";
import { getHomeData } from "../utils/homeService";
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const RelatedBlogsSkeleton = () => (
     <div className="min-h-130 px-6 md:px-0">
          <div className="h-9 w-52 animate-pulse rounded-md bg-gray-100 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
               {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-103 animate-pulse rounded-xl bg-gray-100" />
               ))}
          </div>
          <div className="h-12 mt-6" />
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
                    const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";
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
