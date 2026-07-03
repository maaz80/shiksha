"use client";

import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/About/Hero'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import { getAboutData } from '../utils/aboutService'
import { getHomeData } from '../utils/homeService'
import Details from '../components/About/Details'

const OurValues = lazy(() => import('../components/About/OurValues'))
const TeamCarousel = lazy(() => import('../components/About/TeamCarousel'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const AboutUs = () => {
  const { faqData } = useFaq();
  const [aboutData, setAboutData] = useState(null);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const fetchAboutContent = async () => {
      try {
        setLoadingAbout(true);
        const data = await getAboutData();
        setAboutData(data);
      } catch (err) {
        console.error("Failed to load about page content:", err);
      } finally {
        setLoadingAbout(false);
      }
    };

    const fetchHomeContent = async () => {
      try {
        const data = await getHomeData();
        setHomeData(data);
      } catch (err) {
        console.error("Failed to load home data on about page:", err);
      }
    };

    fetchAboutContent();
    fetchHomeContent();
  }, [])

  return (
    <main className=''>
      <Breadcrumb/>
      <Hero data={aboutData?.hero} />

      <Details data={aboutData?.shikshadetails} />

      <Suspense fallback={<SectionSkeleton />}>
        <OurValues data={aboutData?.ourvalues} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TeamCarousel data={aboutData?.team} />
      </Suspense>

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

export default AboutUs