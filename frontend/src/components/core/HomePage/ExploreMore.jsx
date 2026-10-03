import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from  "../../card/ExploreCourseCard"
import { toast } from 'react-hot-toast';
const tabsName = [
     "Free",
     "New to coding",
     "Most popular",
     "Skills paths",
     "Career paths",
]
export default function ExploreMore() {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
      

    const setMyCards = (value) =>{
        setCurrentTab(value);
        
        const result = HomePageExplore.filter((course)=> 
            
           
            course.tag === value)
      
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
        toast.success(`${value}`)
    }
    
  return (
    <div>
    <div className='text-2xl lg:text-5xl font-semibold text-center'>
        Unlock the 
        <HighlightText text={"Power of code"} />
    </div>
    <p className='text-base text-[20px] text-center text-richblack-300 
    font-semibold mt-3
    
    '>Learn to build any thing you can imagine
    </p>
  
    <div className='flex  max-w-maxContent flex-col md:flex-row md:rounded-full rounded-2xl mt-5 mb-5 bg-richblack-800 border-richblack-100
     px-1 py-1 
    '>
        {
            tabsName.map((element,index)=>{
                return (
                    <div className={`
                text-[16px] flex items-center gap-2 font-medium
                ${currentTab === element ? "bg-richblack-900 text-richblack-5":"text-richblack-200"}    
                   rounded-full transition-all duration-200 cursor-pointer
                   hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index}
                   onClick={()=>setMyCards(element)}
                   >
                    {element}
                    </div>
                )
            })
        }
    </div>
     <div className='hidden md:block  md:h-[200px]'></div>

   

 <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
    {
        courses.map((element,index)=>{
            return(
                <CourseCard
                    key={index}
                    cardData={element}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                />
            )
        })
    }
 </div>
     


    </div>
  )
}
