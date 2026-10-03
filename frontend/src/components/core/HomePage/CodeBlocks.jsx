import React from 'react'
import CtaButton from './Button'
import { FaAnglesRight } from "react-icons/fa6";
import HighlightText from './HighlightText'
import { TypeAnimation } from 'react-type-animation';


export default function CodeBlocks({
    position , heading , subHeading , ctabtn1 , ctabtn2 , codeblock ,backgroundGredient, codeColor
}) {

    
  return (
    <div className={`flex ${position} my-20 md:justify-between mx-auto  w-[98%] md:mx-0   gap-[84px]  `}>

              {/* {section-1}      */}
       
                   <div className='w-[50%] lg:w-500px flex flex-col  gap-5 '>
                                        <div className=' w-[400px] text-3xl lg:5xl'>
                                              {heading}
                                        </div>
                                  
                                    <div className='text-richblack-300 text-xl w-[350px] font-bold'>
                                    {subHeading}
                                    </div>
                                           



                            <div className="flex flex-nowrap items-center gap-3 mt-4">
                                    <CtaButton active={ctabtn1.active} Linkto={ctabtn1.Linkto}>
                                        <div className="flex items-center gap-2 px-3 py-1 text-sm md:text-base font-semibold whitespace-nowrap">
                                        {ctabtn1.btnText}
                                        <FaAnglesRight />
                                        </div>
                                    </CtaButton>

                            <CtaButton active={ctabtn2.active} Linkto={ctabtn2.Linkto}>
                                <div className="px-3 py-1 text-sm md:text-base font-semibold whitespace-nowrap">
                                {ctabtn2.btnText}
                                </div>
                            </CtaButton>
                        </div>

                
                         </div>
     {/* section-1 ka second part */}
                       



<div className="relative w-full lg:w-[500px] h-fit">
  {/* Gradient Glow */}
  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-purple-500/30 blur-3xl rounded-xl"></div>

  {/* Code Block */}
  <div
    className={`relative flex overflow-hidden rounded-xl
               border border-white/10
               bg-white/5 backdrop-blur-md
                 ${backgroundGredient}`}
  >
    {/* Line Numbers */}
    <div
      className="w-[10%] flex flex-col items-center py-4
                 text-richblack-400 font-inter font-bold
                 bg-richblack-800/40
                 shadow-[4px_0_20px_rgba(59,130,246,0.25)]"
    >
      <p className="invisible">0</p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
      <p>12</p>
      <p>13</p>
      <p>14</p>
      <p>15</p>
    </div>

    {/* Code */}
    <div className={`w-[90%] py-4 px-4 text-md font-mono font-bold ${codeColor}`}>
      <TypeAnimation
        sequence={[codeblock, 2000, ""]}
        repeat={Infinity}
        cursor={true}
        omitDeletionAnimation={true}
        style={{
          whiteSpace: "pre-line",
          display: "block",
        }}
      />
    </div>
  </div>
</div>
         
                     
        
        {/* section-2 */}
        
        
        </div>
  )
}
