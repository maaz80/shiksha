"use client";

export default function CallCard({ title, subtitle, buttonText, bgImage, onButtonClick }) {
     return (
          <div
               className="relative rounded-2xl overflow-hidden p-6 md:p-8 text-white bg-cover bg-center bg-no-repeat shadow-md flex flex-col justify-between min-h-55"
               style={{
                    backgroundImage: bgImage ? `url(${bgImage})` : 'bg-primary'
               }}
          >
               <div className="absolute inset-0 bg-primary"></div>
               <div className="relative z-10 space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold leading-snug text-white">
                         {title || "Design is more than just being creative!"}
                    </h3>
                    <p className="text-sm md:text-base text-gray-100">
                         {subtitle || "Learn how to make design that sells"}
                    </p>
               </div>
               <div className="relative z-10 pt-4">
                    <button
                         onClick={onButtonClick}
                         className="btn-action-white"
                    >
                         {buttonText || "Enquire Now"}
                    </button>
               </div>
          </div>
     );
}
