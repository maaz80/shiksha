import React from 'react'

const Overview = ({ overview }) => {
     return (
          <section id='overview' className='min-h-48 scroll-mt-24'>
               <h2 className='text-[24px] xl:text-[32px] font-bold text-primary mb-5'>Overview</h2>
               <p className='text-[14px] xl:text-[16px] leading-7 min-h-[230px] md:min-h-[150px]'>
                    {overview || 'Thank you for buying our courses. We ensure that our users have a rewarding experience while they discover, assess, and purchase our courses, whether it is an instructor-led or self-paced training. As with any online purchase experience, there are terms and conditions that govern our Refund Policy. When you buy a training course from us, you agree to our Privacy Policy, Terms of Use and Refund Policy.'}
               </p>
          </section>
     )
}

export default Overview
