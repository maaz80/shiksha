import { Fragment } from 'react';

const Details = ({ data }) => {
     const defaultDetails = [
          { title: "8M+", description: "Careers Advanced" },
          { title: "1500+", description: "Live classes per month" },
          { title: "400+", description: "Courses" }
     ];

     const items = data && data.length > 0 ? data : defaultDetails;

     return (
          <div className='min-h-63.75 md:min-h-60.25 2xl:min-h-75.75 relative flex flex-col md:flex-row items-center justify-center gap-4 2xl:gap-25 mt-10'>
               <picture className='absolute inset-0 w-full z-5 min-h-63.75 md:min-h-60.25 2xl:min-h-75.75'>
                    <source media="(max-width: 767px)" srcSet="/images/whatwedobg-tab.webp" />
                    <img
                         src="/images/whatwedobg.webp"
                         alt="What We Do Bg"
                         loading="eager"
                         decoding="sync"
                         fetchPriority="high"
                         className='absolute inset-0 w-full z-5 min-h-63.75 md:min-h-60.25 2xl:min-h-75.75'
                    />
               </picture>

               {items.map((item, index) => (
                    <Fragment key={index}>
                         {index > 0 && (
                              <div className='w-full md:w-px bg-linear-to-r md:bg-linear-to-b from-transparent via-white/60 to-transparent h-0.5 md:h-50 z-20'></div>
                         )}
                         <div className='flex flex-row md:flex-col gap-3 items-center justify-start md:justify-center w-80 md:w-50 2xl:w-79 z-50 text-white'>
                              <div className='text-[28px] md:text-[42px] xl:text-[64px] font-bold text-white'>{item.title}</div>
                              <span className='text-[20px] md:text-[16px] 2xl:text-[26px] leading-6 2xl:leading-8 text-center'>{item.description}</span>
                         </div>
                    </Fragment>
               ))}
          </div>
     )
}

export default Details;