const RelatedBlogCardSkeleton = () => {
     return (
          <div className="w-86 h-103 bg-white rounded-xl border border-gray-200 shadow-sm p-3 animate-pulse">

               {/* IMAGE */}
               <div className="w-full h-52.25 bg-gray-200 rounded-lg" />

               {/* CONTENT */}
               <div className="mt-4 px-1">

                    {/* TITLE */}
                    <div className="h-5 bg-gray-200 rounded mb-2 w-4/5" />
                    <div className="h-5 bg-gray-200 rounded mb-3 w-3/5" />

                    {/* META */}
                    <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />

                    {/* BUTTON */}
                    <div className="h-10 bg-gray-200 rounded w-full" />

               </div>
          </div>
     );
};

export default RelatedBlogCardSkeleton;