"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getPolicyData } from "../utils/policyService";

const defaultPrivacyPolicy = {
     title: "Privacy Policy",
     content: `
          <p class="editor-paragraph">At Shiksha Design, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Shiksha Design and how we use it.</p>
          <p class="editor-paragraph">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Shiksha Design.</p>
          <p class="editor-paragraph">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us.</p>
     `
};

const Policy = () => {
     const [policy, setPolicy] = useState(defaultPrivacyPolicy);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: 'smooth'
          });

          const fetchPolicy = async () => {
               try {
                    const data = await getPolicyData();
                    if (data?.privacyPolicy) {
                         setPolicy(data.privacyPolicy);
                    }
               } catch (err) {
                    console.error("Failed to load privacy policy:", err);
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
                                   Privacy Policy
                              </h1>
                              <p className="text-[14px] leading-6 my-8 text-gray-200/70 select-none">
                                   Loading privacy policy content, please wait. We are fetching the latest terms and privacy guidelines from our secure servers. This should only take a moment.
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
                                   {policy?.title || "Privacy Policy"}
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

export default Policy;