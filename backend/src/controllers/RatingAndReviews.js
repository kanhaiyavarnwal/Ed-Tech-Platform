import {RatingAndReview} from "../models/RatingAndReview.js"
import {Course} from "../models/Course.js"
import {User} from "../models/User.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createRating = asyncHandler(async(req , res)=>{
    // get userid
    const {userId} = req.user.id
   
    //fetchdata from req body
    const{rating , review , courseId} = req.body
    // check if user is enrolled or not 
    const courseDetails = await Course.findById(
                                    {_id:courseId, 
                                    studentEnrolled: 
                                    {$elemMatch:{$eq: userId}}

                                    }
    )
        if(!courseDetails){
            throw new ApiError(404,"student is not enrolled the course")
        }
    // check if user already review the course
     const alreadyReview = await RatingAndReview.findOne(
                                             {user:userId,
                                                course:courseId
                                             }
     )
     if(alreadyReview){
        return res
        .status(403)
        .json(403,{},"Course is already reviewed by the user")
     }
     // create rating and review
        const ratingReview = await RatingAndReview.create({
              rating , review ,
              course:courseId,
              user:userId
        })
    //update course with rating and review
  const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                     $push:{
                                        ratingAndReview:ratingReview._id
                                     }
                                    },{new:true}
    )
    // console.log("after added rating and reviews: ",updatedCourseDetails)
    //return res
    return res
    
    .json(
        new ApiResponse(201,{ratingReview}, "rating and review cretede succeessfully")
    )

    
})

// get average rating
  const getAvgRating = asyncHandler(async(req , res)=>{
    // get course id
     const courseId = req.body.courseId;
    // calculate avg rating
    const result = await RatingAndReview.aggregate([
        {
            $match:{
                course: new mongoose.Types.ObjectId(courseId)
            },
        },
        {
            $group:{
                _id:null,  // null indicate all the thisng is group
                averageRating: {$avg:"$rating"}

            }
        }
    ])
    if(result.length > 0){
       return res 
    .status(200)
    .json(
        new ApiResponse(200,
            { averageRating: result[0].averageRating},
                "review exists")
    )
    }
// if no rating is given 
    return res
    
    .json(
        new ApiResponse(200, {averageRating:0}, "average rating is 0 ,  no rating given till now")
    )

  })

  // get all rating 
  const getAllRating = asyncHandler(async(req , res)=>{
     const allreview = await RatingAndReview.find({})
                                            .sort({rating: "desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName  email image",
                                            })
                                            .populate({
                                                path:"Course",
                                                select:"courseName"
                                            }).exec()

          return res
          .json(
            new ApiResponse(200,{allreview},"All review fetch successfully")
          )                                  
  })

  export {createRating , getAvgRating , getAllRating}

