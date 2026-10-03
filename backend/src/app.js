import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import fileUpload from "express-fileupload"
 import userRoutes from "./routes/userRoutes.js"
 import courseRoutes from "./routes/courseRoute.js"
 import profileRoutes from "../src/routes/profileRoutes.js"
 import paymentRoutes from "../src/routes/paymentRoutes.js"
 import contactRoutes from "../src/routes/contactRoutes.js"
import { cloudinaryConnect } from "./utils/cloudinary.js"
import { connectDb } from "./database/index.js"
import { ApiResponse } from "./utils/ApiResponse.js"
import { User } from "./models/User.js"
 dotenv.config({
     path: "./.env"
 })
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(express.urlencoded({extended:true, limit:"16KB"}))

app.use(cors({
   // origin:"http://localhost:3000",  // frontend url
    credentials:true,
}))
app.use(cookieParser({}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)


  app.use("/api/v1/user" , userRoutes)
  app.use("/api/v1/profile" , profileRoutes)
  app.use("/api/v1/course" , courseRoutes)

  app.use("/api/v1/payment",paymentRoutes)
  app.use("/api/v1/contact",contactRoutes)

  cloudinaryConnect()
  connectDb()
  .then(()=>{
    app.get("/" ,(req  , res)=>{
      return res
      .json(
        new ApiResponse(202,User,"your server is up running")
      )
    
    })
  
    app.listen(port , ()=>{
      console.log(`your port no is -> !! ${port}`)
    })
  })
  .catch((err)=>{
     console.log("facing technical issue in index.js  during runn the port")
  })
  


export default app