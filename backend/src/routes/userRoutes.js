import express from "express"
import { sentOtp, signUp ,login ,changePassword} from "../controllers/Auth.js"
import { resetPasswordToken,resetPassword } from "../controllers/resetPassword.js"

import { auth } from "../middleware/auth.js"

const router = express.Router()

// ********* route for authentication
router.post("/sentotp" ,sentOtp)
router.post("/signup" , signUp)
router.post("/login" , login)


// *********** route for change password

router.post("/changePassword" ,auth, changePassword)


   // **************  route for resetpassword


router.post("/resetPasswordToken" , resetPasswordToken)
router.post("/resetPassword", resetPassword)




export default router



