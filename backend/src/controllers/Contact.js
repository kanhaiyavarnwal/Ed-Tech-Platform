
import { asyncHandler } from "../utils/asyncHandler.js";
import { mailSender } from "../utils/mailSender.js";
import { contactUsEmail } from "../mail/templates/contactFormRes.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const contactUs = asyncHandler(async(req ,res)=>{
     const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)

  const emailRes = await mailSender(
                         email,
                        "Your data send Successfully",
                         contactUsEmail(
                            email,
                            firstname,
                        lastname,
                        message,
                        phoneNo,
                        countrycode,
                        )
        )

     console.log("Email Res ", emailRes)
      // return emailRes;
     return res.json(
        new ApiResponse(200,"email send successfully")
     )


})
export {contactUs}