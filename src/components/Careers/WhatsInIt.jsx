import icon1 from "../../assets/human.webp";
import icon2 from "../../assets/hand-shake.webp";
import icon3 from "../../assets/humans.webp";
import icon4 from "../../assets/book.webp";
import map from "../../assets/map.webp";

const stats = [
     {
          icon: icon1,
          value: "Diverse career paths",
          label: "We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.",
     },
     {
          icon: icon2,
          value: "Open work culture",
          label: "We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.",
     },
     {
          icon: icon3,
          value: "Learning support",
          label: "We welcome fresh ideas with open arms, fostering a culture where creativity thrives, and new possibilities are explored. If you like challenging the status quo, you’ll fit right in",
     },
     {
          icon: icon4,
          value: "Best-in-class facilities",
          label: "We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.",
     },
];

const WhatsInIt = () => {
     return (
          <div className="pt-20">

               {/* Heading */}
               <h2 className="text-[24px] md:text-[48px] leading-8 md:leading-15 2xl:leading-10 font-bold text-center text-primary">
                    What’s in it for you ?

               </h2>
               <div className="w-full flex justify-center px-4 open-sans pt-10">

                    <div className=" relative w-full max-w-6xl min-h-98 rounded-[40px] bg-primary-bg py-6 px-8 overflow-hidden text-secondary flex items-center justify-center shadow-2xl">
                         {/* Map Background */}
                         <img src={map} alt="map" className=" absolute inset-0 w-full h-full object-cover opacity pointer-events-none" />

                         {/* Content */}
                         <div className="relative flex items-center justify-center flex-wrap gap-4 md:gap-6">
                              {stats.map((item, i) => (
                                   <div
                                        key={i}
                                        className="flex items-start justify-start sm:justify-center gap-3 w-85 md:w-100 h-34"
                                   >
                                        {/* Icon */}
                                        <div
                                             className=" w-16 md:w-19.5 h-16 md:h-19.5 flex items-center justify-center bg-primary rounded-full shrink-0"
                                        >
                                             <img
                                                  src={item.icon}
                                                  alt={item.value}
                                                  loading="lazy"
                                                  decoding="async"
                                                  className="w-7 md:w-9 h-7 md:h-9 object-contain"
                                             />
                                        </div>

                                        {/* Text */}
                                        <div className="flex flex-col">
                                             <span className="text-[20px] md:text-xl font-bold md:font-bold leading-tight">
                                                  {item.value}
                                             </span>
                                             <span className="text-[14px] md:text-[16px] mt-2">
                                                  {item.label}
                                             </span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default WhatsInIt;