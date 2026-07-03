import { Info, Briefcase, HandCoins, HelpCircle } from "lucide-react";
import Link from 'next/link';

export default function Enquiries({ data: enquiryData }) {
     const title = enquiryData?.title || "Enquiries";

     const defaultData = [
          {
               cardtitle: "About Us",
               icon: Info,
               buttonname: "Know more",
               butttonlink: "/about-us",
          },
          {
               cardtitle: "Courses",
               icon: Briefcase,
               buttonname: "Know more",
               butttonlink: "/courses",
          },
          {
               cardtitle: "Refund Policy",
               icon: HandCoins,
               buttonname: "Know more",
               butttonlink: "/privacy-policy",
          },
     ];

     const items = enquiryData?.values && enquiryData.values.length > 0
          ? enquiryData.values.map((item, index) => {
               const fallbackIcons = [Info, Briefcase, HandCoins];
               return {
                    cardtitle: item.cardtitle,
                    buttonname: item.buttonname,
                    image: item.image,
                    butttonlink: item.butttonlink,
                    icon: fallbackIcons[index % fallbackIcons.length] || HelpCircle
               };
          })
          : defaultData;

     return (
          <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 text-secondary">

               {/* Heading */}
               <h2 className="text-[20px] md:text-[32px] font-bold text-primary mb-6">
                    {title}
               </h2>

               {/* Cards */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {items.map((item, index) => {
                         const Icon = item.icon;

                         return (
                              <div
                                   key={index}
                                   className="bg-white border border-gray-200 rounded-xl shadow-xl px-6 py-8 flex flex-col items-center justify-center text-center transition hover:shadow-md h-67.5"
                              >

                                   {/* Icon or Image */}
                                   <div className="mb-4 flex items-center justify-center h-15 w-15">
                                        {item.image ? (
                                             <img 
                                                  src={item.image} 
                                                  alt={item.cardtitle} 
                                                  width={60}
                                                  height={60}
                                                  loading="lazy"
                                                  className="w-15 h-15 object-contain" 
                                             />
                                        ) : Icon ? (
                                             <Icon size={60} className="" strokeWidth={2.5} />
                                        ) : (
                                             <HelpCircle size={60} className="" strokeWidth={2.5} />
                                        )}
                                   </div>

                                   {/* Title */}
                                   <h3 className="text-[20px] font-medium mb-4 truncate w-full">
                                        {item.cardtitle}
                                   </h3>

                                   {/* Divider */}
                                   <div className="w-full border-t border-gray-200 mb-3" />

                                   {/* CTA */}
                                   <Link href={item.butttonlink || "/"} className="flex items-center gap-1 text-[14px] hover:text-primary transition-all duration-500 ease-in-out">
                                        {item.buttonname || "Know more"}
                                        <span className="text-[12px]">↗</span>
                                   </Link>

                              </div>
                         );
                    })}
               </div>

          </div>
     );
}