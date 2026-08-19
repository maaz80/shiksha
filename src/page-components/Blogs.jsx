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

const Blogs = ({ initialBlogs = [], initialTestimonials = [] }) => {
     const { blogs } = useBlogs();
     const { faqData } = useFaq();
     const blog = (blogs && blogs.length > 0 ? blogs : initialBlogs)?.[0];
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
               <div className='pt-5 max-w-80 sm:max-w-190 lg:max-w-250 xl:max-w-7xl mx-1 md:mx-auto text-secondary'>
                    <h1 className="text-[24px] md:text-[48px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start mx-auto z-20 relative pb-4 md:pb-8 px-1.5 md:px-0">
                         {blogPageData?.blogstitle || "Blog"}
                    </h1>

                    <div>
                         {/* Mobile */}
                         <div className="block md:hidden px-1.5 md:px-0">
                              <BlogCard blog={blog} isEager />
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

               <div className='max-w-7xl mx-auto space-y-10 mt-10 '>
                    <RelatedBlogs title={homeData?.relatedblogstitle} />

                    <FAQ faqData={faqData} />
               </div>
          </main>
     )
}

export default Blogs;
