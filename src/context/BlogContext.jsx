"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getBlogs } from "../utils/blogService";

const BlogContext = createContext({ blogs: [], loading: false, getBlogBySlug: () => null });

let preloadedBlogs = [];
try {
     const initialData = await getBlogs();
     if (Array.isArray(initialData) && initialData.length > 0) {
          preloadedBlogs = initialData;
     }
} catch (e) {
     // Preload fallback if offline during build
}

export const BlogProvider = ({ children }) => {
     const [blogs, setBlogs] = useState(preloadedBlogs);
     const [loading, setLoading] = useState(preloadedBlogs.length === 0);

     useEffect(() => {
          let isMounted = true;
          const fetchBlogs = async () => {
               try {
                    const data = await getBlogs();
                    if (isMounted && Array.isArray(data) && data.length > 0) {
                         setBlogs(data);
                    }
               } catch (err) {
                    console.error("Blog fetch error:", err);
               } finally {
                    if (isMounted) setLoading(false);
               }
          };

          fetchBlogs();
          return () => { isMounted = false; };
     }, []);

     const value = useMemo(() => ({
          blogs: Array.isArray(blogs) ? blogs : [],
          loading,
          getBlogBySlug: (slug) => (Array.isArray(blogs) ? blogs.find((blog) => blog?.slug === slug) : null) || null,
     }), [blogs, loading]);

     return (
          <BlogContext.Provider value={value}>
               {children}
          </BlogContext.Provider>
     );
};

export const useBlogs = () => useContext(BlogContext);
