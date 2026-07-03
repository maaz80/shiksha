const data = [
     {
          title: "What you bring",
          points: [
               "Become the spokesperson of folio in the market.",
               "Build and nurture partnerships with brands and influencers who share our mission.",
               "Keep our marketing materials sharp and up-to-date across platforms.",
               "Organize, promote, and run webinars tailored to our users and target audience.",
               "Manage our marketing automation, newsletters, and release notes.",
               "Create promotional materials alongside our designers.",
               "Set up and analyze measurement plans across all efforts.",
               "Create weekly and monthly reports to drive smart, data-based decisions.",
               "Tools we use: Mixpanel, Clarity, Zoom Webinars, Drip, WordPress, Ahrefs, and Figma.",
          ],
     },
     {
          title: "What you’ll do",
          points: [
               "Become the spokesperson of folio in the market.",
               "Build and nurture partnerships with brands and influencers who share our mission.",
               "Keep our marketing materials sharp and up-to-date across platforms.",
               "Organize, promote, and run webinars tailored to our users and target audience.",
               "Manage our marketing automation, newsletters, and release notes.",
               "Create promotional materials alongside our designers.",
               "Set up and analyze measurement plans across all efforts.",
               "Create weekly and monthly reports to drive smart, data-based decisions.",
               "Tools we use: Mixpanel, Clarity, Zoom Webinars, Drip, WordPress, Ahrefs, and Figma.",
          ],
     },
];

export default function WhatSection() {
     return (
          <section className="w-full text-secondary py-12 md:py-16 lg:py-20">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

                    <div className="flex flex-col gap-12 md:gap-16">
                         {data.map((section, index) => (
                              <div
                                   key={index}
                                   className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-20"
                              >
                                   {/* LEFT TITLE */}
                                   <h2 className="text-[24px] md:text-[32px] lg:text-[32px] font-bold">
                                        {section.title}
                                   </h2>

                                   {/* RIGHT LIST */}
                                   <ul className="space-y-3 md:space-y-4 text-[14px] md:text-[16px] leading-6 md:leading-7">
                                        {section.points.map((point, i) => (
                                             <li key={i} className="flex items-start gap-3">

                                                  {/* Bullet */}
                                                  <span className="mt-3 w-1.25 h-1.25 rounded-full bg-secondary shrink-0" />

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