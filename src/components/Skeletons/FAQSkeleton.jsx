const FAQSkeleton = ({ count = 5 }) => {
     return (
          <div className="px-5">

               {/* Heading */}
               <div className="h-8 w-32 bg-gray-200 rounded mb-5 animate-pulse" />

               {/* List */}
               <div className="divide-y divide-gray-200">
                    {Array.from({ length: count }).map((_, index) => (
                         <div key={index} className="py-5 animate-pulse">

                              {/* Question Row */}
                              <div className="flex items-center justify-between">
                                   <div className="h-5 bg-gray-200 rounded w-3/4" />
                                   <div className="h-5 w-5 bg-gray-200 rounded-full" />
                              </div>

                              {/* Answer (reserved space to avoid CLS) */}
                              <div className="mt-3">
                                   <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                                   <div className="h-4 bg-gray-200 rounded w-11/12 mb-2" />
                                   <div className="h-4 bg-gray-200 rounded w-10/12" />
                              </div>

                         </div>
                    ))}
               </div>
          </div>
     );
};

export default FAQSkeleton;