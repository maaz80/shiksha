import { LogIn, TicketPercent, Upload } from 'lucide-react'
import Lady from '../../assets/how-it-work-ladi.webp';
import Boy from '../../assets/how-it-work-boy.webp';
import Rating1 from '../../assets/shiksha-design-rating-akshay-avatar.webp';
import Rating2 from '../../assets/shiksha-design-rating-vijay-avatar.webp';
import Rating3 from '../../assets/shiksha-design-rating-soorya-avatar.webp';
import Template from '../../assets/shiksha-template-image.webp';

const avatars = [Rating1, Rating2, Rating3];

const JoinUs = () => {
     return (
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-5'>
               <div className=''>

                    <h1 className="text-[24px] md:text-[48px] 2xl:text-[72px] leading-8 md:leading-15 2xl:leading-20 font-bold text-secondary text-center md:text-center">
                         Join Us and be a part of the
                         Digital Upskilling Revolution
                    </h1>

                    {/* Description */}
                    <p className='text-[14px] 2xl:text-[16px] leading-6 md:leading-7 text-center mx-auto mt-6'>
                         We firmly believe in and embrace an open culture. Our teams comprise individuals from diverse backgrounds bringing about their own experiences Our experiences and processes are constantly evolving. We believe in innovative practices that continually push the boundaries of what’s possible for the industry.
                    </p>

               </div>
               <div className='flex flex-col md:flex-row items-center justify-between mt-10'>

                    <div >
                         {/* 1st card  */}
                         <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary -mt-2' >
                              <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-primary-bg" aria-hidden="true">
                                   <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                                   <path d="M 80 10 V 70 M 68 22 L 80 10" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="bg-white flex items-center justify-start gap-5 rounded-[20px] p-3 2xl:p-6 w-77.25 2xl:w-md h-auto">
                                   <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#E1E9FE] text-[24px] rounded-full flex items-center justify-center text-secondary'><LogIn /></div>
                                   <div className='spacey-1'>
                                        <div className='text-[16px] 2xl:text-[20px] leading-7'>Multicultural team</div>

                                   </div>
                              </div>
                         </div>
                         {/* 2nd card  */}
                         <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary mt-8 2xl:mt-6' >
                              <div className="bg-white flex items-center justify-start gap-5 rounded-[20px] p-3 2xl:p-6 w-77.25 2xl:w-md h-auto">
                                   <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#FFEED2] text-[24px] rounded-full flex items-center justify-center text-[#FF9900]'><Upload /></div>
                                   <div className='spacey-1'>
                                        <div className='text-[16px] 2xl:text-[20px] leading-7'>2 years of excellence</div>

                                   </div>
                              </div>
                              <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-primary-bg" aria-hidden="true">
                                   <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                                   <path d="M 65 25 C 65 10, 105 10, 105 25 C 105 45, 65 52, 65 70 H 105" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                         </div>

                         {/* 3rd card  */}
                         <div className='w-91 2xl:w-142.5 h-17 2xl:h-26 flex items-center justify-between text-secondary mt-8 2xl:mt-6' >
                              <svg viewBox="0 0 110 80" className="w-16 2xl:w-28 h-12 2xl:h-20 opacity-20 text-primary-bg" aria-hidden="true">
                                   <rect x="10" y="10" width="35" height="60" rx="12" fill="none" stroke="currentColor" strokeWidth="10" />
                                   <path d="M 65 15 C 65 5, 105 5, 105 25 C 105 38, 90 40, 80 40 C 90 40, 105 42, 105 55 C 105 75, 65 75, 65 65" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="bg-white flex items-center justify-start gap-5 rounded-[20px] p-3 2xl:p-6 w-77.25 2xl:w-md h-auto">
                                   <div className='w-10 2xl:w-14 h-10 2xl:h-14 bg-[#F6E2FF] text-[24px] rounded-full flex items-center justify-center text-[#AA16EF]'><TicketPercent /></div>
                                   <div className='spacey-1'>
                                        <div className='text-[16px] 2xl:text-[20px] leading-7'>Remote work</div>

                                   </div>
                              </div>
                         </div>
                    </div>


                    {/* Image section  */}
                    <img src={Template} alt="Template Image" className='w-83 2xl:w-100 h-93.75 2xl:h-100 rounded-xl relative mt-10 md:mt-5' />
               </div>
          </div>
     )
}

export default JoinUs;