"use client";

import React, { useEffect, useState } from 'react'
import Hero from '../components/Location/Hero'
import { getLocations } from '../utils/locations'
import { useParams } from 'next/navigation';
import HelpSection from '../components/Location/HelpSection'
import Services from '../components/Location/Services'
import WhyKreeya from '../components/Location/WhyKreeya'
import Testimonial from '../components/Location/Testimonial'
import YouMayLike from '../components/RelatedBlogs'
import FaqSection from '../components/Location/LocationFaq'

const Location = ({ location: propLocation, slug: propSlug, initialTestimonials = [] }) => {
  const params = useParams();
  const locationSlug = propSlug || params?.slug || params?.itemSlug;
  const [location, setLocation] = useState(propLocation || null)

  useEffect(() => {
    if (propLocation) {
      setLocation(propLocation);
      return;
    }

    const fetchSingleService = async () => {
      const allLocations = await getLocations();

      let selectedItem = null;

      for (const loc of allLocations) {
        const found = loc.items?.find(
          (i) => i.slug === locationSlug || i._id === locationSlug
        );

        if (found) {
          selectedItem = found;
          break;
        }
      }

      setLocation(selectedItem);
    };

    if (locationSlug) fetchSingleService();

  }, [locationSlug, propLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationSlug])

  return (
    <div>
      <div id='location-form'>
        <Hero location={location} />
      </div>

      <HelpSection location={location} />

      <Services location={location} />

      <WhyKreeya location={location} />

      <div className="relative">
        <Testimonial initialTestimonials={initialTestimonials} />
      </div>

      <div className='relative max-w-330 mx-auto plus-jakarta-sans flex flex-col justify-center items-center px-4'>
        <YouMayLike />

        <div className="py-24">
          <FaqSection location={location} />
        </div>
      </div>

    </div>
  )
}

export default Location;
