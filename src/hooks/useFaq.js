"use client";

// hooks/useFaq.js
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || 'http://localhost:5000/api';

// Per-page cache — sirf jo fetch hua woh store hoga
const faqCache = new Map();

const useFaq = (customSlug) => {
     const pathname = usePathname();
     const [faqData, setFaqData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const loadFaq = async () => {
               try {
                    setLoading(true);

                    // Current page ka slug nikalo
                    let slug = customSlug;
                    if (!slug) {
                         slug = 'home';
                         if (pathname !== '/') {
                              if (pathname.startsWith('/blog-details/')) {
                                   slug = 'blog-details';
                              } else if (pathname.startsWith('/course-details/')){
                                   slug = 'course-details';
                              }  else if (pathname === '/category/blogs') {
                              slug = 'blogs';
                         } else {
                              slug = pathname.replace(/\//g, '');
                         }
                    }
               }

                    //  Cache mein hai toh fetch mat karo
                    if (faqCache.has(slug)) {
                    setFaqData(faqCache.get(slug));
                    return;
               }

               //  Sirf is page ka FAQ fetch karo
               const data = await fetch(`${API_URL}/pages/${slug}/faq`)
                    .then(res => res.json())
                    .catch(() => null);

               faqCache.set(slug, data || null);
               setFaqData(data || null);

          } catch (error) {
               console.error(error);
          } finally {
               setLoading(false);
          }
     };

     loadFaq();
}, [pathname]);

return { faqData, loading };
};

export default useFaq;