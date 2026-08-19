"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCourses } from "../utils/courseService";

const CourseContext = createContext({ courses: [], loading: false });

let preloadedCourses = [];
try {
     const initialData = await getCourses();
     if (Array.isArray(initialData) && initialData.length > 0) {
          preloadedCourses = initialData;
     }
} catch (e) {
     // Preload fallback if offline during build
}

export const CourseProvider = ({ children }) => {
     const [courses, setCourses] = useState(preloadedCourses);
     const [loading, setLoading] = useState(preloadedCourses.length === 0);

     useEffect(() => {
          let isMounted = true;
          const fetchCourses = async () => {
               try {
                    const data = await getCourses();
                    if (isMounted && Array.isArray(data) && data.length > 0) {
                         setCourses(data);
                    }
               } catch (err) {
                    console.error("Course fetch error:", err);
               } finally {
                    if (isMounted) setLoading(false);
               }
          };

          fetchCourses();
          return () => { isMounted = false; };
     }, []);

     return (
          <CourseContext.Provider value={{ courses: Array.isArray(courses) ? courses : [], loading }}>
               {children}
          </CourseContext.Provider>
     );
};

export const useCourses = () => useContext(CourseContext);