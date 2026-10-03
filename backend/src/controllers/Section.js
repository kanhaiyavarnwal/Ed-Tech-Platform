import {Section} from "../models/Section.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {Course} from "../models/Course.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SubSection } from "../models/SubSection.js";


const createSection = asyncHandler(async(req , res)=>{
  // data fetch 
   const {sectionName , courseId} = req.body;

  // validate
  if([sectionName,courseId].some((field)=>field?.trim()==="")){
    throw new ApiError(400 , "All field are required")
  }
  // create section 
  const newSection = await Section.create({sectionName})
  //update course with section
  const updatedCourseDetails = await Course.findByIdAndUpdate(
                    {_id:courseId},
                    {
                        $push:{
                            courseContent:newSection._id
                        }
                    },
                    {
                        new:true
                    },
                
                ).populate({
                  path:"courseContent",
                  
                  populate: {
                    path: "subSection",
                  }
                }).exec()
    // hw : use populate to replace section/subsection both in the updatedCourseDetails
  // resturn successfull response
  // console.log("updatedCourseDetails: ",updatedCourseDetails)
  return res
  
  .json(
    new ApiResponse(201,updatedCourseDetails,"Section is created")
  )
})

const updateSection = asyncHandler(async(req ,res )=>{
     // data input
     const {sectionName,sectionId,courseId} = req.body
     console.log("req.body: ",req.body)
        
      const section = await Section.findByIdAndUpdate(
                                   sectionId,
                                   {sectionName},
                                   {new:true}
                                  )

       const course = await Course.findById(courseId)
                                        .populate({
                                          path:"courseContent",
                                          populate:{
                                            path:"subSection",
                                          },
                                        }).exec();
     
   
    
     // return res
     return res
    
     .json(
        new ApiResponse(201,course,section)
     )


})

const deleteSection = asyncHandler(async(req,res)=>{
    // get id  -  assuming that we are sending Id in params
   
      const {sectionId , courseId} = req.body;

       await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})

    	const section = await Section.findById(sectionId);
		  console.log("sectionid, course id->",sectionId, courseId);
      if(!section){
        throw new ApiError(404 , "Section not found")
      }

      //delete sub section
		await SubSection.deleteMany({_id: {$in: section.SubSection}});

		await Section.findByIdAndDelete(sectionId);

    //find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

     //  todo: do we need to delete the entry from courseSchema ?
// return res
       return res
       
       .json(
        new ApiResponse(200,course,"Section deleted successfully")
       )

      
})

export {createSection , updateSection , deleteSection}