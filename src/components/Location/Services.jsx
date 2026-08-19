import { Grip } from "lucide-react";
import CardImgImported from "../../assets/shiksha-template-image.webp";
const CardImg = CardImgImported?.src || CardImgImported;
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Services = ({ location }) => {
     const locationContent = location?.page?.location;

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     }

     const optimizeImage = (url, width) => {
          if (!url || typeof url !== "string") return "";
          if (!url.includes("/upload/")) return url;
          return url.replace(
               "/upload/",
               `/upload/w_${width},c_fill,q_auto:eco,f_auto/`
          );
     };

     return (
          <section id="location-services" className="relative w-full py-10 md:py-24 px-4 md:px-8 overflow-hidden bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white ">


               {/* Content */}
               <div className="relative max-w-310 mx-auto text-center plus-jakarta-sans flex flex-col justify-center items-center">

                    {/* Heading */}
                    <h2 className="poiret-one-regular text-[36px] md:text-[40px] xl:text-[48px] font-bold leading-10 md:leading-15">
                         {locationContent?.title || "Our Specialized Services"}
                    </h2>

                    {/* Subtext */}
                    {/* <p className="mt-4 md:mt-6 text-sm md:text-base xl:text-[20px] text-white max-w-190 mx-auto leading-7 md:leading-8">
                         {locationContent?.description ||
                              `We're a [City]-based creative studio helping local businesses and startups
                         build brands people remember — from logo to launch.`}
                    </p> */}

                    {/* Cards */}
                    <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 items-center justify-center">

                         {(locationContent?.cards?.length > 0 ? locationContent.cards : services).map((item, i) => {
                              const imageSrc = item.image || CardImg;
                              const optimizedSmall = optimizeImage(imageSrc, 480);
                              const optimizedMedium = optimizeImage(imageSrc, 768);
                              const optimizedLarge = optimizeImage(imageSrc, 960);

                              return (
                                   <div
                                        key={i}
                                        className="group bg-white/5 border border-white/10 overflow-hidden hover:-translate-y-1 transition duration-300 min-w-75 max-w-95 min-h-88 max-h-90"
                                   >
                                        {/* Image */}
                                        <div className="w-full h-55.75 overflow-hidden">
                                             <img
                                                  src={optimizedLarge}
                                                  srcSet={`
                                                  ${optimizedSmall} 480w,
                                                  ${optimizedMedium} 768w,
                                                  ${optimizedLarge} 960w
                              `}
                                                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 23rem"
                                                  loading="lazy"
                                                  decoding="async"
                                                  alt={`${item.para || item.title || "Service"} - Service Image`}
                                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                             />
                                        </div>

                                        {/* Bottom Text */}
                                        <div className="bg-white/5 min-h-32 flex flex-col justify-center px-5 text-left py-4">
                                             {item.title && (
                                                  <h3 className="font-bold text-[18px] leading-6 text-white mb-1 line-clamp-1">
                                                       {item.title}
                                                  </h3>
                                             )}
                                             {(item.para || (!item.title ? item.title : "")) && (
                                                  <p className="text-[14px] md:text-[15px] leading-5 md:leading-6 text-white/80 line-clamp-3">
                                                       {item.para || (!item.title ? item.title : "")}
                                                  </p>
                                             )}
                                        </div>
                                   </div>
                              )
                         })}

                    </div>

                    {/* CTA */}
                    <div className="mt-12 md:mt-16 flex justify-center">
                         {/* <button
                              onClick={handleClick}
                              type="submit"
                              className="service-btn group relative isolate overflow-hidden text-white bg-transparent text-[15px] md:text-[18px] w-44 md:w-60 h-12 lg:h-15 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-blue border-white border cursor-pointer active:scale-99 text-center"
                         >
                              <span className="relative z-10">Get in Touch</span>

                              <HiOutlineArrowLongRight
                                   size={30}
                                   className="hidden md:block relative z-10 text-white transition-all duration-300 group-hover:text-blue"
                              />
                              <HiOutlineArrowLongRight
                                   size={24}
                                   className=" md:hidden relative z-10 text-white transition-all duration-300 group-hover:text-blue"
                              />
                         </button> */}
                         <button onClick={() => {
                              handleClick
                              document.getElementById('courses')?.scrollIntoView({
                                   behavior: 'smooth',
                              });
                         }} className="flex h-12 md:h-14 justify-center w-50.25 md:w-60 rounded-md bg-primary text-white text-[14px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-primary-hover cursor-pointer transition-all duration-300 ease-in-out ">
                              {/* <Grip /> */}
                              Explore Program
                         </button>
                    </div>

               </div>
          </section>
     );
};

const services = [
     {
          title: "Brand identity — Logo, colours, typography",
          image: CardImg,
     },
     {
          title: "Web design — Conversion-led websites",
          image: CardImg,
     },
     {
          title: "UI/UX design — Apps and dashboards",
          image: CardImg,
     },
     {
          title: "Digital marketing — SEO and leads",
          image: CardImg,
     },
     {
          title: "Brand identity — Logo, colours, typography",
          image: CardImg,
     },
     {
          title: "Web design — Conversion-led websites",
          image: CardImg,
     },
     {
          title: "UI/UX design — Apps and dashboards",
          image: CardImg,
     },
     {
          title: "Digital marketing — SEO and leads",
          image: CardImg,
     },
];

export default Services;
