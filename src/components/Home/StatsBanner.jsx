import icon1 from "../../assets/successfully-trained-icon.webp";
import icon2 from "../../assets/classes-completed-icon.webp";
import icon3 from "../../assets/satisfaction-rate-icon.webp";
import icon4 from "../../assets/students-community-icon.webp";
import map from "../../assets/map.webp";
import mapMobile from "../../assets/map-mobile.webp";



const StatsBanner = ({data}) => {
     // Default static stats with icons
     const defaultStats = [
          {
               icon: icon1,
               value: "1K+",
               label: "Successfully Trained",
          },
          {
               icon: icon2,
               value: "5K+",
               label: "Classes Completed",
          },
          {
               icon: icon3,
               value: "99%",
               label: "Satisfaction Rate",
          },
          {
               icon: icon4,
               value: "5K+",
               label: "Students Community",
          },
     ];

     // Merge dynamic database values (title & description) with static icons, falling back per-item
     const resolvedStats = defaultStats.map((item, index) => {
          const dbItem = Array.isArray(data) ? data[index] : null;
          return {
               icon: dbItem?.image || item.icon,
               value: dbItem?.title || item.value,
               label: dbItem?.description || item.label,
          };
     });

     return (
          <div className="w-full flex justify-center px-4 open-sans pt-10">
               <div className=" relative w-full max-w-6xl rounded-[40px] md:rounded-full bg-primary py-6 px-8 overflow-hidden ">
                    {/* Map Background */}
                    <picture>
                         <source media="(max-width: 768px)" srcSet={mapMobile?.src || mapMobile} />
                         <img
                              src={map?.src || map}
                              alt="Stats Map Bg" loading="lazy" decoding="async" className=" absolute inset-0 w-full h-full object-cover opacity pointer-events-none"
                         />
                    </picture>
                    {/* Content */}
                    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-0 text-white">
                         {resolvedStats.map((item, i) => (
                              <div
                                   key={i}
                                   className="flex items-center justify-start sm:justify-center gap-3"
                              >
                                   {/* Icon */}
                                   <div
                                        className=" w-19.5 md:w-12  h-19.5 md:h-12 flex items-center justify-center bg-white rounded-full shrink-0"
                                   >
                                        <img
                                             src={item.icon?.src || item.icon}
                                             alt={item.label}
                                             className="w-9.5 md:w-6 h-9.5 md:h-6 object-contain"
                                        />
                                   </div>

                                   {/* Text */}
                                   <div className="flex flex-col">
                                        <span className="text-[24px] md:text-xl font-medium md:font-semibold leading-tight">
                                             {item.value}
                                        </span>
                                        <span className="text-[16px] md:text-sm text-white/80">
                                             {item.label}
                                        </span>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default StatsBanner;