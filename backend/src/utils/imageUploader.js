import {v2 as cloudinary} from "cloudinary"

import { ApiError } from "./ApiError.js";

const uploadImageToCloudinary = async ( file , folder ,height ,quality) =>{

try {
         const options = {folder};
        if(height) {
            options.height = height;
        }
        if(quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";
        //  console.log("checkin options ",options)
        //  console.log("file.tempFilePath: ",file.tempFilePath)
        //  console.log("file jo bolrha hai missing hai  ",file)
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        // console.log("result ",result) 
        return result;
} catch (error) {
    console.log(error)
    throw new ApiError(403,error.message)
}
}

export{uploadImageToCloudinary}