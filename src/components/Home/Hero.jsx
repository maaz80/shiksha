"use client";

import { Grip } from 'lucide-react';
const HeroImg = '/images/shiksha-design-hero.webp';
const HeroImgMobile = '/images/shiksha-design-hero-mobile.webp';
import Rating1 from '../../assets/shiksha-design-rating-akshay-avatar.webp';
import Rating1Mobile from '../../assets/shiksha-design-rating-akshay-avatar-mobile.webp';
import Rating2 from '../../assets/shiksha-design-rating-vijay-avatar.webp';
import Rating2Mobile from '../../assets/shiksha-design-rating-vijay-avatar-mobile.webp';
import Rating3 from '../../assets/shiksha-design-rating-soorya-avatar.webp';
import Rating3Mobile from '../../assets/shiksha-design-rating-soorya-avatar-mobile.webp';

const avatarAlts = ["shiksha-design-rating-akshay-avatar", "shiksha-design-rating-vijay-avatar", "shiksha-design-rating-soorya-avatar"];

const desktopAvatars = [Rating1?.src || Rating1, Rating2?.src || Rating2, Rating3?.src || Rating3];
const mobileAvatars = [Rating1Mobile?.src || Rating1Mobile, Rating2Mobile?.src || Rating2Mobile, Rating3Mobile?.src || Rating3Mobile];

