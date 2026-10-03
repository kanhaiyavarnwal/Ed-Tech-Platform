import React from 'react'
import Logo1 from  "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from  "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from  "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from  "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
const timeLine = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo2,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo3,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo4,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
]
export default function TimeLineSection() {
  return (
    <div>
      <div className='flex flex-col md:flex-row gap-5 items-center'>
       {/* left box */}

       <div className='flex flex-col w-[80%] md:w-[45%] gap-y-4'>
        {
            timeLine.map((element,index)=>{
                return(
                    <div className='flex md:gap-4' key={index}>
                    <div className='w-[50%] h-[50%] flex items-center'>
                        <img src={element.Logo} alt="Timelinelogo" srcset="" loading="lazy" />
                    </div>

                    <div>
                        <h2 className='font-semibold text-xl'>{element.heading}</h2>
                        <p className='text-base'>{element.Description}</p>
                    </div>
                    </div>
                )
            })
        }
       </div>
       {/* right */}
       <div className='relative shadow-[50px_-850px_400px_rgba(255,255,255,0.2),0_25px_60px_rgba(59,130,246,0.25)] '>
           <img src={TimeLineImage} alt="timeLineImg" loading="lazy"
           className='rounded-md shadow-[250px_250px_40px_rgba(255,255,255,0.2),0_25px_60px_rgba(59,130,246,0.25)]  object-cover h-fit hover:scale-95 transition-all duration-200'
           /> 

          <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-5  sm:left-[50%] sm:translate-x-[-50%] translate-y-[-50%] md:animate-bounce'>
              <div className='flex gap-5 items-center px-7 border-r border-caribbeangreen-300'>
                <p className='text-3xl font-semibold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>

              </div>

              <div className='flex gap-5 items-center px-7'>
                <p className='text-3xl font-semibold'>150</p>
                <p className='text-caribbeangreen-300 text-sm'>type of courses</p>

              </div>
          </div>

       </div>
      </div>

    </div>
  )
}
