
// import dotenv from "dotenv"
// import { User } from "./models/User.js"
// import { ApiResponse } from "./utils/ApiResponse.js"
// import {connectDb} from "../src/database/index.js"
// import {app} from "./app.js"
// import { cloudinaryConnect } from "./utils/cloudinary.js"

// dotenv.config({
//     path: "./.env"
// })
// const port = process.env.PORT || 4000
// cloudinaryConnect()

// connectDb()

// .then(()=>{
//   app.get("/" ,(req  , res)=>{
//     return res
//     .json(
//       new ApiResponse(203,{User},"your server is up running")
//     )
  
//   })

//   app.listen(port , ()=>{
//     console.log(`your port no is -> !! ${port}`)
//   })
// })
// .catch((err)=>{
//    console.log("facing technical issue in index.js  during runn the port")
// })

