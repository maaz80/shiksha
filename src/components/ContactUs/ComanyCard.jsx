import { Mail, Phone, MapPin } from "lucide-react";
import Template from '../../assets/shiksha-template-image.webp';

export default function CompanyCard({ data }) {
     const handleGetDirections = () => {
          if (data?.link) {
               window.open(data.link, "_blank", "noopener,noreferrer");
          }
     };

     return (
          <div className="w-full max-w-85 h-116.5 bg-[#f3f6f9] rounded-xl shadow-sm border border-gray-200 overflow-hidden text-secondary p-1 mx-auto">

               {/* Top Image */}
               <div className="h-45 w-full rounded-xl overflow-hidden">
                    <img
                         src={data?.image || Template}
                         alt="Company Location Image"
                         width={340}
                         height={180}
                         loading="lazy"
                         decoding="async"
                         className="w-full h-full object-cover"
                    />
               </div>

               {/* Content */}
               <div className="p-2 space-y-4">

                    <h3 className="text-[20px] font-semibold truncate">
                         {data?.companyname || "Company Registered Name"}
                    </h3>

                    <p className="text-[14px] leading-5 min-h-10 text-gray-650">
                         {data?.address || "NALANDA 53/1 C, Manoj Arcade, 24th Main Rd, Sector 2, HSR Layout, Bengaluru - 560102, Karnataka, India."}
                    </p>

                    <div className="flex items-center gap-2 text-[14px] truncate">
                         <Mail size={14} className="shrink-0" />
                         <span>{data?.email || "companyname@domain.com"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[14px] truncate">
                         <Phone size={14} className="shrink-0" />
                         <span>{data?.phone || "+91 99999 99999"}</span>
                    </div>

                    <div className="border-t border-gray-200" />

                    <button 
                         onClick={handleGetDirections}
                         disabled={!data?.link}
                         className="flex items-center justify-center gap-2 w-full text-[14px] hover:text-primary transition-all duration-500 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                         <MapPin size={14} />
                         {data?.buttonname || "Get Directions"}
                    </button>
               </div>
          </div>
     );
}