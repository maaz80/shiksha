import Template from '../../assets/shiksha-template-image.webp';
import CloudinaryImage from '../CloudinaryImage';

const Hero = ({ data }) => {
     return (
          <div className='mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-10 pt-10 md:pt-15 '>
               <div className=' flex items-start justify-between gap-1 md:gap-4'>
                    <div className='max-w-45 sm:max-w-78.5 md:max-w-90.25 2xl:max-w-190'>
                         <h1 className='text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-21 font-bold text-secondary'>
                              {data?.startTitle || "We Transform Lives by "}{" "}
                              <span className="relative inline-block text-orange">
                                   {data?.midTitle || "Empowering"}

                                   {/* Tilted curved underline */}
                                   <svg
                                        className="absolute left-0 -bottom-3 lg:-bottom-6 w-full hidden md:block"
                                        viewBox="0 0 200 20"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M5 20 Q100 5 195 15"
                                             stroke="#F97316"
                                             strokeWidth="4"
                                             fill="none"
                                             strokeLinecap="round"
                                        />
                                   </svg>
                                   <svg
                                        className="absolute left-0 -bottom-3 lg:-bottom-6 w-full block md:hidden"
                                        viewBox="0 0 200 20"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M5 10 Q100 2 195 5"
                                             stroke="#F97316"
                                             strokeWidth="4"
                                             fill="none"
                                             strokeLinecap="round"
                                        />
                                   </svg>
                              </span>

                              {" "}{data?.endTitle || " People Via Digital Skills."}
                         </h1>

                         <p className='text-[10px] md:text-[14px] xl:text-[16px] leading-5 md:leading-6 xl:leading-7 mt-5'>
                              {data?.description || "We firmly believe in and embrace an open culture. Our teams comprise individuals from diverse backgrounds bringing about their own experiences Our experiences and processes are constantly evolving. We believe in innovative practices that continually push the boundaries of what’s possible for the industry."}
                         </p>
                    </div>

                    <div className='w-45 sm:w-71 h-56.5 md:w-130.75 md:h-141.75 2xl:w-155 2xl:h-159.25 p-2 flex justify-center items-start'>
                         <CloudinaryImage
                              src={data?.image || Template}
                              alt="Template Image"
                              width={293}
                              height={287}
                              loading="lazy"
                              decoding="async"
                              className='relative object-cover rounded-xl w-full'
                              sizes="(max-width: 640px) 180px, (max-width: 768px) 284px, (max-width: 1536px) 523px, 620px"
                         />
                    </div>
               </div>

          </div>
     )
}

export default Hero