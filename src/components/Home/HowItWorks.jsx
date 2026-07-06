import { LogIn, TicketPercent, Upload } from 'lucide-react'
import Lady from '../../assets/how-it-work-ladi.webp';
import Boy from '../../assets/how-it-work-boy.webp';
import BoyMobile from '../../assets/how-it-work-boy-mobile.webp';
import Rating1 from '../../assets/shiksha-design-rating-akshay-avatar.webp';
import Rating2 from '../../assets/shiksha-design-rating-vijay-avatar.webp';
import Rating3 from '../../assets/shiksha-design-rating-soorya-avatar.webp';
import Rating1Mobile from '../../assets/shiksha-design-rating-akshay-avatar-mobile.webp';
import Rating2Mobile from '../../assets/shiksha-design-rating-vijay-avatar-mobile.webp';
import Rating3Mobile from '../../assets/shiksha-design-rating-soorya-avatar-mobile.webp';

const desktopAvatars = [Rating1?.src || Rating1, Rating2?.src || Rating2, Rating3?.src || Rating3];
const mobileAvatars = [Rating1Mobile?.src || Rating1Mobile, Rating2Mobile?.src || Rating2Mobile, Rating3Mobile?.src || Rating3Mobile];
const avatarAlts = ["shiksha-design-rating-akshay-avatar", "shiksha-design-rating-vijay-avatar", "shiksha-design-rating-soorya-avatar"];

