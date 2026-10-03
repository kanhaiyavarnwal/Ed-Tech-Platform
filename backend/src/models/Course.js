import mongoose,{Schema} from 'mongoose'

const courseSchema  = new Schema (
    {
        courseName:{
            type:String,
            required:true,
            trim:true,

        },
        courseDescription:{
            type:String,
            required:true,
              trim:true,
        },
        instructor:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,

        },
        whatYouWillLearn:{
            type:String,
        },
        courseContent:[
            {
                type:Schema.Types.ObjectId,
                ref:"Section"
            }
        ],
        ratingAndReviews:[
            {
                type:Schema.Types.ObjectId,
                ref:"RatingAndReview"
            }
        ],
        price:{
            type:Number,
        },
        thumbnail:{
            type:String,
        },
        tag:{
            type:[String],
            required:true,
        },
        
        category:{
            type:Schema.Types.ObjectId,
            ref:"Category",
        },
        studentEnrolled :[
            {
                type:Schema.Types.ObjectId,
                required:true,
                ref:"User",

            }
        ],

        instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},

    }
)
export const Course = mongoose.model("Course", courseSchema)