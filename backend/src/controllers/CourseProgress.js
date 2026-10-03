import Course from "../models/Course.js"
import Section from "../models/Section.js"
import SubSection from "../models/SubSection.js"
import CourseProgress  from "../models/CourseProgress.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const updateCourseProgress = asyncHandler(async(req , res)=>{
    const {courseId , subsectionId} = req.body

      const userId = req.user.id

        const subsection = await SubSection.findById(subsectionId)

        if(!subsection){
            throw new  ApiError(404,"subSection not found")
        }

        // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if(!courseProgress){
        throw new ApiError(404,"course progress does not exists")
    }else{
         // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        throw new ApiError(400,"Subsection alredy completed")
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId)
    }

    await courseProgress.save()

    return res
    
    .json(
        new ApiResponse(200,"course progress updated")
    )


})

export {updateCourseProgress}