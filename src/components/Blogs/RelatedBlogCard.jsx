"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import Template from '../../assets/shiksha-template-image.webp';
import CloudinaryImage from '../CloudinaryImage';

const RelatedBlogCard = ({ blog }) => {
     const router = useRouter();

     if (!blog) return null;

     const handleReadMore = () => {
          window.scrollTo({ top: 0, behavior: "auto" });
          router.push(`/${blog.slug}`);
     };

     // Format date
     const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
     };
     return (
          <div className="w-86 md:w-100 h-103 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary">

               {/* IMAGE */}
               <div className="relative rounded-lg overflow-hidden">
                    <CloudinaryImage
                         src={blog.image || Template}
                         sizes="(max-width: 768px) 344px, 400px"
                         alt={blog.alt || blog.title}
                         loading="lazy"
                         decoding="async"
                         width="400"
                         height="210"
                         className="w-full h-52.25 object-cover"
                    />

                    {/* BADGE */}
                    <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow-sm">
                         {blog.category}
                    </span>
               </div>

               {/* CONTENT */}
               <div className="mt-4 px-1">

                    {/* TITLE */}
                    <h2 className="text-[20px] leading-6 font-medium mb-3 line-clamp-2">
                         {blog.title}
                    </h2>

                    {/* META */}
                    <p className="text-[14px] mb-6">
                         By {blog.author} <span className="mx-2">|</span> Updated: {formatDate(blog.date)}
                    </p>

                    {/* BUTTON */}
                    <button
                         onClick={handleReadMore}
                         className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-[16px] hover:bg-gray-100 transition-all duration-500 ease-in-out cursor-pointer">
                         Read More
                         <ChevronRight size={20} />
                    </button>

               </div>
          </div>
     );
};

export default RelatedBlogCard;