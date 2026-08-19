import icon1 from '../../assets/digital-learning.webp';
import icon2 from '../../assets/salary.webp';
import icon3 from '../../assets/placement.webp';

const WhatWeDo = ({ data }) => {
     // Fallback points if none defined in database
     const defaultPoints = [
          { image: icon1, text: 'WORLD CLASS LEARNING EXPERIENCE' },
          { image: icon2, text: '55% AVERAGE SALARY HIKE' },
          { image: icon3, text: '100% PLACEMENT ASSISTANCE' }
     ];

     const pointsToRender = data?.point && data.point.length > 0 ? data.point : defaultPoints;

     return (
          <div className='min-h-63.75 md:min-h-60.25 2xl:min-h-75.75 relative flex flex-col md:flex-row items-center justify-center gap-10 2xl:gap-25 mt-10 z-10'>
               <picture className='absolute inset-0 w-full h-full z-5'>
                    <source media="(max-width: 767px)" srcSet="/images/whatwedobg-tab.webp" />
                    <img
                         src="/images/whatwedobg.webp"
                         alt="What We Do Bg Image"
                         loading="eager"
                         decoding="sync"
                         fetchPriority="high"
                         className='w-full h-full object-cover'
                    />
               </picture>

               {pointsToRender.map((pt, idx) => (
                    <div key={idx} className='flex flex-row md:flex-col gap-3 items-center justify-start md:justify-center w-65.5 md:w-50 2xl:w-79 z-50 text-white'>
                         <img src={pt.image?.src || pt.image} width={44} height={44} alt={pt.text} loading="lazy" decoding="async" className='w-11 md:w-15 2xl:w-25 object-contain max-h-11 md:max-h-19 2xl:max-h-29' />
                         <span className='text-[10px] md:text-[16px] 2xl:text-[26px] leading-6 2xl:leading-8 text-center'>{pt.text}</span>
                    </div>
               ))}
          </div>
     )
}

export default WhatWeDo;