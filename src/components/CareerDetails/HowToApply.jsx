import map from '../../assets/map.webp';

const HowToApply = () => {
     return (
          <div className="w-full py-0 md:py-10 px-4 open-sans relative z-20 text-secondary" >
               <div className="relative max-w-5xl mx-auto">

                    {/* Main Box */}
                    <div
                         className="
            relative overflow-hidden
            rounded-[40px]
            bg-primary-bg
            border border-black/12
            px-6 md:px-5 py-5
            text-center
          "
                    >
                         {/* Map Background */}
                         <img
                              src={map}
                              alt="Map"
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                         />


                         {/* Content */}
                         <div className="relative z-10 max-w-4xl mx-auto">

                              {/* Heading */}
                              <h2 className=" text-xl md:text-[48px] font-bold tracking-wide">
                                   How to apply for this position
                              </h2>

                              {/* Description */}
                              <p className=" text-[10px] md:text-[16px] xl:text-[24px] mt-2">
                                   To apply hor this position, send us your resume at <span className="text-orange font-bold">careers.compay@xyz.com</span>
                              </p>

                         </div>
                    </div>
               </div>
          </div>
     );
};

export default HowToApply;