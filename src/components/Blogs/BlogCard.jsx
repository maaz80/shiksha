import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CloudinaryImage from '../CloudinaryImage';

const Template = '/images/shiksha-template-image.webp';

const BlogCard = ({ blog, isEager = false }) => {
     if (!blog) {
          return (
               <div className="w-91.25 md:w-[384px] h-118 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary animate-pulse">
                    <div className="relative rounded-lg overflow-hidden">
                         <img
                              src={Template}
                              alt="Loading"
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                              width="400"
                              height="209"
                              className="w-full h-52.25 object-cover"
                         />
                         <span className="absolute top-3 left-3 bg-white/80 text-transparent text-xs px-3 py-1 rounded-md shadow-sm">
                              Category
                         </span>
                    </div>

                    <div className="mt-4 px-1">
                         <div className="h-5 bg-gray-200 rounded mb-3 w-4/5" />
                         <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
                         <div className="h-4 bg-gray-200 rounded mb-2 w-11/12" />
                         <div className="h-4 bg-gray-200 rounded mb-4 w-10/12" />
                         <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
                         <div className="h-10 bg-gray-200 rounded w-full" />
                    </div>
               </div>
          );
     }

     const blogHref = `/blog/${blog.slug}`;

     const handleCardClick = () => {
          if (typeof window !== "undefined") {
               window.scrollTo({ top: 0, behavior: "auto" });
          }
     };

     // Safe date format
     const formatDate = (dateString) => {
          if (!dateString) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
     };

     const displayDate = blog.date || blog.updatedAt || blog.createdAt;

     return (
          <Link
               href={blogHref}
               onClick={handleCardClick}
               className="block w-91.25 md:w-[384px] h-118 bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-secondary cursor-pointer group hover:shadow-md transition-all duration-300"
          >

               {/* IMAGE */}
               <div className="relative rounded-lg overflow-hidden">
                    <CloudinaryImage
                         src={blog.image || Template}
                         sizes="(max-width: 768px) 365px, 384px"
                         alt={blog.alt || blog.title}
                         loading={isEager ? 'eager' : "lazy"}
                         fetchPriority={isEager ? 'high' : 'low'}
                         decoding="async"
                         width="400"
                         height="209"
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
                    <h2 className="text-[20px] leading-6 font-medium mb-3 line-clamp-1">
                         {blog.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-[16px] leading-6 mb-4 line-clamp-3">
                         {blog.description}
                    </p>

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

export default BlogCard;
