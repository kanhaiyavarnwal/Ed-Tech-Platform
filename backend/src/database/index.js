import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"


const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`db connected successfully  !! ${connectionInstance.connection.port} ` )
    } catch (error) {
        console.log("facing technical issue : ", error.message)
        
    }
}
export {connectDb}


