import { CircleCheck } from 'lucide-react';
import CommunityImage from '../../assets/shiksha-community.webp';
import CommunityImageMobile from '../../assets/shiksha-community-mobile.webp';
import SectionHeading from '../SectionHeading';

const DEFAULT_COMMUNITY_ITEMS = [
     {
          title: "World-Class Instructors",
          description: "Learn from top industry leaders who share practical insights and real-world design experience."
     },
     {
          title: "Interactive Sessions",
          description: "Engage in collaborative workshops, group projects, and live mentoring discussions."
     },
     {
          title: "Real-world Portfolio",
          description: "Work on live industry case studies and build a high-caliber professional portfolio."
     },
     {
          title: "Placement Assistance",
          description: "Get placement readiness preparation, mock interviews, and access to partner hiring networks."
     }
];

const Community = ({data}) => {
     const items = (data?.points && Array.isArray(data.points) && data.points.length > 0) ? data.points : DEFAULT_COMMUNITY_ITEMS;

     const startTitle = data?.startTitle || "Creating A Community Of";
     const midTitle = data?.midTitle || "Life Long";
     const endTitle = data?.endTitle || "Learners";
     const descriptionText = data?.description || "We believe learning never stops. By fostering curiosity, collaboration, and growth, we bring together passionate minds to exchange knowledge, share experiences, and inspire each other on the journey of lifelong learning.";

     return (
          <div className='mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-10 pt-6 lg:pt-26 '>

               {/* Mobile heading  */}
               <SectionHeading
                    variant="testimonial"
                    align="center"
                    className="lg:hidden mb-6"
                    startHeading={startTitle}
                    midHeading={midTitle}
                    endHeading={endTitle}
               />

               <div className='flex flex-col md:flex-row items-center justify-center 2xl:justify-between gap-1 md:gap-14'>
                    {/* Left Content  */}
                    <div className='w-78 2xl:w-170.75'>

                         {/* Desktop Heading */}
                         <SectionHeading
                              variant="testimonial"
                              align="left"
                              className="hidden xl:block mb-0"
                              startHeading={startTitle}
                              midHeading={midTitle}
                              endHeading={endTitle}
                         />

                         <div className='flex items-center justify-center gap-2 w-full'>
                              {/* Description */}
                              <p className='w-[50%] md:w-full para text-start my-6 md:my-14 text-secondary/75'>
                                   {descriptionText}
                              </p>

                              <div className='md:hidden w-43.5'>

                                   <picture>
                                        <source media="(max-width: 768px)" srcSet={CommunityImageMobile?.src || CommunityImageMobile} />
                                        <img
                                             src={CommunityImage?.src || CommunityImage}
                                             alt="Shiksha Community People" loading="lazy" decoding="async" className='w-43.5 h-90 object-cover'
                                        />
                                   </picture>
                              </div>

                          </div>


                          <div className="flex flex-wrap w-78 2xl:w-170.75 items-center justify-between gap-y-3">
                               {items.map((item, index) => (
                                    <div key={index} className='w-83.25 h-39 bg-white p-4 md:p-6 gap-1.5 rounded-[20px] flex flex-col justify-center items-start text-secondary shadow-xs'>
                                         <div className="flex items-center justify-start gap-1 text-[18px] text-secondary -mt-1.5 font-semibold">
                                              <CircleCheck className="text-orange" size={20} />
                                              <span className='text-lg md:text-[22px]'>{item.title}</span>
                                         </div>
                                         <p className='para text-secondary/75 line-clamp-3'>
                                              {item.description}
                                         </p>
                                    </div>
                               ))}
                          </div>

                    </div>

                    {/* Right Content  */}
                    <div className='hidden md:block w-103.75 2xl:w-157.5 mt-10 md:mt-0'>

                         <picture>
                              <source media="(max-width: 768px)" srcSet={CommunityImageMobile?.src || CommunityImageMobile} />
                              <img
                                   src={CommunityImage?.src || CommunityImage}
                                   alt="Community People" loading="lazy" decoding="async" className='w-103.75 2xl:w-145.75 h-206 2xl:h-290 object-cover mr-0 md:-mr-20 2xl:mr-0'
                              />
                         </picture>
                    </div>
               </div>
          </div>
     )
}

export default Community