import express from "express"
const router = express.Router()
import { deleteAccount, getAllUserDetails, updateProfile, getEnrolledCourses,instructorDashboard } from "../controllers/Profile.js"


import { auth } from "../middleware/auth.js"


router.put("/updateProfile",auth, updateProfile)
router.delete("/deleteAccount" , auth,deleteAccount)
router.get("/getAllUserDetails", auth,getAllUserDetails)

 // ***** get enrolled course
 router.get("/getEnrolledCourses" ,auth, getEnrolledCourses)
 router.get("/instructorDashboard", instructorDashboard)
 
export default router