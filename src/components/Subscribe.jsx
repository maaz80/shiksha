import person1 from "../assets/person1.webp";
import person2 from "../assets/person2.webp";
import person3 from "../assets/person3.webp";
import person4 from "../assets/person4.webp";
import person5 from "../assets/person5.webp";
import person6 from "../assets/testi-img.webp";

const avatarsLeft = [
     { src: person1?.src || person1 , className: "top-6 left-10 w-12 h-12" },
     { src: person2?.src || person2 , className: "top-20 left-28 w-12 h-12" },
     { src: person3?.src || person3 , className: "bottom-81 md:bottom-6 left-44 md:left-16 w-12 h-12" },
];

const avatarsRight = [
     { src: person4?.src || person4 , className: "top-6 right-10 w-12 h-12" },
     { src: person5?.src || person5 , className: "top-20 right-28 w-12 h-12" },
     { src: person6?.src || person6 , className: "bottom-81 md:bottom-6 right-44 md:right-16 w-12 h-12" },
];

const Subscribe = () => {
     return (
          <div className="w-full py-20 px-4 open-sans relative z-20">
               <div className="relative max-w-5xl mx-auto">

                    {/* Main Box */}
                    <div
                         className="
            relative overflow-hidden
            rounded-2xl
            bg-primary
            px-6 md:px-12 py-12
            text-center
          "
                    >
                         {/* Map Background */}
                         <img
                              src="/images/map.png"
                              alt="map"
                              className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                         />

                         {/* Floating Avatars LEFT */}
                         {avatarsLeft.map((item, i) => (
                              <img
                                   key={i}
                                   src={item.src}
                                   alt="user"
                                   className={`absolute rounded-full object-cover border-2 border-white ${item.className}`}
                              />
                         ))}

                         {/* Floating Avatars RIGHT */}
                         {avatarsRight.map((item, i) => (
                              <img
                                   key={i}
                                   src={item.src}
                                   alt="user"
                                   className={`absolute rounded-full object-cover border-2 border-white ${item.className}`}
                              />
                         ))}

                         {/* Content */}
                         <div className="relative z-10 max-w-xl mx-auto pt-30 md:pt-0">

                              {/* Heading */}
                              <h2 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                                   SUBSCRIBE AND NEVER MISS AN UPDATE
                              </h2>

                              {/* Description */}
                              <p className="text-white/80 text-[16px] mt-2">
                                   20k+ students daily learn with Eduvi. Subscribe for new courses.
                              </p>

                              {/* Input + Button */}
                              <div className="mt-6 flex flex-row items-center gap-3 justify-center">

                                   <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="
                  w-55 md:w-114.5
                  h-10 md:h-13 px-4
                  rounded-lg
                  bg-white/90
                  text-sm
                  outline-none
                  placeholder:text-gray-400
                "
                                   />

                                   <button
                                        className="w-22 md:w-26.5
                  h-10 md:h-12 px-6
                  rounded-lg
                  bg-orange
                  hover:bg-orange-hover
                  text-white text-[14px] md:text-[16px]
                  transition-all ease-in-out duration-300
                  flex items-center justify-center
                "
                                   >
                                        Subscribe
                                   </button>

                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Subscribe;