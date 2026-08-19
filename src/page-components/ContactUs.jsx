"use client";

import { useEffect, useState } from 'react'
import Hero from '../components/ContactUs/Hero'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import { getContactData } from '../utils/contactService'
import FAQ from '../components/FAQ'
import ContactForm from '../components/ContactUs/ContactForm'
import CompanyCard from '../components/ContactUs/ComanyCard'
import Enquiries from '../components/ContactUs/Enquiries'

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

      <div className="flex flex-col lg:flex-row items-center justify-between max-w-337 mx-auto py-20 gap-10">
        <div className='w-full lg:w-[70%]'>
          <ContactForm />
        </div>
        <div className='w-full lg:w-[30%]'>
          <CompanyCard data={contactData?.card} />
        </div>
      </div>

      <Enquiries data={contactData?.enquiry} />

      <div className='max-w-330 mx-auto py-20'>
        <FAQ faqData={faqData} />
      </div>
    </main>
  )
}

export default ContactUs;