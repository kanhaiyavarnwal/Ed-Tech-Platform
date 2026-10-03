
import {User} from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {mailSender} from "../utils/mailSender.js";
import bcrypt from "bcryptjs";

  const resetPasswordToken  = asyncHandler(async(req ,res)=>{
    
         // get emal from bode
         const  email = req.body.email;
         // validate
         const user = await User.findOne({email})
        //  console.log("user for resetPassworToken ->",user)
         if(!user){
            throw new ApiError(401,"Your email is not registered with us")
         }
         //generatetoken for confirmation whi link hai ya koi or 
         const token  = crypto.randomUUID();
        //  console.log("Generated token ->",token)
         // update user by adding token and expiration time
          const updatedDetails = await User.findOneAndUpdate(
                                             {email:email},
                                             {
                                                token:token,
                                                resetPasswordExpires : Date.now() + 5 *60*1000,
                                             },
                                             {
                                                new:true,
                                             }
                        
          ) 
         //create url
        //  console.log("updatedDetails -> :",updatedDetails)
         
         const url = `http://localhost:3000/update-password/${token}`
        //  console.log("generated url -> :",url)
         // send mail containing the url
           await mailSender(email,
            "Password resetLink",
            `password reset Link : ${url}`)
         //return res
         return res
         
         .json(
            new ApiResponse(200,"Email sent successfully, please check email")
          )
    


    
  })

  // reset password
  const resetPassword = asyncHandler(async(req ,res)=>{
   
     // data fetch
     const {password,confirmPassword,token} = req.body;
     console.log("resetPassword route-> req.body ",req.body)
     // validations
     if(password !== confirmPassword){
         throw new ApiError(403,"password not match")
     }
     // get user details from db using token (inshort token se hm pta krenge user or user m new password ko update krenge)
     const userDetails  = await User.findOne({token:token})
    // console.log("reset password route  userDetails ",userDetails)
 
     // if no entry - invalid token
     if(!userDetails){
         throw new ApiError(404,"token is invalid")
     }
     // check expiry of token
     if(userDetails.resetPasswordExpires < Date.now() ){
         throw new ApiError(401 , "token is expires regenerate the token")
     }
     //hashed the passord
     const hashedPassword = await bcrypt.hash(password,10)
 
     //update the password
     await User.findOneAndUpdate(
         {token:token},
         {password:hashedPassword},
         {new:true},
     )
     // return response
     return res
     .status(200)
     .json(
         new ApiResponse(201,"password reset successfully")
     )
   

  })

  export {resetPasswordToken , resetPassword }