import { asyncHandler } from "../utils/asyncHandler.js";
import {SubSection} from "../models/SubSection.js";
import {Section} from "../models/Section.js";
import { ApiError } from "../utils/ApiError.js";
import { cloudinaryConnect } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";



const createSubSection = asyncHandler(async(req , res)=>{
       // fetch data from reqbody
       const {sectionId, title,description} = req.body
       console.log("req.body: ",req.body)
     
       //extarct file/video
       const video = req.files?.video
       console.log("req.files-:> ",req.files.video)
       // validation
       if ([sectionId, title, description].some((field)=>
    field?.trim()===""
    )){
        throw new ApiError(400, "string type field are required")
    }
    if(!video ){
        throw new ApiError(400, "video is required")
    }
    // if( !timeDuration ){
    //   throw new ApiError(400,"timeduration is required")
    // }
    // console.log(Array.isArray(video));
    console.log("video ",video)
       /// upload video to cloudinary
       const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)


      //  console.log("uploadDetails -> ",uploadDetails?.secure_url)
       // fetch url from cloudinary

       // create subsection
       const subSectionDetails = await SubSection.create({
         title:title,
         timeDuration:`${uploadDetails.duration}`,
         description:description,
         videoUrl:uploadDetails?.secure_url,
       })
      //  console.log("subSection details after uploaod on cloudinary-> ",subSectionDetails)
       // update section with this subsection
       const updatedSection =  await Section.findByIdAndUpdate({_id:sectionId},
                                {
                                    $push:{
                                        subSection:subSectionDetails._id
                                    }
                                },{new:true}).populate("subSection")
                                // hw : log  updateed section here after, adding populate query
       // return res
       console.log("updatedSections->",updatedSection)
       return res
      
       .json(
        new ApiResponse(201,updatedSection,"Sub Section created successfully")
       )

})

const updateSubSection = asyncHandler(async(req , res)=>{
        // data fetch

  const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    console.log("req/.body-> ",req.body)
    console.log("subSection-> ",subSection)

    if(!subSection){
        throw new ApiError(404,"subSection not found")
    }
     
         if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
        )
        console.log("uploadDetails ->",uploadDetails)

         subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json(
        new ApiResponse(200,updatedSection,"section updated successfully")
    )

})

const deleteSubSection = asyncHandler(async(req , res)=>{
     const {subSectionId , sectionId} = req.body

    const updatedSection1 = await Section.findByIdAndUpdate(
        {_id: sectionId},
        {
            $pull: {
                subSection : subSectionId,
            }
        }
     )
     console.log("updatedSecdtion1 -> ",updatedSection1)

 const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
   if(!subSection){
    throw new ApiError(404,"subSection not found")
   }
      // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )


    return res.json(
        new ApiResponse(200,updatedSection,"subSection deleted successfully")
    )

})


export{createSubSection,updateSubSection,deleteSubSection}
