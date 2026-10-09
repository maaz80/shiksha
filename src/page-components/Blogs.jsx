"use client";

import { useEffect, useState } from 'react';
import BlogBigCard from '../components/Blogs/BlogBigCard';
import BlogCard from '../components/Blogs/BlogCard';
import { useBlogs } from '../context/BlogContext';
import Breadcrumb from '../components/BreadCrumb';
import useFaq from '../hooks/useFaq';
import { getHomeData } from '../utils/homeService';
import { fetchWithFallback } from '../utils/api';
import FeaturedBlogs from '../components/Blogs/FeaturedBlogs';
import Testimonials from '../components/Home/Testimonials';
import RelatedBlogs from '../components/RelatedBlogs';
import FAQ from '../components/FAQ';
import SectionHeading from '../components/SectionHeading';

const Blogs = ({ initialBlogs = [], initialTestimonials = [] }) => {
     const { blogs } = useBlogs();
     const { faqData } = useFaq();
     const blogList = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogs;
     const blog = blogList?.[0];
     const [blogPageData, setBlogPageData] = useState(null);
     const [homeData, setHomeData] = useState(null);

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });

          const fetchBlogPageData = async () => {
               try {
                    const res = await fetchWithFallback("/blogpage-data");
                    if (res && res.ok) {
                         const data = await res.json();
                         setBlogPageData(data);
                    }
               } catch (err) {
                    console.error("Failed to load blog page configuration:", err);
               }
          };

          const fetchHomeContent = async () => {
               try {
                    const data = await getHomeData();
                    setHomeData(data);
               } catch (err) {
                    console.error("Failed to load home data on blogs page:", err);
               }
          };

          fetchBlogPageData();
          fetchHomeContent();
     }, []);

     return (
          <main className=''>
               <Breadcrumb />
               <div className='pt-5 w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-10 text-secondary'>
                    <SectionHeading
                         as="h1"
                         variant="testimonial"
                         title={blogPageData?.blogstitle || "Blog"}
                         align="left"
                         className="mb-4 md:mb-6"
                         headingClassName="text-[31px] md:text-[48px] leading-8 md:leading-15 2xl:leading-20 font-bold"
                    />

                    <div>
                         {/* Mobile */}
                         <div className="block md:hidden">
                              <BlogCard blog={blog} isEager className="w-full" />
                         </div>

                         {/* Desktop */}
                         <div className="hidden md:block">
                              <BlogBigCard blog={blog} />
                         </div>
                    </div>

                    <FeaturedBlogs title={blogPageData?.featuredblogstitle} />
               </div>

               <div className="relative">
                    <Testimonials data={homeData?.testimonialstitle} initialTestimonials={initialTestimonials} />
               </div>

               <div className='max-w-7xl mx-auto space-y-10 mt-10 px-2 sm:px-6 lg:px-10'>
                    <RelatedBlogs title={homeData?.relatedblogstitle} />

                    <FAQ faqData={faqData} />
               </div>
          </main>
     )
}

export default Blogs;
