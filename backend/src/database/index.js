import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"
import express from "express"

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`db connected successfully :🥰 !! ${connectionInstance.connection.port} ` )
    } catch (error) {
        console.log("facing technical issue : ", error.message)
    }
}
export {connectDb}

// const connectDb = async () =>{
//     try{
//         const connectInstance  = await  mongoose.connect(`${process.env.MONGODB_URL}`)

//         console.log(`db connected successfully 🥰 || ${connectInstance.connection.port}`)

//     }catch(err){
//       console.log("facing technical issue in database folder 😠: ",err.message)
//     }
// }
//  export {connectDb}
