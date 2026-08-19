"use client";

import { useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import WhatWeDo from '../components/Home/WhatWeDo'
import OurPrograms from '../components/Home/OurPrograms'
import HowItWorks from '../components/Home/HowItWorks'
import Companies from '../components/Home/Companies'
import Community from '../components/Home/Community'
import StatsBanner from '../components/Home/StatsBanner'
import Testimonials from '../components/Home/Testimonials'
import RelatedBlogs from '../components/RelatedBlogs'
import FAQ from '../components/FAQ'
import useFaq from '../hooks/useFaq'
import { getHomeData } from '../utils/homeService'

const Home = ({ initialBlogs = [], initialTestimonials = [], initialCompanies = null }) => {
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
     }, []);

     return (
          <main className='open-sans'>
               <Hero data={homeData?.hero} />

               <WhatWeDo data={homeData?.whatwedo} />

               <OurPrograms data={homeData?.ourprograms} />

               <HowItWorks data={homeData?.howitworks} />

               <Companies initialCompanies={initialCompanies} />

               <Community data={homeData?.community} />

               <StatsBanner data={homeData?.communityBar} />

               <div className="relative">
                    <Testimonials data={homeData?.testimonialstitle} initialTestimonials={initialTestimonials} />
               </div>

               <div className='max-w-330 mx-auto space-y-10'>
                    <RelatedBlogs title={homeData?.relatedblogstitle} initialBlogs={initialBlogs} />

                    <FAQ faqData={faqData} />
               </div>
          </main>
     )
}

export default Home;