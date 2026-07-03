const Hero = ({ data }) => {
     return (
          <div className="relative w-full bg-primary pt-5 pb-8 px-4 md:px-10 text-secondary">

               {/* CONTENT WRAPPER */}
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">

                    {/* LEFT CONTENT */}
                    <div className="text-white max-w-2xl xl:max-w-4xl">

                         {/* TITLE */}
                         <h1 className="text-[24px] md:text-[36px] xl:text-[48px] leading-8 md:leading-10 2xl:leading-15 font-bold text-start text-white">
                             {data?.title || "Contact Shiksha"}
                         </h1>


                         <p className="text-white text-[16px] leading-7 mt-5">
                              {data?.description || "Shiksha is the world’s #1 online bootcamp and one of the world’s leading certification training providers. We partner with companies and individuals to address their unique needs, providing training and coaching that helps working professionals achieve their career goals"}
                         </p>
                    </div>
                

               </div>
          </div>
     );
};

export default Hero;