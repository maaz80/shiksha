import { Mountain, Target, Flag, CircleDot } from "lucide-react";
import CloudinaryImage from "../CloudinaryImage";

const defaultValues = [
     {
          title: "Our Vision",
          icon: Mountain,
          desc: "Our goal is to gear up each student with unlimited knowledge and practical skills needed to make innovative user friendly and artistic products for the user.",
     },
     {
          title: "Our Mission",
          icon: Target,
          desc: "Our goal is to gear up each student with unlimited knowledge and practical skills needed to make innovative user friendly and artistic products for the user.",
     },
     {
          title: "Our Goal",
          icon: Flag,
          desc: "Our goal is to gear up each student with unlimited knowledge and practical skills needed to make innovative user friendly and artistic products for the user.",
     },
];

export default function OurValues({ data }) {
     const icons = [Mountain, Target, Flag];

     const title = data?.title || "Our Values";
     const valuesList = data?.values || [];

     const items = valuesList.length > 0 
          ? valuesList.map((item, index) => ({
               title: item.title,
               desc: item.description,
               image: item.image,
               icon: icons[index % icons.length] || CircleDot
            }))
          : defaultValues;

     return (

               <div className="max-w-310 mx-auto mt-12 flex flex-col items-center ">

                    {/* Heading */}
                    <h2 className="text-center text-[26px] md:text-[36px] lg:text-[48px] font-bold text-primary mb-10 md:mb-6">
                         {title}
                    </h2>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

                         {items.map((item, index) => {
                              const Icon = item.icon;

                              return (
                                   <div
                                        key={index}
                                        className="bg-white border border-gray-200 rounded-xl p-6 md:p-7 flex flex-col gap-3 transition hover:shadow-md w-90 md:w-97.25 h-73"
                                   >

                                        {/* Icon / Image */}
                                        {item.image ? (
                                             <CloudinaryImage src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg" sizes="56px" />
                                        ) : (
                                             <Icon size={58} className="text-secondary" strokeWidth={2} />
                                        )}

                                        {/* Title */}
                                        <h3 className="text-[18px] md:text-[24px] font-bold text-secondary">
                                             {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[14px] md:text-[16px] text-secondary leading-7 line-clamp-4">
                                             {item.desc}
                                        </p>

                                   </div>
                              );
                         })}

                    </div>

               </div>
     );
}