"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CompanyIcon from '../../assets/company-template.webp';
import { getCompanies } from '../../utils/companyService';
import SectionHeading from '../SectionHeading';

const buildPaddedList = (data) => {
     const logos = data?.images || [];
     const padded = [...logos];
     while (padded.length < 21) {
          padded.push({
               _id: `fallback-${padded.length}`,
               image: CompanyIcon?.src || CompanyIcon,
               title: "Company Logo"
          });
     }
     return padded;
};

const Companies = ({ initialCompanies = null }) => {
     const [startTitle, setStartTitle] = useState(initialCompanies?.startTitle || "Companies");
     const [endTitle, setEndTitle] = useState(initialCompanies?.endTitle || "That Our Students Work At");
     const [description, setDescription] = useState(initialCompanies?.description || "Our students have gone on to build successful careers with leading organizations across diverse industries.");
     const [companiesList, setCompaniesList] = useState(buildPaddedList(initialCompanies));

     useEffect(() => {
          let isMounted = true;
          const fetchLogos = async () => {
               try {
                    const data = await getCompanies();
                    if (isMounted && data) {
                         if (data.startTitle) setStartTitle(data.startTitle);
                         if (data.endTitle) setEndTitle(data.endTitle);
                         if (data.description) setDescription(data.description);
                         setCompaniesList(buildPaddedList(data));
                    }
               } catch (e) {
                    console.error("Failed to load company logos:", e);
               }
          };
          fetchLogos();
          return () => { isMounted = false; };
     }, []);

     // Pyramid rows: 8 + 7 + 6
     const rows = [
          companiesList.slice(0, 8),
          companiesList.slice(8, 15),
          companiesList.slice(15, 21),
     ];

     const rowWidths = ['w-full', 'w-[85%]', 'w-[70%]'];

     return (
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-6 lg:pt-16 text-secondary'>

               {/* Heading & Subtitle */}
               <SectionHeading
                    variant="testimonial"
                    midHeading={startTitle}
                    endHeading={endTitle}
                    subtitle={description}
                    headingClassName="w-[99%] md:w-[99%]"
                    subtitleClassName="w-[99%] md:w-[60%]"
                    className="mb-0"
               />

               {/* Reverse Pyramid Logos */}
               <div className="mt-4 md:mt-12 flex flex-col items-center gap-8 ">
                    {rows.map((row, rowIndex) => (
                         <div
                              key={rowIndex}
                              className={`${rowWidths[rowIndex]} flex justify-center items-center gap-1 md:gap-6 2xl:gap-15 mx-auto `}
                         >
                              {row.map((company) => (
                                   <div
                                        key={company._id}
                                        className="w-9 md:w-10 h-9 md:h-10 2xl:w-16 2xl:h-16 rounded-full overflow-hidden shrink-0 relative"
                                   >
                                        <Image
                                             src={company.image?.src || company.image || CompanyIcon?.src || CompanyIcon}
                                             alt={company.title || "Company Logo"}
                                             width={64}
                                             height={64}
                                             unoptimized
                                             className="w-full h-full object-contain"
                                        />
                                   </div>
                              ))}
                         </div>
                    ))}
               </div>

          </div>
     );
};

export default Companies;
