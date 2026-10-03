import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CtaButton from "./Button"
import { FaArrowCircleRight } from 'react-icons/fa'

export default function InstructorSection() {
  return (
    <div className='mt-12 md:mt-16'>

     <div className='flex flex-col md:flex-row gap-20 items-center'>

        <div className='w-[90%] md:w-[50%]'>
         
            <img src={InstructorImage} alt="instructorImage" loading="lazy"
            className='shadow-[0_15px_40px_rgba(255,255,255,0.2),0_25px_60px_rgba(59,130,246,0.25)] rounded-md'
            />
        </div>
        <div className='ml-4  md:ml-0 md:w-[50%] flex flex-col gap-5 md:gap-10'>
           <div className='text-2xl lg:text-5xl -mt-12  md:mt-0 md:w-[50%] font-semibold text-white'>
            Become an 
            <HighlightText text={'Instructor'}/>
           </div>
           <p className='w-[80%] font-medium text-xl text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <div className='w-fit'>

                 <CtaButton active={true} Linkto={"/signup"}>
            <div className='flex gap-2 text-xl items-center'>
                Start Learning Today
                <FaArrowCircleRight/>
            </div>
           </CtaButton>
            </div>
        </div>

     </div>


    </div>
  )
}
