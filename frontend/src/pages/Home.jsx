import { Link } from "react-router-dom"
import { FaAnglesRight } from "react-icons/fa6";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import HighlightText from "../components/core/HomePage/HighlightText";
import CtaButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
 import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer";
const Home =  () =>{
return(

    <div className="">
    {/* section1 */}
   <div className="relative max-w-maxContent mx-auto flex flex-col w-11/12 items-center text-white justify-between ">


    <Link to={"/signup"}>
     
     <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-rich-black-200 transition-all duration-200 hover:scale-110">
        <div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900   ">
            <p className="md:text-2xl">Become an Instructor </p>
             <FaAnglesRight />
        </div>

     </div>
    
    </Link>


     <div className="text-center text-3xl md:text-5xl font-semibold mt-7">
        Empower Your Future with 
        <HighlightText text={"coding skills"} />
     
     </div>

      <div className="mt-4 w-[90%] text-center text-xl font-bold text-richblack-300">
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
      </div>

      <div className="flex gap-7 mt-8">
         <CtaButton active={true} Linkto={"/signup"}><p className="md:text-xl">LearnMore</p></CtaButton>
         <CtaButton active={false} Linkto={"/login"}><p className="md:text-xl">Book a Demo</p></CtaButton>
      </div>

    


<div className="relative my-12 w-fit mx-auto">
  {/* White frame behind the video */}
  <div className="absolute -top-4 -right-4 w-full h-full rounded-xl border-2 border-white bg-white"></div>

  {/* Video Container */}
  <div className="relative rounded-xl overflow-hidden border border-blue-400/30 shadow-[-20px_50px_80px_rgba(37,99,235,0.4)]">
    <video
      className="w-full"
      muted
      loop
      autoPlay
      playsInline
      preload="none"
    >
      <source src={Banner} type="video/mp4" />
    </video>
  </div>
</div>


      {/* code section-1 */}
       <div className="w-11/12">
        <CodeBlocks  
        position={"lg:flex-row flex-col"} 
        heading={
          <div className=" max-w-[95%] text-2xl lg:text-5xl  font-semibold ">
            Unlock your
            <HighlightText text={"coding potentials"}/>
            with our online courese
          </div>
        }
        subHeading={
           " Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        }

        ctabtn1={
            
            {
                btnText: "Try It Yourself",
                Linkto :"/signup",
                active:true,
            }
        }
        ctabtn2={
            
            {
                btnText: "learn more",
                Linkto :"/login",
                active:false,
            }
        }

        codeblock={`
            <!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p> homePage</p>\n</body>\n</html>
            
            `
        }
        codeColor={"text-yellow-100"}
        backgroundGredient={"shadow-[0_0_30px_rgba(255,214,10,0.5),0_0_60px_rgba(255,214,10,0.25)]"}
          
        

        
        
        />
       </div>
      {/* code section-2 */}
       <div className="w-11/12 gap-[50px]">
        <CodeBlocks  
        position={"lg:flex-row-reverse sm:flex-col-reverse flex-col-reverse "} 
        heading={
          <div className="text:2xl lg:text-5xl font-semibold">
            Start
            <HighlightText text={"coding in second"}/>
            
          </div>
        }
        subHeading={
           " Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
        }

        ctabtn1={
            
            {
                btnText: "Try It Yourself",
                Linkto :"/signup",
                active:true,
            }
        }
        ctabtn2={
            
            {
                btnText: "learn more",
                Linkto :"/login",
                active:false,
            }
        }

        codeblock={`
           import { Link } from "react-router-dom";
            import { FaAnglesRight } from "react-icons/fa6";
            import InstructorSection from "../components/core/HomePage/InstructorSection";
            import HighlightText from "../components/core/HomePage/HighlightText";
            import CtaButton from '../components/core/HomePage/Button'

            
            `
        }
        codeColor={"text-yellow-100"} 
        backgroundGredient={"shadow-[0_10px_40px_rgba(59,130,246,0.25),0_20px_60px_rgba(168,85,247,0.2),0_0_80px_rgba(255,214,10,0.15)]"}

        
        
        />
       </div> 

        <ExploreMore />


   </div>




    {/* section2 */}
        <div className="bg-pure-greys-5 text-richblue-700 ">
            <div className="homepage_bg h-[310px]">
              
              <div className="w-11/12 flex-col max-w-maxContent flex items-center mx-auto gap-5">
              <div className="h-[150px]"></div>
               <div className="flex gap-7 text-white -mt-[140px]  lg:mt-20 ">
                 <CtaButton active={true} Linkto={"signup"}>
                   <div className="flex items-center gap-2 text-base md:text-xl">
                    Explore Full Catalog
                    <FaAnglesRight />
                   </div>
                        
                 </CtaButton>

                 <CtaButton active={false} Linkto={"/signup"}>
                 <div className="md:text-xl ">
                    LearnMore
                 </div>
                    
                 </CtaButton>
               </div>
              </div>
               
            </div>

          <div className="w-11/12 gap-5 -mt-[300px] lg:-mt-0 mx-auto max-w-maxContent flex flex-col  items-center">
             
            <div className="flex flex-col md:flex-row gap-14 mb-10 mt-[95px]">
   
                    <div className="lg:text-5xl text-2xl font-semibold md:w-[45%] w-[90%]">
                      Get the skills you need for a
                      <HighlightText text={"Job that in Demand"}  />
                    </div>


             <div className="flex flex-col gap-7 md:w-[40%] -mt-9 md:mt-0 items-start">
                    <div className="text-xl">
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                <CtaButton  active={true} Linkto={"/signup"}>
                <div className="text-xl">
                   LearnMore
                </div>
                   
                </CtaButton>

            </div>

            </div>

            <TimeLineSection/>

           <LearningLanguageSection/>
            

          </div>
    
           

        </div>
    {/* section3 */}

    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between items-center gap-5 bg-richblack-900">
    
    <InstructorSection/>
    <h2 className="text-center text-4xl text-white  font-semibold mt-10 mb-10">review from other learner</h2>
    {/*  review slider */}
    
    </div>



    {/* footer */}
    <Footer/>
    


    </div>
)


}

export default Home
