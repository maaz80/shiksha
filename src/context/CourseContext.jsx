"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { getCourses } from "../utils/courseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
     const [courses, setCourses] = useState([]);
     const [loading, setLoading] = useState(true);
     const pathname = usePathname();

     useEffect(() => {
          const isIgnoredPage = pathname === "/disclaimer" || pathname === "/privacy-policy";
          if (isIgnoredPage) return;
          if (courses.length > 0 || !loading) return;

          const fetchCourses = async () => {
               try {
                    const data = await getCourses();
                    if (Array.isArray(data)) {
                         setCourses(data);
                         setLoading(false);
                    }
               } catch (err) {
                    console.error("Course fetch error:", err);
               }
          };

          fetchCourses();
     }, [pathname, loading, courses.length]);

     return (
          <CourseContext.Provider value={{ courses, loading }}>
               {children}
          </CourseContext.Provider>
     );
};

export const useCourses = () => useContext(CourseContext);