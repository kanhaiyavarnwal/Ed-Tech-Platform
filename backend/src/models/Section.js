   
   import mongoose,{Schema}from "mongoose"

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[
        {
            type: Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
})

export const Section = mongoose.model("Section",sectionSchema)