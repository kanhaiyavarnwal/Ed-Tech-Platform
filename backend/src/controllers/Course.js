import { cloudinaryConnect } from "../utils/cloudinary.js";
import {Course} from "../models/Course.js"
import { Section } from "../models/Section.js";
import {Category} from "../models/Category.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { User } from "../models/User.js";
import {convertSecondsToDuration} from "../utils/secToDuration.js"
import {SubSection} from "../models/SubSection.js"

const createCourse = asyncHandler(async(req , res)=> {
            // fetch data
            const userId = req.user?.id;
            // console.log("userId :",userId)
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
        } = req.body
    //  console.log("its in create course body",req.body)
    //  console.log("userId Instructor ",userId)
    const thumbnail = req.files?.thumbnailImage
  //  console.log("thumbnael Image-> ",thumbnail)
    
    // Convert the tag and instructions from stringified Array to Array
      const tag = JSON.parse(_tag);
      const instructions = JSON.parse(_instructions);

        // console.log("tag ", tag)
        // console.log("instructions ", instructions)
        // console.log("req files",req.files)
    // validations
   if(  
    !courseName  ||
     !courseDescription ||
     ! whatYouWillLearn||
      !price ||
      !tag.length ||
      !category ||
      !thumbnail  ||
      !instructions.length
    ){
      throw new ApiError(400,"All Field are required")
    }

    if(!status  || status === undefined){
      status = "Draft"
    }
    // check who are instructor 
      
    const instructorDetails = await User.findById(userId,{
                                         accountType:"Instructor",
    })
    if(!instructorDetails){
      throw new ApiError(404,"Instructor details not found")
    }
    
    // console.log('instructorDetaisl: ',instructorDetails)

    // here the category is id  if not clear then -> check now your course model 
    const categoryDetails = await Category.findById(category)
    if(!categoryDetails){
         throw new ApiError(404, "category details not found")
    }

  //   console.log("inside create category categoryDetails ",categoryDetails)
  //  console.log("before the uploadimage",thumbnail.mimetype)

    // upload on cloudinary
    const thumbnailImage  = await uploadImageToCloudinary(
      thumbnail ,
      process.env.FOLDER_NAME)
      if(!thumbnailImage){
        throw new ApiError(404,"image not found")
      }
      //    console.log("after the uploadimage")
      // console.log("uploaded image url ",thumbnailImage.secure_url)
    // create an entry for new course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })
    // console.log("insite create course newCourse->",newCourse)
    // add the new course to the  userSchema of instructor

    await User.findByIdAndUpdate({_id:instructorDetails._id},
        {
            $push:{
                courses: newCourse._id,
            }
        },{new:true},
    ) 
    
    // add the course to the category
     const categoryDetails2 = await Category.findByIdAndUpdate(
                        {_id: category},
                        {$push:{
                          courses: newCourse._id
                        }},{new:true}
     )

    //  console.log("categoryDetails2-> ",categoryDetails2)

    return res
 
    .json(
        new ApiResponse(201, newCourse, "Course created successfully")
    )

})


const editCourse = asyncHandler(async(req, res)=>{

    const {courseId} = req.body;

     const updates = req.body
    const course = await Course.findById(courseId)

  if(!course){
    throw new ApiError(404,"course not found")
  }

  // If Thumbnail Image is found, update it
    if (req.files) {
      // console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

  for (const key of Object.keys(updates)) {
    if (key === "tag" || key === "instructions") {
      course[key] = JSON.parse(updates[key]);
    } else {
      course[key] = updates[key];
    }
  }

     await course.save()


      const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

  return res.json(
    new ApiResponse(200,updatedCourse , "Course updated successfullt")
  )



})

const getAllCourses = asyncHandler(async(req ,res )=>{
    const allCourses = await Course.find({status:"Published"},{courseName:true,

                                            price:true,
                                            thumbnail:true,
                                            instructor:true,
                                            ratingAndReviews:true,
                                            studentsEnrolled:true,
    }).populate("instructor").exec()

    return res.status(200)
    .json(
        new ApiResponse(201,{allCourses}, "All course fetch successfully")
    )

})

const getCourseDetails = asyncHandler(async(req,res)=>{
    // get id
    const {courseId} = req.query
    // console.log("req.body ",req.body)
    // find courseDetails
    const courseDetails = await Course.findById(
                                                {_id:courseId}
    ).populate(
        {
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        }
    ).populate("category")
    .populate("ratingAndReviews")
    .populate({
        path:"courseContent",
        populate:{
            path:"subSection"
            // select:"-videoUrl"
        },
    }).exec()
    // validations
     console.log("all course details : ",courseDetails)
    if(!courseDetails){
        throw new ApiError(400,`could not find the course with ${courseId}`)
    }
 console.log("all course details : ",courseDetails)
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    // console.log("all course details : ",courseDetails)
    // console.log("total duration of this course details : ",totalDuration)

    return res
   
    .json(
        new ApiResponse(200,{totalDuration, courseDetails}, "course details fetch successfully")
    )


})

const getFullCourseDetails = asyncHandler(async(req , res) =>{
  
    // console.log("req.body: ",req.body)
  const {courseId} = req.body
    const userId = req.user?.id

    const courseDetails = await Course.findOne(
        {_id:courseId},
    ).populate({
        path:"instructor",
        populate:{
            path:"additionalDetails",
        },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
        path:"courseContent",
        populate:{
            path:"subSection",
        }
    }).exec()

let courseProgressCount = await Course.findOne({
      courseID: courseId,
      userId: userId,
    })

       console.log("courseProgressCount : ", courseProgressCount)
       

       if(!courseDetails){
        throw new ApiError(400,`could not find courseDetails for this id : ${courseId}`)
       }

        let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


     return res
   
     .json(
        new ApiResponse(200,
            {courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
        },
        "Full course details")
     )

})

  const getInstructorCourses = asyncHandler(async(req , res)=>{
      const instructorId = req.user?.id

      // find all course belonging to the user
   
const allCourses = await Course.find();


      const instructorCourses = await Course.find({instructor: instructorId})
                                                  .sort({created: -1})

             return res
            
             .json(
                new ApiResponse(200,instructorCourses,"get all instructor courses")
             )                                     
  })

const deleteCourse = asyncHandler(async(req , res)=>{
    const {courseId} = req.body

    
    const course = await Course.findById(courseId)

    if(!course){
        throw new ApiError(404,"course not found")
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

     // Delete sections and sub-sections
   
    const courseSections = course.courseContent
    
    for(const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      
      if (section) {
              const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }


           // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res
   
    .json(
        new ApiResponse(200,"course deleted successfully")
    )


})

export {createCourse , 
    editCourse , 
    getAllCourses , 
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse
}