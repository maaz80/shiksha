"use client";

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getLocations } from '../utils/locations';
import { getCourseBySlug } from '../utils/courseService';
import { getBlogBySlug } from '../utils/blogService';
import { useCourses } from '../context/CourseContext';
import { useBlogs } from '../context/BlogContext';

const Location = lazy(() => import('./Location'));
const CourseDetails = lazy(() => import('./CourseDetails'));
const BlogDetails = lazy(() => import('./BlogDetails'));

const LoadingScreen = () => (
     <div className="min-h-screen flex items-center justify-center bg-primary-bg">
          <div className="animate-pulse text-primary text-lg font-semibold">Loading...</div>
     </div>
);

const NotFound = () => (
     <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg text-secondary px-4 text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
          <a href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
               Go to Home
          </a>
     </div>
);

const LOCATION_SLUGS = new Set([
     "full-stack-development-courses-shiksha"
]);

const ItemPage = ({ isLogin, setIsLogin }) => {
     const { itemSlug } = useParams();
     const { courses, loading: coursesLoading } = useCourses();
     const { blogs, loading: blogsLoading } = useBlogs();
     const [pageType, setPageType] = useState(null); // 'location', 'course', 'blog', 'notfound'
     const [resolvedData, setResolvedData] = useState(null);

     useEffect(() => {
          const resolveSlug = async () => {
               // Synchronous check for known locations to allow instant rendering and LCP
               if (LOCATION_SLUGS.has(itemSlug)) {
                    setPageType('location');
                    // Fetch in background to populate full details
                    getLocations().then((locations) => {
                         let foundLocation = null;
                         if (locations) {
                              for (const loc of locations) {
                                   const found = loc.items?.find(
                                        (i) => i.slug === itemSlug || i._id === itemSlug
                                   );
                                   if (found) {
                                        foundLocation = found;
                                        break;
                                   }
                              }
                         }
                         if (foundLocation) {
                              setResolvedData(foundLocation);
                         }
                    }).catch(() => {});
                    return;
               }

               setPageType(null);
               setResolvedData(null);

               try {
                    // 1. Check locations first (does not require courses or blogs context)
                    const locations = await getLocations();
                    let foundLocation = null;
                    if (locations) {
                         for (const loc of locations) {
                              const found = loc.items?.find(
                                   (i) => i.slug === itemSlug || i._id === itemSlug
                              );
                              if (found) {
                                   foundLocation = found;
                                   break;
                              }
                         }
                    }

                    if (foundLocation) {
                         setResolvedData(foundLocation);
                         setPageType('location');
                         return;
                    }
               } catch (error) {
                    console.error("Error resolving location slug:", error);
               }

               // If not a location, we must check courses and blogs, so wait for them to load
               if (coursesLoading || blogsLoading) return;

               try {
                    // 2. Check courses
                    const foundCourse = courses.find((c) => c.slug === itemSlug || c._id === itemSlug);
                    if (foundCourse) {
                         const courseDetails = await getCourseBySlug(itemSlug);
                         setResolvedData(courseDetails || foundCourse);
                         setPageType('course');
                         return;
                    }

                    // 3. Check blogs
                    const foundBlog = blogs.find((b) => b.slug === itemSlug || b._id === itemSlug);
                    if (foundBlog) {
                         const blogDetails = await getBlogBySlug(itemSlug);
                         setResolvedData(blogDetails || foundBlog);
                         setPageType('blog');
                         return;
                    }

                    // 4. Fallback to notfound
                    setPageType('notfound');
               } catch (error) {
                    console.error("Error resolving slug:", error);
                    setPageType('notfound');
               }
          };

          if (itemSlug) {
               resolveSlug();
          }
     }, [itemSlug, courses, blogs, coursesLoading, blogsLoading]);

     if (pageType === null) {
          return <LoadingScreen />;
     }

     return (
          <Suspense fallback={<LoadingScreen />}>
               {pageType === 'location' && <Location location={resolvedData} />}
               {pageType === 'course' && <CourseDetails course={resolvedData} slug={itemSlug} isLogin={isLogin} setIsLogin={setIsLogin} />}
               {pageType === 'blog' && <BlogDetails blog={resolvedData} slug={itemSlug} />}
               {pageType === 'notfound' && <NotFound />}
          </Suspense>
     );
};

export default ItemPage;
