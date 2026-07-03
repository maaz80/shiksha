const data = [
     {
          title: "Work-life Balance",
          points: [
               "Create promotional materials alongside our designers.",
               "Set up and analyze measurement plans across all efforts.",
               "Create weekly and monthly reports to drive smart, data-based decisions.",
               "Tools we use: Mixpanel, Clarity, Zoom Webinars, Drip, WordPress, Ahrefs, and Figma.",
          ],
     },
     {
          title: "Employee Life",
          points: [
               "Create promotional materials alongside our designers.",
               "Set up and analyze measurement plans across all efforts.",
               "Create weekly and monthly reports to drive smart, data-based decisions.",
               "Tools we use: Mixpanel, Clarity, Zoom Webinars, Drip, WordPress, Ahrefs, and Figma.",
          ],
     },
];

export default function WhyJoinUs() {
     return (
          <section className="w-full text-secondary py-12 md:py-16 lg:py-20 bg-primary-bg">

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

                    {/* 🔥 TOP HEADING */}
                    <h2 className="text-center text-[28px] md:text-[40px] lg:text-[48px] font-bold mb-12 md:mb-16">
                         Why join us?
                    </h2>

                    <div className="flex flex-col gap-14 md:gap-20">
                         {data.map((section, index) => (
                              <div
                                   key={index}
                                   className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] gap-6 md:gap-20"
                              >

                                   {/* LEFT TITLE */}
                                   <h3 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold">
                                        {section.title}
                                   </h3>

                                   {/* RIGHT LIST */}
                                   <ul className="space-y-3 md:space-y-4 text-[14px] md:text-[16px] leading-6 md:leading-7">
                                        {section.points.map((point, i) => (
                                             <li key={i} className="flex items-start gap-3">

                                                  {/* Bullet */}
                                                  <span className="mt-2.5 w-1.25 h-1.25 rounded-full bg-secondary shrink-0" />

                                                  {/* Text */}
                                                  <p>{point}</p>
                                             </li>
                                        ))}
                                   </ul>

                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}