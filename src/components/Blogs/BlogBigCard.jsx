import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CloudinaryImage from '../CloudinaryImage';

const Template = '/images/shiksha-template-image.webp';

const BlogBigCard = ({ blog }) => {
     const isLoading = !blog;
     const blogHref = blog?.slug ? `/blog/${blog.slug}` : "#";

     if (isLoading) {
          return (
               <div className="w-full h-125 md:h-86.5 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary flex flex-col md:flex-row items-start justify-between">
                    <div className="relative rounded-lg overflow-hidden">
                         <CloudinaryImage
                              src={Template}
                              alt="Loading"
                              priority={true}
                              fetchPriority="high"
                              className="w-148.5 h-80.75 object-cover animate-pulse rounded-lg"
                         />
                    </div>
                    <div className="p-6 flex flex-col justify-between items-start h-83.25 w-full">
                         <div className="w-full">
                              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded w-11/12 mb-2 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded w-10/12 mb-4 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
                         </div>
                         <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                    </div>
               </div>
          );
     }

     return (
          <Link
               href={blogHref}
               className="w-full h-125 md:h-86.5 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary flex flex-col md:flex-row items-start justify-between cursor-pointer group hover:shadow-md transition-all duration-300 block"
          >
               {/* IMAGE */}
               <div className="relative rounded-lg overflow-hidden">
                    <CloudinaryImage
                         src={blog?.image}
                         sizes="(max-width: 768px) 100vw, 400px"
                         alt={blog?.alt || blog?.title}
                         priority={true}
                         fetchPriority="high"
                         className="w-148.5 h-80.75 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow-sm">
                         {blog?.category || 'Career Details'}
                    </span>
               </div>

               {/* CONTENT */}
               <div className="p-6 flex flex-col justify-between items-start h-83.25 w-full">
                    <div className="w-full">
                         <h2 className="text-[24px] leading-8 font-medium mb-3">
                              {blog?.title}
                         </h2>
                         <p className="text-[16px] leading-7 mb-4">
                              {blog?.description}
                         </p>
                         <p className="text-[14px] mb-6">
                              By {blog?.author} <span className="mx-2">|</span> Updated: {blog?.date}
                         </p>
                    </div>

                    {/* BUTTON */}
                    <div
                         className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-[16px] group-hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                         Read More
                         <ChevronRight size={20} />
                    </div>
               </div>
          </Link>
     );
};

export default BlogBigCard;