"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineHome } from "react-icons/hi";

const Breadcrumb = () => {
     const pathname = usePathname();

     const pathnames = pathname.split("/").filter((x) => x);
     const breadcrumbs = pathnames
          .map((name, index) => ({
               name,
               routeTo: "/" + pathnames.slice(0, index + 1).join("/"),
          }))
          .filter((item) => item.name.toLowerCase() !== "category");

     return (
          <div className="w-full bg-white/60 backdrop-blur-2xl z-999 border-b border-gray-100/80 ">
               <div className="mx-auto max-w-340 w-full flex items-center gap-2 flex-nowrap overflow-hidden h-7 md:h-9 px-4 md:px-8 text-[10px] md:text-[12px] lg:text-[14px] plus-jakarta-sans text-gray-500">
                    {/* Home */}
                    <Link href="/" className="flex items-center gap-1 hover:text-black text-gray-500">
                         <HiOutlineHome />
                         Home
                    </Link>

                    {breadcrumbs.map((item, index) => {
                         const isLast = index === breadcrumbs.length - 1;

                         const label = item.name
                              .replace(/[-_]/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                         return (
                              <div key={item.routeTo} className="flex items-center gap-1 md:gap-2">
                                   <span>/</span>

                                   {isLast ? (
                                        <span className="text-dark-blue truncate max-w-30 md:max-w-100 lg:max-w-125 font-medium">{label}</span>
                                   ) : (
                                        <Link href={item.routeTo} className="hover:text-black truncate max-w-30 md:max-w-100 lg:max-w-125">
                                             {label}
                                        </Link>
                                   )}
                              </div>
                         );
                    })}
               </div>
          </div>
     );
};

export default Breadcrumb;