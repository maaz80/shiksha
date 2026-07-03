import { Meh } from "lucide-react";
import authorLogo from '../assets/author-logo.webp';
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
const AuthorCard = () => {
     return (
          <div className="w-full rounded-2xl border border-[#D6DEE6] px-6 py-6 md:px-10 md:py-8 text-secondary mt-5 ">

               {/* TITLE */}
               <h2 className="text-[22px] md:text-[32px] font-bold mb-6">
                    Author
               </h2>

               {/* CONTENT */}
               <div className="flex flex-col md:flex-row items-start gap-6">

                    {/* AVATAR */}
                    <div className="w-45 h-45 rounded-xl overflow-hidden ">
                         <img src={authorLogo} alt="Author Logo" loading="lazy" decoding="async" className="w-full h-auto" />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex-1">

                         {/* NAME */}
                         <h3 className="text-[18px] font-bold mb-2">
                              Name of author{" "}
                              <span className="text-[18px]">
                                   (Designation)
                              </span>
                         </h3>

                         {/* DESCRIPTION */}
                         <p className="text-[16px] leading-7 mb-4">
                              LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
                              This is one of the best WordPress LMS Plugins which can be used to
                              easily create & sell courses online. LearnPress is a comprehensive
                              WordPress LMS Plugin for WordPress. This is one of the best
                              WordPress LMS Plugins which can be used to easily create & sell
                              courses online.
                         </p>

                         {/* SOCIAL */}
                         <div className="flex items-center gap-3">
                              <span className="text-[14px] text-[#5B6B7C]">Follow:</span>

                              <FaFacebook size={16} className="cursor-pointer" />
                              <BsTwitter size={16} className="cursor-pointer" />
                              <BsInstagram size={16} className="cursor-pointer" />
                              <BsYoutube size={16} className="cursor-pointer" />
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AuthorCard;