"use client";

import { lazy, Suspense, useEffect } from 'react'

// ✅ Top pe hai — lazy nahi
import JoinUs from '../components/Careers/JoinUs'
import Breadcrumb from '../components/BreadCrumb'

// ✅ Below fold — lazy
const WhatsInIt = lazy(() => import('../components/Careers/WhatsInIt'))
const PositionsSection = lazy(() => import('../components/Careers/PositionsSection'))
const ImageCollage = lazy(() => import('../components/Careers/ImageCollage'))
const Disclaimer = lazy(() => import('../components/Careers/Disclaimer'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))
const FAQ = lazy(() => import('../components/FAQ'))

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const Career = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <main className='pt-15 lg:pt-20'>
      <Breadcrumb />
      <JoinUs />

      <Suspense fallback={<SectionSkeleton />}>
        <WhatsInIt />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PositionsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ImageCollage />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Disclaimer />
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

export default Career