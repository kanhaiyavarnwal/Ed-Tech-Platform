import mongoose,{Schema} from "mongoose"

const courseProgress = new Schema(
    {
        courseId:{
            type:Schema.Types.ObjectId,
            ref:"Course"
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:"user"
        },
        completedVideos:[
            {
                type:Schema.Types.ObjectId,
                ref:"SubSection"
            }
        ]
    }
)
export const CourseProgress = mongoose.model("CourseProgress",courseProgress)