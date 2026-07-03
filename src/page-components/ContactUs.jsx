"use client";

import { lazy, Suspense, useEffect, useState } from 'react'

// ✅ Top pe hai — lazy nahi
import Hero from '../components/ContactUs/Hero'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import { getContactData } from '../utils/contactService'

// ✅ Below fold — lazy
const FAQ = lazy(() => import('../components/FAQ'))
const ContactForm = lazy(() => import('../components/ContactUs/ContactForm'))
const CompanyCard = lazy(() => import('../components/ContactUs/ComanyCard'))
const Enquiries = lazy(() => import('../components/ContactUs/Enquiries'))

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const ContactUs = () => {
  const { faqData } = useFaq();
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const fetchContactContent = async () => {
      try {
        const data = await getContactData();
        setContactData(data);
      } catch (err) {
        console.error("Failed to load contact page content:", err);
      }
    };

    fetchContactContent();
  }, [])

  return (
    <main className=''>
      <Breadcrumb />
      <Hero data={contactData?.hero} />

      <div className="flex flex-col lg:flex-row items-center justify-between max-w-350 mx-auto py-20 gap-10">
        <div className='w-full lg:w-[70%]'>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className='w-full lg:w-[30%]'>
          <Suspense fallback={<SectionSkeleton />}>
            <CompanyCard data={contactData?.card} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <Enquiries data={contactData?.enquiry} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
      <div className='max-w-330 mx-auto py-20'>
        <FAQ faqData={faqData} />
      </div>
      </Suspense>
    </main>
  )
}

export default ContactUs