"use client";

import { useEffect, useState } from 'react'
import Hero from '../components/About/Hero'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import { getAboutData } from '../utils/aboutService'
import { getHomeData } from '../utils/homeService'
import Details from '../components/About/Details'
import OurValues from '../components/About/OurValues'
import TeamCarousel from '../components/About/TeamCarousel'
import Testimonials from '../components/Home/Testimonials'
import RelatedBlogs from '../components/RelatedBlogs'
import FAQ from '../components/FAQ'

const AboutUs = ({ initialTestimonials = [] }) => {
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

      <OurValues data={aboutData?.ourvalues} />

      <TeamCarousel data={aboutData?.team} />

      <div className="relative">
        <Testimonials data={homeData?.testimonialstitle} initialTestimonials={initialTestimonials} />
      </div>

      <div className='max-w-330 mx-auto space-y-10'>
        <RelatedBlogs title={homeData?.relatedblogstitle} />

        <FAQ faqData={faqData} />
      </div>
    </main>
  )
}

export default AboutUs;