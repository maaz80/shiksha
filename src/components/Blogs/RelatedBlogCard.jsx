import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Template from '../../assets/shiksha-template-image.webp';
import CloudinaryImage from '../CloudinaryImage';

const RelatedBlogCard = ({ blog, className = "" }) => {
     if (!blog) return null;

     const blogHref = `/blog/${blog.slug}`;

     const handleCardClick = () => {
          if (typeof window !== "undefined") {
               window.scrollTo({ top: 0, behavior: "auto" });
          }
     };

     // Format date safely and deterministically across SSR and Client
     const formatDate = (dateString) => {
          if (!dateString) return "01/15/2026";
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "01/15/2026";
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0');
          const day = String(date.getUTCDate()).padStart(2, '0');
          return `${month}/${day}/${year}`;
     };

     const displayDate = blog.date || blog.updatedAt || blog.createdAt;

     return (
          <Link
               href={blogHref}
               onClick={handleCardClick}
               suppressHydrationWarning
               className={`block ${className ? className : "w-full"} h-103 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary cursor-pointer group hover:shadow-md transition-all duration-300`}
          >

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
                         {blog.category || "Blog"}
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
                         By {blog.author || "Shiksha Team"} <span className="mx-2">|</span> Updated: {formatDate(displayDate)}
                    </p>

                    {/* BUTTON */}
                    <div
                         className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-[16px] group-hover:bg-gray-100 transition-all duration-500 ease-in-out cursor-pointer">
                         Read More
                         <ChevronRight size={20} />
                    </div>

               </div>
          </Link>
     );
};

export default RelatedBlogCard;