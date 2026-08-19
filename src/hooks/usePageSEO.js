"use client";

import { useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';

import { API_URL } from "../utils/api.js";
const DEFAULT_TITLE = "Shiksha - Master In-Demand Skills & Get Certified";
const DEFAULT_DESCRIPTION =
     "Shiksha - Master in-demand skills with industry-leading courses. Get certified, land your dream job, and join thousands of successful graduates.";

const normalizeListResponse = (data) => {
     if (Array.isArray(data)) return data;
     if (Array.isArray(data?.data)) return data.data;
     if (Array.isArray(data?.locations)) return data.locations;
     if (Array.isArray(data?.services)) return data.services;
     return [];
};

const getItemSeo = (item) => ({
     title: item?.seoTitle || item?.metaTitle || item?.title || item?.hero?.title,
     description:
          item?.seoDescription ||
          item?.metaDescription ||
          item?.description ||
          item?.hero?.description ||
          item?.page?.help?.description,
     keywords: item?.keywords || item?.seoKeywords || "",
});

const RESERVED_PAGE_PATHS = new Set([
     "home",
     "courses",
     "career-details",
     "contact-us",
     "blogs",
     "privacy-policy",
     "careers",
     "about-us",
     "disclaimer",
     "terms-and-conditions-enrolment",
     "search",
     "dashboard",
]);

const STATIC_PAGE_SEO_IDS = new Set([
     "home",
     "courses",
     "contact-us",
     "blogs",
     "privacy-policy",
     "about-us",
     "disclaimer",
     "terms-and-conditions-enrolment",
     "careers",
     "career-details",
     "not-found",
     "search",
     "dashboard",
]);

// Helper: get or create a <meta> tag by attribute selector
const getOrCreateMeta = (attrName, attrValue) => {
     let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
     if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrValue);
          document.head.appendChild(el);
     }
     return el;
};

