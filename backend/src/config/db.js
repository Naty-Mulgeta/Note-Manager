import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log("MONGODB Connected successfully")  
    } catch (error) {
        console.log("Error connecting to MONGODB",error)
        process.exit(1) //1 means exit with failure 0=sucess
    }
}