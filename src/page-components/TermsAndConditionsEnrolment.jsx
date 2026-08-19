"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import { getPolicyData } from "../utils/policyService";

const defaultTerms = {
     title: "Terms and Conditions - Enrolment",
     content: `
          <p class="editor-paragraph">Welcome to Shiksha Design Enrolment Terms and Conditions. Please read these terms carefully before enrolling in any of our courses or programs.</p>
          <p class="editor-paragraph">By completing your enrolment, you agree to adhere to all terms, policies, fee payment structures, and guidelines set forth by Shiksha Design.</p>
          <p class="editor-paragraph">If you have any questions or require further clarification regarding our enrolment terms, feel free to contact our admissions team.</p>
     `
};

const TermsAndConditionsEnrolment = () => {
     const [policy, setPolicy] = useState(defaultTerms);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: 'smooth'
          });

          const fetchPolicy = async () => {
               try {
                    const data = await getPolicyData();
                    if (data?.termsAndConditionsEnrolment) {
                         setPolicy(data.termsAndConditionsEnrolment);
                    }
               } catch (err) {
                    console.error("Failed to load enrolment terms policy:", err);
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
                                   Terms & Conditions - Enrolment
                              </h1>
                              <p className="text-[14px] leading-6 my-8 text-gray-200/70 select-none">
                                   Loading terms and conditions content, please wait. We are fetching the latest enrolment guidelines from our secure servers.
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
                                   {policy?.title || "Terms and Conditions - Enrolment"}
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

export default TermsAndConditionsEnrolment;
