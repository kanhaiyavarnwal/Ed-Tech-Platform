import React from 'react'
import CtaButton from "./Button"
import HighlightText from './HighlightText'
import knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithothers from '../../../assets/Images/Compare_with_others.png'
import planyourlessons from '../../../assets/Images/Plan_your_lessons.png'

export default function LearningLanguageSection() {
  return (
    <div className='mt-14 md:mt-[130px]  mb-32'>
    <div className='flex flex-col gap-5 items-center'>

      <div className='w-[90%] -ml-12 sm:block text-2xl lg:text-5xl font-semibold text-center '>
        Your swiss knife for
        <HighlightText text={'learning any language'}/>
      </div>

      <div className='text-center mx-auto  text-richblack-600 text-xl font-medium md:w-[75%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

     <div className='flex lg:flex-row flex-col items-center mt-5 animate-pulse'>
      <img src={knowyourprogress } alt="Know_yours_progress" 
      className='object-contain md:-mr-32 ' loading="lazy"
      /> 
      <img src={comparewithothers} alt="compare_with_others" loading="lazy"/> 
      <img src={planyourlessons} alt="plan_yours_lessaons" className='md:-ml-36 object-contain' loading="lazy"/> 


     </div>
     <div className='w-fit'>
       <CtaButton  active={true} Linkto={"/signup"}>
        <div className='text-xl'>
          LearnMore
        </div>
       </CtaButton>
     </div>
     

    </div>


    </div>
  )
}
