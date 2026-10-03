import express from "express"
const router = express.Router()
import { capturePayment ,verifySignature ,sendPaymentSuccessfullPayment , enrollStudents} from "../controllers/Payment.js"
import { auth, isStudent } from "../middleware/auth.js"






router.post("/capturePayment" ,auth,isStudent, capturePayment)
router.post("/verifySignature" ,auth,isStudent, verifySignature)
router.post("/sendEmailSuccessFullPayment",sendPaymentSuccessfullPayment)
router.post("/enrollStudent", enrollStudents)

export default router