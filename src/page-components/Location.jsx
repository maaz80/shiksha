"use client";

import React, { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/Location/Hero'
import { getLocations } from '../utils/locations'
import { useParams } from 'next/navigation';

//  Lazy sections
const HelpSection = lazy(() => import('../components/Location/HelpSection'))
const Services = lazy(() => import('../components/Location/Services'))
const WhyKreeya = lazy(() => import('../components/Location/WhyKreeya'))
const Testimonial = lazy(() => import('../components/Location/Testimonial'))
const YouMayLike = lazy(() => import('../components/RelatedBlogs'))
const FaqSection = lazy(() => import('../components/Location/LocationFaq'))

const Location = ({ location: propLocation }) => {
  const { itemSlug } = useParams();
  const [location, setLocation] = useState(propLocation || null)
  useEffect(() => {
    if (propLocation) {
      setLocation(propLocation);
      return;
    }

    const fetchSingleService = async () => {
      const allLocations = await getLocations();

      let selectedItem = null;

      for (const location of allLocations) {
        const found = location.items?.find(
          (i) => i.slug === itemSlug || i._id === itemSlug
        );

        if (found) {
          selectedItem = found;
          break;
        }
      }

      setLocation(selectedItem);
    };

    if (itemSlug) fetchSingleService();

  }, [itemSlug, propLocation]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemSlug])

  return (
    <div>
      {/* HERO (no lazy) */}
      <div id='location-form'>
        <Hero location={location} />
      </div>

      {/* Lazy sections */}

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <HelpSection location={location} />
      </Suspense>


      <Suspense fallback={null}>
        <Services location={location} />
      </Suspense>


      <Suspense fallback={null}>
        <WhyKreeya location={location} />
      </Suspense>

      <Suspense fallback={null}>
        <div className="relative">

          <Testimonial />
        </div>
      </Suspense>

      <div className='relative max-w-330 mx-auto plus-jakarta-sans flex flex-col justify-center items-center px-4'>
        <Suspense fallback={null}>
          <YouMayLike />
        </Suspense>

        <div className="py-24">
          <Suspense fallback={<div className="min-h-75" />}>
            <FaqSection location={location} />
          </Suspense>
        </div>
      </div>

    </div>
  )
}

export default Location
