import { ChevronDown, ChevronRight } from 'lucide-react'

const ProgramsSidebar = ({ isActive, onClick, category, isHeading }) => {
     if (isHeading) {
          return (
               <div
                    className="w-full md:w-52 2xl:w-62.5 h-12 md:h-9 2xl:h-12 flex items-center text-[18px] md:text-[16px] 2xl:text-[18px] font-bold text-secondary px-4 py-1 select-none"
               >
                    <div>{category}</div>
               </div>
          )
     }

     return (
          <div
               onClick={onClick}
               className={`
        w-full md:w-52 2xl:w-62.5 h-12 md:h-9 2xl:h-12 
        rounded-lg flex items-center justify-between 
        text-[16px] md:text-[14px] 2xl:text-[16px]
        px-4 py-1 cursor-pointer 
        transition-all duration-300 ease-in-out

        ${isActive
                         ? 'bg-primary text-white'
                         : 'bg-white text-secondary hover:bg-primary hover:text-white'}
      `}
          >
               <div>{category}</div>

               {/* Desktop Icon */}
               <div className='hidden md:block'>
                    <ChevronRight className={`transition-transform ${isActive ? 'rotate-90 text-white' : ''}`} />
               </div>

               {/* Mobile Icon */}
               <div className='md:hidden'>
                    <ChevronDown className={`transition-transform ${isActive ? 'rotate-180 text-white' : ''}`} />
               </div>
          </div>
     )
}

export default ProgramsSidebar