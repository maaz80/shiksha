"use client";

import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import WhatWeDo from '../components/Home/WhatWeDo'
import useFaq from '../hooks/useFaq'
import { getHomeData } from '../utils/homeService'

//  Lazy load all components
const OurPrograms = lazy(() => import('../components/Home/OurPrograms'))
const HowItWorks = lazy(() => import('../components/Home/HowItWorks'))
const Companies = lazy(() => import('../components/Home/Companies'))
const Community = lazy(() => import('../components/Home/Community'))
const StatsBanner = lazy(() => import('../components/Home/StatsBanner'))
const Testimonials = lazy(() => import('../components/Home/Testimonials'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

//  Reusable skeleton fallback
const SectionSkeleton = () => (
     <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const Home = () => {
     const { faqData } = useFaq();
     const [homeData, setHomeData] = useState(null);
     const [loadingHome, setLoadingHome] = useState(true);
     const [homeError, setHomeError] = useState(null);

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })

          const fetchHomeContent = async () => {
               try {
                    setLoadingHome(true);
                    const data = await getHomeData();
                    setHomeData(data);
                    setHomeError(null);
               } catch (err) {
                    console.error("Failed to load home page content:", err);
                    setHomeError(err.message || "Failed to load home page content.");
               } finally {
                    setLoadingHome(false);
               }
          };

          fetchHomeContent();
     }, [])

     return (
          <main className='open-sans'>
               <Hero data={homeData?.hero} />

               <WhatWeDo data={homeData?.whatwedo} />

               <Suspense fallback={<SectionSkeleton />}>
                    <OurPrograms data={homeData?.ourprograms} />
               </Suspense>

               <Suspense fallback={<SectionSkeleton />}>
                    <HowItWorks data={homeData?.howitworks} />
               </Suspense>

               <Suspense fallback={<SectionSkeleton />}>
                    <Companies />
               </Suspense>

               <Suspense fallback={<SectionSkeleton />}>
                    <Community data={homeData?.community} />
               </Suspense>

               <Suspense fallback={<SectionSkeleton />}>
                    <StatsBanner data={homeData?.communityBar} />
               </Suspense>

               <div className="relative">
                    <Suspense fallback={<SectionSkeleton />}>
                         <Testimonials data={homeData?.testimonialstitle} />
                    </Suspense>
               </div>

               <div className='max-w-330 mx-auto space-y-10'>
                    <Suspense fallback={<SectionSkeleton />}>
                         <RelatedBlogs title={homeData?.relatedblogstitle} />
                    </Suspense>

                    <Suspense fallback={<SectionSkeleton />}>
                         <FAQ faqData={faqData} />
                    </Suspense>
               </div>
          </main>
     )
}

export default Home