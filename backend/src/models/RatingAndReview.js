import mongoose,{Schema} from "mongoose"

const ratingAndReview = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    course:{
    type: Schema.Types.ObjectId,
    required:true,
    ref:"Course",
    index:true,
    },
})

export const RatingAndReview = mongoose.model("RatingAndReview",ratingAndReview)