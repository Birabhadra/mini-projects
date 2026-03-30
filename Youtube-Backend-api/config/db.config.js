import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns"
dns.setServers(['8.8.8.8'])
dotenv.config()
export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully")

    }catch(err){
        console.log(`error occured ${err.message}`)
    }
}