const Hero = ({ data }) => {
     return (
          <div className='mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-10 pt-10 md:pt-18 lg:pt-6'>
               <div className='lg:min-h-screen max-h-screen flex items-start justify-between gap-1 md:gap-4'>
                    <div className='max-w-38.5 md:max-w-90.25 2xl:max-w-165 mt-0 md:mt-20'>
                         <h1 className='text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-secondary '>{data?.startTitle || ' AI-Powered Design Courses.'} {" "}
                              <span className="relative inline-block text-orange">
                                   {data?.midTitle || 'Learn. Grow.'}
                                   {/* Tilted curved underline */}
                                   <svg
                                        className="absolute left-0 -bottom-3 lg:-bottom-6 w-full"
                                        viewBox="0 0 200 20"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M5 10 Q100 0 195 1"
                                             stroke="#F97316"
                                             strokeWidth="4"
                                             fill="none"
                                             strokeLinecap="round"
                                        />
                                   </svg>
                              </span>

                              {" "} {data?.endTitle || 'with AI.'}</h1>

                         <div className='hidden md:flex items-center md:items-start 2xl:items-center flex-row md:flex-col 2xl:flex-row gap-4 mt-30 md:mt-10 justify-start'>
                              <button onClick={() => {
                                   document.getElementById('courses')?.scrollIntoView({
                                        behavior: 'smooth',
                                   });
                              }} className="flex h-9 md:h-14 justify-center w-30.25 md:w-51 rounded-md bg-orange text-white text-[14px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-orange-hover cursor-pointer transition-all duration-300 ease-in-out ">
                                   <Grip />
                                   Explore Program
                              </button>

                              {/* Rating  */}

                              <div className="inline-flex items-center gap-1 md:gap-4 px-0 2xl:px-4 rounded-sm">
                                   {/* Avatar stack */}
                                   <div className="flex items-center">
                                        {desktopAvatars.map((avatar, index) => (
                                             <div
                                                  key={index}
                                                  className={`relative w-9 md:w-13 h-9 md:h-13 rounded-full border-2 border-[#0071E5] overflow-hidden bg-white ${index !== 0 ? "-ml-3" : ""}`}
                                                  style={{ zIndex: desktopAvatars.length + index }}
                                             >
                                                  <img
                                                       src={avatar}
                                                       alt={avatarAlts[index]}
                                                       className="w-full h-full object-cover"
                                                  />
                                             </div>
                                        ))}
                                   </div>

                                   {/* Rating text */}
                                   <div className="flex flex-col leading-tight">
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5 mb-1">
                                             {[1, 2, 3, 4].map((star) => (
                                                  <svg
                                                       key={star}
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       viewBox="0 0 24 24"
                                                       fill="#0071E5"
                                                       className="w-4.5 md:w-6 h-4.5 md:h-6"
                                                  >
                                                       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                  </svg>
                                             ))}

                                             {/* Half star */}
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 24 24"
                                                  className="w-4 md:w-5 h-4 md:h-5"
                                             >
                                                  <defs>
                                                       <linearGradient id="halfStar">
                                                            <stop offset="50%" stopColor="#0071E5" />
                                                            <stop offset="50%" stopColor="transparent" />
                                                       </linearGradient>
                                                  </defs>
                                                  <path
                                                       d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                       fill="url(#halfStar)"
                                                       stroke="#0071E5"
                                                       strokeWidth="1.5"
                                                  />
                                             </svg>
                                        </div>

                                        {/* Label */}
                                        <span className="text-[#0071E5] text-[14px] font-normal tracking-tight leading-none">
                                             ( Google Rating )
                                        </span>
                                   </div>
                              </div>

                         </div>

                    </div>
                    <div>
                         {/* <img src={HeroImg} fetchPriority='high' alt="Hero" width={293} height={287} loading="eager" decoding="async" className='absolute md:relative right-5 md:right-0 top-18 md:top-0 w-51 h-56.5 md:w-130.75 md:h-141.75 2xl:w-155 2xl:h-159.25 object-cover' /> */}
                         <picture>
                              <source media="(max-width: 768px)" srcSet={HeroImgMobile} />
                              <img
                                   src={HeroImg}
                                   fetchPriority='high' alt="Hero" width={293} height={287} loading="eager" decoding="async" className='absolute md:relative right-5 md:right-0 top-18 md:top-0 w-51 h-56.5 md:w-130.75 md:h-141.75 2xl:w-155 2xl:h-159.25 object-cover'
                              />
                         </picture>
                    </div>
               </div>

               <div className='flex md:hidden items-center md:items-start 2xl:items-center flex-row md:flex-col 2xl:flex-row gap-4 mt-20 md:mt-10 justify-start'>
                    <button onClick={() => {
                         document.getElementById('courses')?.scrollIntoView({
                              behavior: 'smooth',
                         });
                    }}
                         className="flex h-9 md:h-14 justify-center w-40.25 md:w-51 rounded-md bg-primary text-white text-[12px] md:text-[16px] items-center gap-2 shadow-sm hover:bg-primary-hover cursor-pointer transition-all duration-300 ease-in-out ">
                         <Grip size={13} />
                         Explore Program
                    </button>

                    {/* Rating  */}

                    <div className="inline-flex items-center gap-1 md:gap-4 px-0 2xl:px-4 rounded-sm">
                         {/* Avatar stack */}
                         <div className="flex items-center">
                              {mobileAvatars.map((avatar, index) => (
                                   <div
                                        key={index}
                                        className={`relative w-9 md:w-13 h-9 md:h-13 rounded-full border-2 border-[#0071E5] overflow-hidden bg-white ${index !== 0 ? "-ml-3" : ""}`}
                                        style={{ zIndex: mobileAvatars.length + index }}
                                   >
                                        <img
                                             src={avatar}
                                             alt={avatarAlts[index]}
                                             loading="lazy"
                                             decoding="async"
                                             className="w-full h-full object-cover"
                                        />
                                   </div>
                              ))}
                         </div>

                         {/* Rating text */}
                         <div className="flex flex-col leading-tight">
                              {/* Stars */}
                              <div className="flex items-center gap-0.5 mb-1">
                                   {[1, 2, 3, 4].map((star) => (
                                        <svg
                                             key={star}
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="#0071E5"
                                             className="w-4.5 md:w-6 h-4.5 md:h-6"
                                        >
                                             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                   ))}

                                   {/* Half star */}
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-4 md:w-5 h-4 md:h-5"
                                   >
                                        <defs>
                                             <linearGradient id="halfStarMobile">
                                                  <stop offset="50%" stopColor="#0071E5" />
                                                  <stop offset="50%" stopColor="transparent" />
                                             </linearGradient>
                                        </defs>
                                        <path
                                             d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                             fill="url(#halfStarMobile)"
                                             stroke="#0071E5"
                                             strokeWidth="1.5"
                                        />
                                   </svg>
                              </div>

                              {/* Label */}
                              <span className="text-[#0071E5] text-[12px] font-normal tracking-tight leading-none">
                                   ( Google Rating )
                              </span>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default Hero;