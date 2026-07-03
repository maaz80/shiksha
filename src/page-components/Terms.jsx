"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getPolicyData } from "../utils/policyService";

const Terms = () => {
     const [policy, setPolicy] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: 'smooth'
          });

          const fetchPolicy = async () => {
               try {
                    setLoading(true);
                    const data = await getPolicyData();
                    setPolicy(data.disclaimer);
               } catch (err) {
                    console.error("Failed to load disclaimer policy:", err);
               } finally {
                    setLoading(false);
               }
          };

          fetchPolicy();
     }, []);

     return (
          <main className="w-full pb-24 text-secondary min-h-[90vh]">
               <Breadcrumb />
               <div className="max-w-5xl pt-4 px-6 md:px-16 lg:px-24">
                    {loading ? (
                         <div className="animate-pulse space-y-4">
                              <h1 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start mx-auto z-20 relative mb-8 text-gray-200 select-none">
                                   Disclaimer
                              </h1>
                              <p className="text-[14px] leading-6 my-8 text-gray-200/70 select-none">
                                   Loading disclaimer content, please wait. We are fetching the latest disclaimer and liability details from our secure servers. This should only take a moment.
                              </p>
                              <div className="h-6 bg-gray-200 rounded w-full" />
                              <div className="h-6 bg-gray-200 rounded w-5/6" />
                              <div className="h-6 bg-gray-200 rounded w-4/5" />
                              <div className="h-6 bg-gray-200 rounded w-11/12" />
                              <div className="h-6 bg-gray-200 rounded w-3/4" />
                         </div>
                    ) : (
                         <>
                              {/* TITLE */}
                              <h1 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-start mx-auto z-20 relative mb-8">
                                   {policy?.title || "Disclaimer"}
                              </h1>
                              {/* CONTENT */}
                              <div 
                                   className="text-[14px] leading-6 my-8 blog-content"
                                   dangerouslySetInnerHTML={{ __html: policy?.content || "" }}
                              />
                         </>
                    )}
               </div>
          </main>
     );
};

export default Terms;