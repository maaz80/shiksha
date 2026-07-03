"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import CloudinaryImage from '../CloudinaryImage';

const Template = '/images/shiksha-template-image.webp';

const BlogBigCard = ({ blog }) => {
     const router = useRouter();

     const handleReadMore = () => {
          if (!blog) return;
          router.push(`/${blog.slug}`);
     };

     const isLoading = !blog;

     return (
          <div className="w-full h-125 md:h-86.5 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary flex flex-col md:flex-row items-start justify-between">

               {/* IMAGE */}
               <div className="relative rounded-lg overflow-hidden">

                    {isLoading ? (
                         <CloudinaryImage
                              src={Template}
                              alt="Loading"
                              priority={true}
                              fetchPriority="high"
                              className="w-148.5 h-80.75 object-cover animate-pulse rounded-lg"
                         />
                    ) : (
                         <CloudinaryImage
                              src={blog?.image}
                              sizes="(max-width: 768px) 100vw, 400px"
                              alt={blog?.alt || blog?.title}
                              priority={true}
                              fetchPriority="high"
                              className="w-148.5 h-80.75 object-cover"
                         />
                    )}

                    {!isLoading && (
                         <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow-sm">
                              {blog?.category || 'Career Details'}
                         </span>
                    )}
               </div>

               {/* CONTENT */}
               <div className="p-6 flex flex-col justify-between items-start h-83.25 w-full">

                    <div className="w-full">

                         {/* TITLE */}
                         {isLoading ? (
                              <>
                                   <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                                   <div className="h-6 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />
                              </>
                         ) : (
                              <h2 className="text-[24px] leading-8 font-medium mb-3">
                                   {blog?.title}
                              </h2>
                         )}

                         {/* DESCRIPTION */}
                         {isLoading ? (
                              <>
                                   <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                                   <div className="h-4 bg-gray-200 rounded w-11/12 mb-2 animate-pulse" />
                                   <div className="h-4 bg-gray-200 rounded w-10/12 mb-4 animate-pulse" />
                              </>
                         ) : (
                              <p className="text-[16px] leading-7 mb-4">
                                   {blog?.description}
                              </p>
                         )}

                         {/* META */}
                         {isLoading ? (
                              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
                         ) : (
                              <p className="text-[14px] mb-6">
                                   By {blog?.author} <span className="mx-2">|</span> Updated: {blog?.date}
                              </p>
                         )}
                    </div>

                    {/* BUTTON */}
                    {isLoading ? (
                         <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                    ) : (
                         <button
                              onClick={handleReadMore}
                              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-[16px] hover:bg-gray-100 transition-all duration-300 ease-in-out"
                         >
                              Read More
                              <ChevronRight size={20} />
                         </button>
                    )}
               </div>
          </div>
     );
};

export default BlogBigCard;