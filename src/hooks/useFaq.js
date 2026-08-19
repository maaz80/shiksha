"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { fetchWithFallback } from '../utils/api.js';

const faqCache = new Map();

const useFaq = (customSlug) => {
     const pathname = usePathname();
     const [faqData, setFaqData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          let isMounted = true;
          const loadFaq = async () => {
               try {
                    setLoading(true);

                    let slug = customSlug;
                    if (!slug) {
                         slug = 'home';
                         if (pathname !== '/') {
                              if (pathname.startsWith('/blog/') || pathname.startsWith('/blog-details/')) {
                                   slug = 'blog-details';
                              } else if (pathname.startsWith('/courses/') || pathname.startsWith('/course-details/')){
                                   slug = 'course-details';
                              } else if (pathname.startsWith('/location/')) {
                                   slug = 'location-details';
                              } else if (pathname === '/blog' || pathname === '/category/blogs') {
                                   slug = 'blogs';
                              } else {
                                   slug = pathname.replace(/\//g, '');
                              }
                         }
                    }

                    if (faqCache.has(slug)) {
                         if (isMounted) {
                              setFaqData(faqCache.get(slug));
                              setLoading(false);
                         }
                         return;
                    }

                    const res = await fetchWithFallback(`/pages/${slug}/faq`);
                    let data = null;
                    if (res && res.ok) {
                         data = await res.json();
                    }

                    faqCache.set(slug, data || null);
                    if (isMounted) {
                         setFaqData(data || null);
                    }

               } catch (error) {
                    console.error(error);
               } finally {
                    if (isMounted) setLoading(false);
               }
          };

          loadFaq();
          return () => { isMounted = false; };
     }, [pathname, customSlug]);

     return { faqData, loading };
};

export default useFaq;