export function usePageSEO() {
     const pathname = usePathname();
     const seoCache = useRef(new Map());

     useEffect(() => {
          let isActive = true;

          const setSEO = (title, description, keywords, customSchema = "") => {
               if (!isActive) return;

               const finalTitle = title || DEFAULT_TITLE;
               const finalDescription = description || DEFAULT_DESCRIPTION;
               const siteUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '');
               const canonicalUrl = `${siteUrl}${pathname}`;
               const logoUrl = `${siteUrl}/images/shiksha-logo.webp`;

               // ================= BASIC SEO =================
               document.title = finalTitle;

               let metaDesc = document.querySelector('meta[name="description"]');

               if (!metaDesc) {
                    metaDesc = document.createElement("meta");
                    metaDesc.name = "description";
                    document.head.appendChild(metaDesc);
               }

               metaDesc.setAttribute("content", finalDescription);

               const metaKeywords = getOrCreateMeta("name", "keywords");
               metaKeywords.setAttribute("content", keywords || "");

               // ================= CANONICAL =================
               let canonical = document.querySelector('link[rel="canonical"]');

               if (!canonical) {
                    canonical = document.createElement("link");
                    canonical.setAttribute("rel", "canonical");
                    document.head.appendChild(canonical);
               }

               canonical.setAttribute("href", canonicalUrl);

               // ================= OPEN GRAPH =================
               getOrCreateMeta("property", "og:type")
                    .setAttribute("content", "website");

               getOrCreateMeta("property", "og:title")
                    .setAttribute("content", finalTitle);

               getOrCreateMeta("property", "og:description")
                    .setAttribute("content", finalDescription);

               getOrCreateMeta("property", "og:url")
                    .setAttribute("content", canonicalUrl);

               getOrCreateMeta("property", "og:image")
                    .setAttribute("content", logoUrl);

               // ================= TWITTER =================
               getOrCreateMeta("name", "twitter:card")
                    .setAttribute("content", "summary_large_image");

               getOrCreateMeta("name", "twitter:site")
                    .setAttribute("content", "Shiksha Design");

               getOrCreateMeta("name", "twitter:creator")
                    .setAttribute("content", "Shiksha Design");

               getOrCreateMeta("name", "twitter:title")
                    .setAttribute("content", finalTitle);

               getOrCreateMeta("name", "twitter:description")
                    .setAttribute("content", finalDescription);

               getOrCreateMeta("name", "twitter:image")
                    .setAttribute("content", logoUrl);

               // ================= DYNAMIC WEBPAGE SCHEMA =================
               let webPageScript = document.getElementById("dynamic-webpage-schema");
               if (!webPageScript) {
                    webPageScript = document.createElement("script");
                    webPageScript.id = "dynamic-webpage-schema";
                    webPageScript.type = "application/ld+json";
                    document.head.appendChild(webPageScript);
               }
               webPageScript.textContent = JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": finalTitle,
                    "description": finalDescription,
                    "url": canonicalUrl
               });

               // ================= ADMIN CUSTOM PAGE SCHEMA =================
               let pageCustomSchemaScript = document.getElementById("admin-custom-page-schema");
               if (customSchema && typeof customSchema === "string" && customSchema.trim()) {
                    if (!pageCustomSchemaScript) {
                         pageCustomSchemaScript = document.createElement("script");
                         pageCustomSchemaScript.id = "admin-custom-page-schema";
                         pageCustomSchemaScript.type = "application/ld+json";
                         document.head.appendChild(pageCustomSchemaScript);
                    }
                    const cleanSchema = customSchema.replace(/<\/?script[^>]*>/gi, '').trim();
                    pageCustomSchemaScript.textContent = cleanSchema;
               } else if (pageCustomSchemaScript) {
                    pageCustomSchemaScript.remove();
               }
          };

          const fetchJson = async (url) => {
               try {
                    const res = await fetch(url);

                    if (!res.ok) {
                         return null;
                    }

                    return await res.json();
               } catch {
                    return null;
               }
          };

          const resolveItemSlugSeo = async (slug) => {
               try {
                    // Fetch locations and courses first
                    const [locations, courses] = await Promise.all([
                         fetchJson(`${API_URL}/locations`),
                         fetchJson(`${API_URL}/courses`)
                    ]);

                    // 1. Check if it's a Location
                    const allLocations = normalizeListResponse(locations);
                    const locationItem = allLocations
                         .flatMap((location) => location.items || [])
                         .find((item) => item.slug === slug || item._id === slug);
                    if (locationItem) {
                         return getItemSeo(locationItem);
                    }

                    // 2. Check if it's a Course
                    const allCourses = normalizeListResponse(courses);
                    const courseItem = allCourses.find((c) => c.slug === slug || c._id === slug);
                    if (courseItem) {
                         const courseDetails = await fetchJson(`${API_URL}/courses/${slug}`);
                         return getItemSeo(courseDetails);
                    }

                    // 3. Check if it's a Blog
                    const blogs = await fetchJson(`${API_URL}/blogs`);
                    const allBlogs = normalizeListResponse(blogs);
                    const blogItem = allBlogs.find((b) => b.slug === slug || b._id === slug);
                    if (blogItem) {
                         const blogDetails = await fetchJson(`${API_URL}/blogs/${slug}`);
                         return {
                              title: blogDetails.seoTitle || blogDetails.title,
                              description: blogDetails.seoDescription || blogDetails.content?.replace(/<[^>]+>/g, '').slice(0, 150),
                              keywords: blogDetails.seoKeywords || ""
                         };
                    }
               } catch (err) {
                    console.error("resolveItemSlugSeo error:", err);
               }

               return null;
          };

          const updateSEO = async () => {
               try {
                    const segments = pathname.split("/").filter(Boolean);
                    const cache = seoCache.current;
                    const isMultiSegmentPath = segments.length > 1;

                    // For Location, Course, and Blog dynamic routes (/blog/:slug, /courses/:slug, /location/:slug)
                    if (segments.length === 2 && ["blog", "courses", "location"].includes(segments[0])) {
                         const slug = segments[1];
                         const cacheKey = `item:${slug}`;

                         if (cache.has(cacheKey)) {
                              const itemSeo = cache.get(cacheKey);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "", itemSeo.schema || "");

                              // Silent background revalidation
                              resolveItemSlugSeo(slug).then((updatedSeo) => {
                                   if (updatedSeo && isActive) {
                                        cache.set(cacheKey, updatedSeo);
                                        setSEO(updatedSeo.title || DEFAULT_TITLE, updatedSeo.description || DEFAULT_DESCRIPTION, updatedSeo.keywords || "", updatedSeo.schema || "");
                                   }
                              }).catch(() => { });
                              return;
                         }

                         const itemSeo = await resolveItemSlugSeo(slug);
                         if (itemSeo) {
                              cache.set(cacheKey, itemSeo);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "", itemSeo.schema || "");
                              return;
                         }

                         const notFoundSeo = await fetchJson(`${API_URL}/pages/not-found/seo`);
                         cache.set("page:not-found", notFoundSeo);
                         setSEO(
                              notFoundSeo.title || DEFAULT_TITLE,
                              notFoundSeo.description || DEFAULT_DESCRIPTION,
                              notFoundSeo.keywords || "",
                              notFoundSeo?.schema || ""
                         );
                         return;
                    }

                    // Handle Static Pages
                    const path = !segments.length
                         ? "home"
                         : (segments[0] === "blog" && !segments[1]) || (segments[0] === "category" && segments[1] === "blogs")
                              ? "blogs"
                              : isMultiSegmentPath || !STATIC_PAGE_SEO_IDS.has(segments[0])
                                   ? "not-found"
                                   : segments[0];
                    const cacheKey = `page:${path}`;

                    if (cache.has(cacheKey)) {
                         const seo = cache.get(cacheKey);
                         setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "", seo?.schema || "");
                         return;
                    }

                    const seo = await fetchJson(`${API_URL}/pages/${path}/seo`);
                    cache.set(cacheKey, seo);
                    setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "", seo?.schema || "");
               } catch (error) {
                    console.error("SEO error:", error);
               }
          };

          updateSEO();

          return () => {
               isActive = false;
          };
     }, [pathname]);
}
