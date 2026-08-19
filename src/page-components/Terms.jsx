"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getPolicyData } from "../utils/policyService";

const defaultDisclaimer = {
     title: "Disclaimer",
     content: `
          <p class="editor-paragraph">The information provided by Shiksha Design on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
          <p class="editor-paragraph">Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
          <p class="editor-paragraph">This website may contain links to external websites that are not provided or maintained by or in any way affiliated with Shiksha Design. Please note that Shiksha Design does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
     `
};

const Terms = () => {
     const [policy, setPolicy] = useState(defaultDisclaimer);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: 'smooth'
          });

          const fetchPolicy = async () => {
               try {
                    const data = await getPolicyData();
                    if (data?.disclaimer) {
                         setPolicy(data.disclaimer);
                    }
               } catch (err) {
                    console.error("Failed to load disclaimer policy:", err);
               }
          };

          fetchPolicy();
     }, []);

     return (
          <main className="w-full pb-24 text-secondary min-h-[90vh]">
               <Breadcrumb />
               <div className="max-w-350 mx-auto w-full pt-6 md:pt-10 px-4 sm:px-6 md:px-10 lg:px-16">
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