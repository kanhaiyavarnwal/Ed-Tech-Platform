import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Category} from "../models/Category.js"

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

const  createCategory = asyncHandler(async (req , res) =>{
     const {name , description} = req.body;
      // console.log("req.body ",req.body)
     if([name , description].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
     }

     const categoryDetails = await Category.create({
        name:name,
        description:description
     })
    //  console.log("categoryDetails : ",categoryDetails)

     return res
     
     .json(
        new ApiResponse(201,null,"Category created successfully")
     )
})

const getAllCategory = asyncHandler(async(req , res)=>{
    const allCategories = await Category.find({} , {name:true , description:true}).populate("courses")
   
    res
    .json(
        new ApiResponse(201, allCategories, "All category returnd successfully")
    )
})

const categoryPageDetails = asyncHandler(async(req ,  res)=>{
          // get category id 
          const {categoryId} = req.body;
          // console.log("req body: ",req.body)
          //get courses for specific categoryid
          const selectedCategory = await Category.findById(categoryId)
                                                         .populate({
                                                            path :"courses",
                                                            match:{status:"Published"},
                                                            populate:"ratingAndReviews"
                                                         }).exec()

                                                                            
          //validations
          if(!selectedCategory){
            return res
            .status(404)
            .json(
              new ApiResponse(404, null, "selected category not found")
            )
          }
          // Handle the case when there are no courses
          if(selectedCategory.courses.length === 0){
            console.log("no course found for the selected category")
            throw new ApiError(404,"no course found for the selected category")
          }
          // get courses for differrent categories
         
          const categoriesExceptSelected = await Category.find({
            _id:{$ne:categoryId},
          })

          let differentCategory = await Category.findById(
              categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
          ).populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
  //  console.log("Diiferent category _> ",differentCategory)

     // Get top-selling courses across all categories

       const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

         const allCourses = allCategories.flatMap((category) => category.courses)
         const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        // console.log("mostSellingCourses COURSE", mostSellingCourses)


       return res
      
       .json(
         new ApiResponse(200,
                          { selectedCategory,
                            differentCategory,
                            mostSellingCourses}
                        ,"fetch the category of courses")
       )


})

const deleteCategory = asyncHandler(async(req,res)=>{
  const {categoryId,categoryName} = req.body;
    console.log("req.body in delete category",req.body)
    console.log("c id: ",categoryId)
  
  console.log("name : ",categoryName)
  await Category.findByIdAndDelete(categoryId)

  return res.json(
    new ApiResponse(200,{},`Delete the category category name is ${categoryName} id is ${categoryId}`)
  )
})



export {createCategory ,deleteCategory, getAllCategory , categoryPageDetails}