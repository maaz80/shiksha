"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from 'next/navigation';
import { getBlogs } from "../utils/blogService";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
     const [blogs, setBlogs] = useState([]);
     const [loading, setLoading] = useState(true);
     const pathname = usePathname();

     useEffect(() => {
          const isIgnoredPage = pathname === "/disclaimer" || pathname === "/privacy-policy";
          if (isIgnoredPage) return;
          if (blogs.length > 0 || !loading) return;

          const fetchBlogs = async () => {
               try {
                    const data = await getBlogs();
                    if (Array.isArray(data)) {
                         setBlogs(data);
                         setLoading(false);
                    }
               } catch (err) {
                    console.error("Blog fetch error:", err);
               }
          };

          fetchBlogs();
     }, [pathname, loading, blogs.length]);

     const value = useMemo(() => ({
          blogs,
          loading,
          getBlogBySlug: (slug) => blogs.find((blog) => blog.slug === slug) || null,
     }), [blogs, loading]);

     return (
          <BlogContext.Provider value={value}>
               {children}
          </BlogContext.Provider>
     );
};

export const useBlogs = () => useContext(BlogContext);
