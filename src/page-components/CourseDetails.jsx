"use client";

import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Career from '../assets/shiksha-template-image.webp'

// ✅ Top pe hain — lazy nahi
import Hero from '../components/CourseDetails/Hero'
import Navigator from '../components/CourseDetails/Navigator'
import { getCourseBySlug } from '../utils/courseService'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'

// ✅ Below fold — lazy
const Overview = lazy(() => import('../components/CourseDetails/Overview'))
const Accordion = lazy(() => import('../components/CourseDetails/Accordion'))
const Form = lazy(() => import('../components/CourseDetails/Form'))
const Review = lazy(() => import('../components/CourseDetails/Review'))
const FAQ = lazy(() => import('../components/FAQ'))
const RelatedBlogs = lazy(() => import('../components/RelatedBlogs'))

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-gray-100 rounded-md h-48 my-4" />
)

const OverviewSkeleton = () => (
  <section id="overview" className="min-h-48 scroll-mt-24 animate-pulse" aria-hidden="true">
    <div className="h-9 w-36 bg-gray-100 rounded-md mb-5" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-11/12" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-4/5" />
    </div>
  </section>
)

const CourseDetails = ({ isLogin, setIsLogin, course: propCourse, slug: propSlug }) => {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug;
  const [course, setCourse] = useState(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);
  const [error, setError] = useState(null);
  const { faqData } = useFaq('course-details');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (propCourse) {
      setCourse(propCourse);
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      const data = await getCourseBySlug(slug);
      if (!data) {
        setError('Course not found');
      } else {
        setCourse(data);
      }
      setLoading(false);
    };

    if (slug) fetchCourse();
  }, [slug, propCourse]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <main>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary text-lg font-semibold">Loading course...</div>
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-lg font-semibold">{error}</div>
        </div>
      ) : course ? (
        <>
          <Hero course={course} courseId={course._id} setIsLogin={setIsLogin} />
          <Breadcrumb />
          <div className='px-3 sm:px-15 xl:px-30 py-6 flex items-start justify-center w-full gap-34'>
            <div className='w-full xl:w-[70%] space-y-10'>
              <Navigator />

              <Suspense fallback={<OverviewSkeleton />}>
                <Overview overview={course.overview} />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Accordion sections={course.sections} courseId={course._id} />
              </Suspense>

              <div className='xl:hidden'>
                <Suspense fallback={<SectionSkeleton />}>
                  <Form />
                </Suspense>
              </div>

              <Suspense fallback={<SectionSkeleton />}>
                <FAQ faqData={course?.faq && course.faq.length > 0 ? { faq: course.faq } : faqData} />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Review reviews={course.reviews} />
              </Suspense>
            </div>

            <div className='hidden xl:block w-[30%] pt-15'>
              <img
                src={course.image || Career}
                alt={course.alt || course.title}
                loading="lazy"
                decoding="async"
                width="420"
                height="532"
                className='w-full h-133 rounded-xl object-cover'
              />
              <Suspense fallback={<SectionSkeleton />}>
                <Form />
              </Suspense>
            </div>
          </div>

          <div id='blogs' className='max-w-94 md:max-w-220 xl:max-w-330 mx-auto'>
            <Suspense fallback={<SectionSkeleton />}>
              <RelatedBlogs />
            </Suspense>
          </div>
        </>
      ) : null}
    </main>
  )
}

export default CourseDetails
