import { ArrowUpRight, ScreenShare } from "lucide-react";

const jobs = [
     "Graphic Designer",
     "Digital Product Marketer",
     "Video Editor",
     "Video editing & Graphic Designer",
     "Digital Product Marketer",
];

const PositionsSection = () => {
     return (
          <div className="w-full py-20 px-4 md:px-10 bg-linear-to-br from-primary to-[#09529C] mt-20">

               {/* CONTAINER */}
               <div className="max-w-6xl mx-auto ">

                    {/* TITLE */}
                    <h2 className="text-center text-white text-[40px] md:text-[52px] font-semibold mb-12">
                         Positions
                    </h2>

                    {/* GRID */}
                    <div className="flex flex-col gap-8">

                         {/* TOP ROW */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {jobs.slice(0, 3).map((job, i) => (
                                   <Card key={i} title={job} />
                              ))}
                         </div>

                         {/* BOTTOM ROW (centered) */}
                         <div className="flex justify-center items-center gap-8 flex-wrap">
                              {jobs.slice(3).map((job, i) => (
                                   <div className="" key={i}>
                                        <Card title={job} />
                                   </div>
                              ))}
                         </div>

                    </div>
               </div>
          </div>
     );
};

export default PositionsSection;



/* ---------------- CARD ---------------- */

const Card = ({ title }) => {
     return (
          <div className="relative rounded-2xl border border-white/30 bg-white/5 backdrop-blur-md p-3 text-center hover:text-white/60 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] w-90 h-71.25 flex flex-col items-center justify-center">

               {/* ICON */}
               <div className="flex justify-center mb-4">
                         <ScreenShare size={36} />
               </div>

               {/* TITLE */}
               <h3 className="text-[18px] md:text-[20px] font-semibold mb-3">
                    {title}
               </h3>

               {/* TAGS */}
               <div className="flex justify-center gap-3 mb-6">
                    <span className="px-4 py-1 text-sm border border-white/40 rounded-full">
                         Full-time
                    </span>
                    <span className="px-4 py-1 text-sm border border-white/40 rounded-full">
                         Remote
                    </span>
               </div>

               {/* DIVIDER */}
               {/* <div className="h-px bg-white/30 mb-4"></div> */}

               {/* CTA */}
               <div className="flex justify-center items-center gap-1 text-sm opacity-90 border-t w-full pt-5 border-white/40">
                    Learn More <ArrowUpRight size={14} />
               </div>
          </div>
     );
};