"use client";

import { useEffect, useState } from "react";
import Courses from '../components/AllCourses/AllCourses';
import Breadcrumb from "../components/BreadCrumb";
import { fetchWithFallback } from "../utils/api";
import useFaq from "../hooks/useFaq";
import { getHomeData } from "../utils/homeService";
import RelatedBlogs from '../components/RelatedBlogs';
import FAQ from '../components/FAQ';

const AllCourses = () => {
     const { faqData } = useFaq();
     const [coursePageData, setCoursePageData] = useState(null);
     const [homeData, setHomeData] = useState(null);

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          const fetchCoursePageData = async () => {
               try {
                    const res = await fetchWithFallback("/coursepage-data");
                    if (res && res.ok) {
                         const data = await res.json();
                         setCoursePageData(data);
                    }
               } catch (err) {
                    console.error("Failed to fetch course page data:", err);
               }
          };

          const fetchHomeContent = async () => {
               try {
                    const data = await getHomeData();
                    setHomeData(data);
               } catch (err) {
                    console.error("Failed to load home data on courses page:", err);
               }
          };

          fetchCoursePageData();
          fetchHomeContent();
     }, []);

     return (
          <main className="">
               <Breadcrumb />
               <div className='pt-5 max-w-80 sm:max-w-150 lg:max-w-200 xl:max-w-7xl mx-auto'>
                    <Courses title={coursePageData?.coursestitle} />
               </div>

               <div className='max-w-330 mx-auto space-y-10 min-h-245'>
                    <RelatedBlogs title={homeData?.relatedblogstitle} />

                    <FAQ faqData={faqData} />
               </div>
          </main>
     )
}

export default AllCourses;
