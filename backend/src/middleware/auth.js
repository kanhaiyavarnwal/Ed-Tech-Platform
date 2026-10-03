import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";



const auth = asyncHandler(async(req , res, next)=>{
      
        const token = req.cookies?.token || req.body?.token ||
        req.header("Authorization")?.replace("Bearer ","");
   //   console.log("after just token extract: ", token);
     if(!token){
        throw new ApiError(404 , "Token is not found")
     }
//   console.log("token in auth middleware: ",token)
//   console.log(".env token: ",process.env.JWT_SECRET)
     try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
      //   console.log("decodedtoken -> :",decodedToken)
        req.user = decodedToken
     }catch(err){
        throw new ApiError(401,"token is invalid")
     }
     next()

    
})

const isStudent = asyncHandler(async(req,res,next)=>{
      
        if(req.user.accountType !== "Student"){
            throw new ApiError(401, "this is protected route for student only")
        }
        next()

      
})

const isInstructor = asyncHandler(async(req,res,next)=>{
      
        if(req.user.accountType !== "Instructor"){
            throw new ApiError(401, "this is protected route for instructor only")
        }
        next()

    
})

const isAdmin = asyncHandler(async(req,res,next)=>{
      try{
        if(req.user.accountType !== "Admin"){
            throw new ApiError(401, "this is protected route for admin only")
        }
        next()

      }catch(err){
        throw new ApiError(500 , "user role cant be verified, please try again ")
      }
})

export{auth , isStudent , isInstructor , isAdmin}
