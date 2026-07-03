import React from 'react'

const Disclaimer = () => {
  return (
    <div className='text-secondary max-w-300 mx-auto space-y-4 md:space-y-8 mt-20 md:mt-10 px-2'>
            {/* Heading */}
            <h2 className="text-[24px] md:text-[32x] leading-8 md:leading-15 2xl:leading-10 font-bold text-center text-primary">
                 Disclaimer

            </h2>
            <p className='text-[16px] leading-7 text-center'>
                 Simplilearn is proud to be an Equal Opportunity Employer. We celebrate diversity & do not discriminate on the basis of race, religion, colour, sex, gender identity, sexual orientation, age, non-disqualifying physical or mental disability, national origin, veteran status or any other basis covered by appropriate laws. All aspects of employment including the decision to hire, promote, discipline, or discharge, will be based on merit, competence, performance, and business needs.
            </p>
            <p className='text-[16px] leading-7 text-center text-[#C20001]'>
                 WARNING for RECRUITMENT SCAMS & FRAUD: 
            </p>
            <p className='text-[16px] leading-7 text-center'>
                 Simplilearn never asks for any kind of money, donation or credit card details during Recruitment process. Please be aware of any suspicious email activity from people who could be pretending to be recruiters or senior individuals at Simplilearn. If in doubt, you can reach out to careers@simplilearn.net
            </p>
    </div>
  )
}

export default Disclaimer