const HowItWorks = ({ data }) => {
     // Safe data extraction to prevent crashes if structure changes or is loading
     const getStepData = (index, defaultTitle, defaultDesc) => {
          if (!data) return { title: defaultTitle, description: defaultDesc };

          let title = "";
          let description = "";

          if (Array.isArray(data)) {
               title = data[index]?.title;
               description = data[index]?.description;
          } else if (data.works && Array.isArray(data.works)) {
               title = data.works[index]?.title;
               description = data.works[index]?.description;
          } else {
               title = data.title?.[index] || data.howitworks?.[index]?.title;
               description = data.description?.[index] || data.howitworks?.[index]?.description;
          }

          return {
               title: title || defaultTitle,
               description: description || defaultDesc
          };
     };

     const step1 = getStepData(0, 'Sign Up & Enroll in a Course', 'Chose one or as many courses as you like');
     const step2 = getStepData(1, 'Sign Up & Enroll in a Course', 'Chose one or as many courses as you like');
     const step3 = getStepData(2, 'Sign Up & Enroll in a Course', 'Chose one or as many courses as you like');

     const titleText = data?.title || "How It Works";
     const titleWords = titleText.split(" ");
     const startTitleText = titleWords.slice(0, -1).join(" ");
     const endTitleText = titleWords.slice(-1)[0] || "";

     return (
          <div className='flex flex-col md:flex-row items-center justify-between mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-18 lg:pt-16'>
               <div className='w-91 2xl:w-[50%]'>
                    <h2 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-secondary text-center md:text-start">
                         {startTitleText}{" "}
                         <span className="relative inline-block text-orange">
                              {endTitleText}

                              {/* Tilted curved underline */}
                              <svg
                                   className="absolute left-0 -bottom-1 lg:-bottom-6 w-full"
                                   viewBox="0 0 200 20"
                                   preserveAspectRatio="none"
                                   xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                        d="M5 20 Q100 0 195 1"
                                        stroke="#F97316"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                   />
                              </svg>
                         </span>
                    </h2>

                    {/* 1st card  */}
                    <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary mt-13' >
                         <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-secondary" aria-hidden="true">
                               <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                               <path d="M 80 10 V 70 M 68 22 L 80 10" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                         <div className="bg-white flex items-center justify-between rounded-xl md:rounded-[20px] p-2 2xl:p-6 max-w-72.25 2xl:max-w-md gap-5 h-auto">
                              <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#E1E9FE] text-[24px] rounded-full flex items-center justify-center text-secondary'><LogIn /></div>
                              <div className='spacey-1'>
                                   <div className='text-[14px] 2xl:text-[20px] leading-5 md:leading-7'>{step1.title}</div>
                                   <div className='text-[12px] 2xl:text-[16px] leading-5 md:leading-7'>{step1.description}</div>
                              </div>
                         </div>
                    </div>
                    {/* 2nd card  */}
                    <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary mt-8 2xl:mt-13' >
                         <div className="bg-white flex items-center justify-between rounded-xl md:rounded-[20px] p-2 2xl:p-6 max-w-72.25 2xl:max-w-md gap-5 h-auto">
                              <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#FFEED2] text-[24px] rounded-full flex items-center justify-center text-[#FF9900]'><Upload /></div>
                              <div className='spacey-1'>
                                   <div className='text-[14px] 2xl:text-[20px] leading-5 md:leading-7'>{step2.title}</div>
                                   <div className='text-[12px] 2xl:text-[16px] leading-5 md:leading-7'>{step2.description}</div>
                              </div>
                         </div>
                         <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-secondary" aria-hidden="true">
                               <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                               <path d="M 65 25 C 65 10, 105 10, 105 25 C 105 45, 65 52, 65 70 H 105" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                    </div>

                    {/* 3rd card  */}
                    <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary mt-8 2xl:mt-13' >
                         <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-secondary" aria-hidden="true">
                               <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                               <path d="M 65 15 C 65 5, 105 5, 105 25 C 105 38, 90 40, 80 40 C 90 40, 105 42, 105 55 C 105 75, 65 75, 65 65" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                         <div className="bg-white flex items-center justify-between rounded-xl md:rounded-[20px] p-2 2xl:p-6 max-w-72.25 2xl:max-w-md gap-5 h-auto">
                              <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#F6E2FF] text-[24px] rounded-full flex items-center justify-center text-[#AA16EF]'><TicketPercent /></div>
                              <div className='spacey-1'>
                                   <div className='text-[14px] 2xl:text-[20px] leading-5 md:leading-7'>{step3.title}</div>
                                   <div className='text-[12px] 2xl:text-[16px] leading-5 md:leading-7'>{step3.description}</div>
                              </div>
                         </div>
                    </div>


               </div>

               {/* Image section  */}
               <div className='w-83 2xl:w-137.5 h-93.75 2xl:h-125 relative mt-10 md:mt-0'>

                    <div className="absolute overflow-hidden top-5 left-0 w-43.5 2xl:w-52.75 h-65 2xl:h-84.75 rounded-[20px] z-40">
                         <picture>
                              <source media="(max-width: 768px)" srcSet={BoyMobile?.src || BoyMobile} />
                              <img
                                   src={Boy?.src || Boy}
                                   alt="How It Work Boy" loading="lazy" decoding="async" className=' w-43.5 2xl:w-52.75 h-65 2xl:h-84.75 hover:scale-110 transition-all duration-500 ease-in-out'
                              />
                         </picture>
                    </div>

                    <div className='absolute top-0 right-0 w-60 2xl:w-79 h-93.75 2xl:h-122 rounded-[20px] overflow-hidden'>
                         <img src={Lady?.src || Lady} alt="How It Work Lady" loading="lazy" decoding="async" className='w-60 2xl:w-79 h-93.75 2xl:h-125 hover:scale-110 object-cover transition-all duration-500 ease-in-out' />
                    </div>

                    <div className="absolute bottom-4 left-0 w-57 2xl:w-73 h-17 2xl:h-22 rounded-[20px] bg-white p-4 gap-4 flex items-center justify-center">

                         <div className="inline-flex items-center gap-1 md:gap-4 px-0 2xl:px-4 rounded-sm">
                              {/* Avatar stack for desktop */}
                              <div className="hidden md:flex items-center">
                                   {desktopAvatars.map((avatar, index) => (
                                        <div
                                             key={index}
                                             className={`relative w-10 2xl:w-13 h-10 2xl:h-13 rounded-full border-2 border-white overflow-hidden bg-white ${index !== 0 ? "-ml-3" : ""}`}
                                             style={{ zIndex: desktopAvatars.length + index }}
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

                              {/* Avatar stack for mobile */}
                              <div className="flex md:hidden items-center">
                                   {mobileAvatars.map((avatar, index) => (
                                        <div
                                             key={index}
                                             className={`relative w-10 2xl:w-13 h-10 2xl:h-13 rounded-full border-2 border-white overflow-hidden bg-white ${index !== 0 ? "-ml-3" : ""}`}
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
                                   <div className="flex items-center gap-0.5 mb-1 text-orange font-bold">
                                        10k+
                                   </div>

                                   {/* Label */}
                                   <span className="text-secondary text-[14px] 2xl:text-[16px] font-normal tracking-tight leading-none">
                                        Placements
                                   </span>
                              </div>
                         </div>

                    </div>
               </div>
          </div>
     )
}

export default HowItWorks