import Template from "../../assets/shiksha-template-image.webp";

const Hero = () => {
     return (
          <div className="relative w-full bg-primary pt-5 pb-8 px-4 md:px-10 text-secondary">

               {/* CONTENT WRAPPER */}
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">

                    {/* LEFT CONTENT */}
                    <div className="text-white max-w-2xl xl:max-w-4xl">

                         {/* TAG + AUTHOR */}
                         <div className="flex items-center gap-3 mb-4">
                              <span className="text-white text-sm px-3 py-1 border border-white rounded-md">
                                   Development
                              </span>
                              <span className="text-sm text-white border border-white px-3 py-1 rounded-md">
                                   Remote
                              </span>
                         </div>

                         {/* TITLE */}
                         <h1 className="text-[24px] md:text-[36px] xl:text-[48px] leading-8 md:leading-10 2xl:leading-15 font-bold text-start text-white">
                              Digital Product Marketer
                         </h1>


                         <p className="text-white text-[16px] leading-7 mt-5">Loream ipsum We firmly believe in and embrace an open culture. Our teams comprise individuals from diverse backgrounds bringing about their own experiences Our experiences and processes are constantly evolving. We believe in innovative practices that continually push the boundaries of what’s possible for the industry.</p>
                    </div>
                    {/* RIGHT CARD */}
                    <div className="relative w-full md:w-90 h-70 mb-0 xl:-mb-40 text-secondary z-99999">

                         <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 h-67">

                              <img src={Template} alt="Template Image" className="w-full object-cover h-50" />
                              <div className="p-2">
                                   {/* BUTTON */}
                                   <button className="w-full bg-orange-500 hover:bg-orange-600 text-white h-9 xl:h-12 rounded-md font-medium transition text-[14px] xl:text-[16px]">
                                        Apply
                                   </button>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default Hero;