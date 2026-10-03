import {Profile} from "../models/Profile.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/User.js"
import {Course} from "../models/Course.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import  {CourseProgress} from "../models/CourseProgress.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";


const updateProfile = asyncHandler(async(req , res)=>{
    // get data
    const {dateOfBirth="", about="", gender, contactNumber,firstName,lastName} = req.body;
  //  console.log("req body ",req.body)
    //get userid
    const id = req.user?.id
    // console.log("id in upadte profile ",id)
    //validation
    if([gender , contactNumber , id].some((field)=>
    field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }
    //find profile
    const userDetails = await User.findById(id)
    // console.log("inside profile userDetails ", userDetails)
    const profileId = userDetails.additionalDetails
    // console.log("inside profile profileid",profileId)
    const profileDetails = await Profile.findById(profileId)
    // console.log("profile details profileDetails",profileDetails)
    //update profile
    profileDetails.gender = gender
    profileDetails.about = about
    profileDetails.contactNumber = contactNumber
    profileDetails.dateOfBirth = dateOfBirth
   
    await profileDetails.save()
    // console.log("inside profile controlller profile after update ",profileDetails)
    //return res
    const updatedUser = await User.findById(id)
    .populate("additionalDetails");
     updatedUser.password=undefined;
    return res
    
    .json(
        new ApiResponse(200, {updatedUser,profileDetails}, "Profile updated successfully")
    )
})

const deleteAccount = asyncHandler(async(req , res)=>{
        // getid
        const id = req.user?.id;
// console.log("id: ",id)
        /// validation
        const userDetails = await User.findById(id)
        // console.log("userdetails : ",userDetails)
        if(!userDetails){
            throw new ApiError(404,"user not found")
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        //todo for delete also unenrolled user  form all enrolled course
        // explore crone job
        // delete user 
        await User.findByIdAndDelete({_id:id})
        
        // // return res
        return res
      
        .json(
              new ApiResponse(200,null,"User Deleted Successfully")
        )
        //
})

const getAllUserDetails = asyncHandler(async(req ,res)=>{
    // get id
    const id = req.user?.id
    // console.log("alldetails -> ",id)
    // validate and get userDetails
    const userDetails  = await User.findById(id).populate("additionalDetails")
    // //return res
    // console.log("all user details ",userDetails)
    
    return res
    
    .json(
        new ApiResponse(200,userDetails,"fetch all user data")
    )


})

   const getEnrolledCourses = asyncHandler(async(req ,res)=>{
    // console.log("req.user: ",req.user)
      const userId = req.user?.id
      let  userDetails = await User.findOne({
              _id: userId,
      }).populate({
        path:"courses",
        populate:{
            path: "courseContent",
            populate:{
                path:"subSection"
            }
        }
      }).exec()
    //  console.log("user details in backend : ",userDetails )
      userDetails = userDetails.toObject()
      var SubSectionLength = 0

      for(var i =0; i< userDetails.courses.length ; i++){
        let totalDurationInSeconds = 0
        SubSectionLength = 0
         for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubSectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length // SubSection change to subSection
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })

         courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubSectionLength) * 100 * multiplier
          )
          //  / multiplier
      }
    
      }

     if(!userDetails){
        throw new ApiError(400,`could not find the user with ${userDetails}`)
     }
     return res
     
     .json(
        new ApiResponse(200,userDetails.courses,"all the courses  student enrolled")
     )

   }) 



   const instructorDashboard = asyncHandler(async(req  , res)=>{
    const courseDetails = await Course.find({instructor : req.user?.id})

    const courseData = courseDetails.map((course)=>{
        const totalStudentEnrolled = course.studentsEnrolled.length
        const totalAmountGenerate = totalStudentEnrolled * course.price

       // create a new object with the addittional fields
       const courseDateWithState = {
        _id: course._id,
        courseName:course.courseName,
        courseDescription:courseDescription,
        //include other properties as needed
        totalStudentEnrolled,
        totalAmountGenerate,
       }
    return courseDateWithState

    })
    return res
    
    .json(200,{courses:courseData},"created instructor dashboard")
   })

export {updateProfile , deleteAccount , getAllUserDetails,getEnrolledCourses,instructorDashboard}