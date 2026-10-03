import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import { asyncHandler } from "./asyncHandler.js"
import { ApiError } from "./ApiError.js"


const cloudinaryConnect = async()=>{
   try {
       cloudinary.config({
         cloud_name:process.env.CLOUD_NAME,
         api_key:process.env.API_KEY,
         api_secret:process.env.API_SECRET
       })
  //  console.log("name ",process.env.CLOUD_NAME)
  //  console.log("KAY ",process.env.API_KEY)
  //  console.log("SECRET ",process.env.API_SECRET)
       console.log(`cloudinary successfully connected 🥰`)
   } catch (error) {
     console.log(error)
     throw new ApiError(401,"facing technical issue during connected"|| error.message)
   }
}
export{cloudinaryConnect}