import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CtaButton from "../../core/HomePage/Button"

const Learning =[
    {
        order : -1,
        heading:"World-Class Learning for",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide."
    },
    {
        order : 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order : 2,
        heading: "Our Learning Methods",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order : 3,
        heading: "Certification",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order : 4,
        heading:"Rating Auto-grading",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order : 5,
        heading:"Ready to Work",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring"
    },
]
export default function LearningGrid() {
  return (
    <div className=' grid mx-auto grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mb-10 p-5'>
        {
         Learning.map((card,index)=>(
            <div key={index} 
            className={`${index===0 && "lg:col-span-2 lg:h-[250px] p-5"} 
            ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-[250px] p-5":"bg-richblack-800 p-5 lg:h-[250px]"}
            ${card.order === 3 && "lg:col-start-2 lg:h-[250px]"}
            ${card.order < 0 && "bg-transparent"}
            `}>
                {
                    card.order <0 ?
                    
                    (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3 lg:pb-0'>
                           <div className='text-4xl font-semibold'>
                            {card.heading}
                            <HighlightText text={"Anyone, Anywhere"}/>
                            </div> 
                            <p className='font-medium'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-2'>
                            <CtaButton active={true} Linkto="/signup">
                            <p>learnMore</p>
                            </CtaButton>
                            </div>

                        </div>
                    )
                    :
                    (
                        <div className='flex flex-col gap-8 p-7'>
                            <h1 className='text-richblack-300 text-lg'>{card.heading}</h1>
                            <p className='text-richblack-300 font-medium'>{card.description}</p>
                        </div>
                    )
                }
            </div>
         ))   
        }


    </div>
  )
}
