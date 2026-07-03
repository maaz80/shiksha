"use client";

import { lazy, Suspense, useEffect } from 'react'

// ✅ Top pe hai — lazy nahi
import Hero from '../components/CareerDetails/Hero'
import Breadcrumb from '../components/BreadCrumb'

// ✅ Below fold — lazy
const WhatSection = lazy(() => import('../components/CareerDetails/WhatSections'))
const WhatWeDo = lazy(() => import('../components/CareerDetails/WhatWeDo'))
const WhyJoinUs = lazy(() => import('../components/CareerDetails/WhyJoinUs'))
const HowToApply = lazy(() => import('../components/CareerDetails/HowToApply'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const CareerDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <main className='pt-15 md:pt-20'>
      <Breadcrumb />
      <Hero />

      <Suspense fallback={<SectionSkeleton />}>
        <WhatSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhatWeDo />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhyJoinUs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HowToApply />
      </Suspense>

      <div className='max-w-330 mx-auto space-y-10 mt-10'>
        <Suspense fallback={<SectionSkeleton />}>
          <RelatedBlogs />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>
      </div>
    </main>
  )
}

export default CareerDetails