import express from "express"
import { createCourse ,
       getAllCourses ,
       getCourseDetails, 
       editCourse,
      getFullCourseDetails,
       deleteCourse,
       getInstructorCourses
    } from "../controllers/Course.js"
import { createRating, getAllRating, getAvgRating , } from "../controllers/RatingAndReviews.js"
import{ createSection, deleteSection, updateSection } from "../controllers/Section.js"
import {createSubSection, updateSubSection, deleteSubSection} from "../controllers/SubSection.js"

import { categoryPageDetails, createCategory, deleteCategory, getAllCategory} from "../controllers/Category.js"
import { auth, isAdmin, isInstructor, isStudent } from "../middleware/auth.js"
import { contactUs } from "../controllers/Contact.js"

const router = express.Router()

// ***************** created by only instructor****************//
//  // createCourse
router.post("/createCourse" ,auth,isInstructor, createCourse);
//     createSection
router.post("/section/createSection" ,auth,isInstructor, createSection)
// updateSection
router.put("/section/updateSection" ,auth,isInstructor, updateSection)
// deleteSection
router.delete("/section/deleteSection" ,auth,isInstructor, deleteSection)
// create subSection
router.post("/subsection/createSubSection" ,auth,isInstructor, createSubSection)
// updateSubsection
router.put("/subsection/updateSubSection" ,auth,isInstructor, updateSubSection)
// delete subSection
router.delete("/subsection/deleteSubSection" ,auth,isInstructor, deleteSubSection)

router.get("/getAllCourses" , getAllCourses);
router.put("/editCourse" , editCourse)
router.post("/getFullcourseDetails" ,auth,isInstructor, getFullCourseDetails)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse)
router.get("/getCourseDetails" , getCourseDetails);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)





 //*****************categary can only Created by admin  **********************/

router.post("/category/createCategory" ,auth,isAdmin, createCategory)
router.get("/getAllCategory" , getAllCategory)
router.post("/categoryPageDetails" , categoryPageDetails)
router.delete("/deleteCategory",deleteCategory)



 // ************** create rating and review ********************//
router.post("/createRatingAndReviews" ,auth,isStudent, createRating)
router.get("/getavgRating" , getAvgRating)
router.post("/getallRating" , getAllRating)




export default router