import icon1 from '../../assets/digital-learning.webp';
import icon2 from '../../assets/salary.webp';
import icon3 from '../../assets/placement.webp';

const WhatWeDo = () => {
     return (
          <div className='min-h-63.75 md:min-h-60.25 2xl:min-h-75.75 relative flex flex-col md:flex-row items-center justify-center gap-10 2xl:gap-25 mt-10'>
               <picture className='absolute inset-0 w-full h-full z-5 min-h-63.75 md:min-h-60.25 2xl:min-h-75.75'>
                    <source media="(max-width: 767px)" srcSet="/images/whatwedobg-tab.webp" />
                    <img
                         src="/images/whatwedobg.webp"
                         alt="What We Do Bg"
                         loading="lazy"
                         decoding="async"
                         className='absolute inset-0 w-full h-full object-cover z-5 min-h-63.75 md:min-h-60.25 2xl:min-h-75.75'
                    />
               </picture>

               {/* Icon 1*/}
               <div className='flex flex-row md:flex-col gap-3 items-center justify-start md:justify-center w-65.5 md:w-50 2xl:w-79 z-50 text-white'>
                    <img src={icon3} width={44} height={44} alt="Placement" className='w-11 md:w-15 2xl:w-25' />
                    <span className='text-[10px] md:text-[16px] 2xl:text-[26px] leading-6 2xl:leading-8 text-center'>W5 Years of Experience</span>
               </div>
               {/* Icon 2 */}
               <div className='flex flex-row md:flex-col gap-3 items-center justify-start md:justify-center w-65.5 md:w-50 2xl:w-79 z-50 text-white'>
                    <img src={icon1} width={44} height={44} alt="Digital Learning" className='w-11 md:w-19 2xl:w-29' />
                    <span className='text-[10px] md:text-[16px] 2xl:text-[26px] leading-6 2xl:leading-8 text-center'>Hybrid Work Environment</span>
               </div>
               {/* Icon 3*/}
               <div className='flex flex-row md:flex-col gap-3 items-center justify-start md:justify-center w-65.5 md:w-50 2xl:w-79 z-50 text-white'>
                    <img src={icon2} width={44} height={44} alt="Salary" className='w-11 md:w-15 2xl:w-25' />
                    <span className='text-[10px] md:text-[16px] 2xl:text-[26px] leading-6 2xl:leading-8 text-center'>Competitive Salary & Benefits</span>
               </div>
          </div>
     )
}

export default WhatWeDo;