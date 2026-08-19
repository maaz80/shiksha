"use client";

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Hero from '../components/CourseDetails/Hero'
import Details from '../components/CourseDetails/Details'
import { getCourseBySlug } from '../utils/courseService'
import Breadcrumb from '../components/BreadCrumb'
import useFaq from '../hooks/useFaq'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Home/Testimonials'
import RelatedBlogs from '../components/RelatedBlogs'

const CourseDetails = ({ isLogin, setIsLogin, course: propCourse, slug: propSlug, initialTestimonials = [] }) => {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug;
  const [course, setCourse] = useState(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);
  const [error, setError] = useState(null);
  const { faqData } = useFaq('course-details');

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

  const courseFaqs = course?.faq && course.faq.length > 0 ? course.faq : faqData;

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
          {Array.isArray(course?.schemas) && course.schemas.length > 0 ? (
            course.schemas.map((schemaStr, idx) => {
              if (!schemaStr || typeof schemaStr !== 'string' || !schemaStr.trim()) return null;
              return (
                <script
                  key={idx}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: schemaStr }}
                />
              );
            })
          ) : (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Course",
                  "name": course.seoTitle || course.title || course.name || "Skill Certification Course",
                  "description": course.seoDescription || course.overview || course.description || "Industry leading certification course at Shiksha.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Shiksha",
                    "sameAs": (process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '')
                  },
                  "hasCourseInstance": {
                    "@type": "CourseInstance",
                    "courseMode": "Online / Classroom",
                    "duration": course.courseLength || "Flexible"
                  },
                  ...(course.fees ? {
                    "offers": {
                      "@type": "Offer",
                      "category": course.category || "Skill Development",
                      "price": String(course.fees).replace(/[^0-9.]/g, '') || "0",
                      "priceCurrency": "INR"
                    }
                  } : {})
                })
              }}
            />
          )}
          <Hero course={course} courseId={course._id} setIsLogin={setIsLogin} />
          <Breadcrumb />
          <Details data={course} />

          <div className="relative">
            <Testimonials initialTestimonials={initialTestimonials} />
          </div>

          <div id='blogs' className='max-w-330 mx-auto space-y-10 my-10 px-4 sm:px-6'>
            <RelatedBlogs />

            <FAQ faqData={courseFaqs} />
          </div>

        </>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg text-secondary px-4 text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl mb-3 font-semibold">Course Not Found</p>
          <p className="text-gray-600 mb-6 max-w-md">The course you are looking for does not exist or its URL has been updated.</p>
          <a href="/courses" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium">
            Browse All Courses
          </a>
        </div>
      )}
    </main>
  )
}

export default CourseDetails;
