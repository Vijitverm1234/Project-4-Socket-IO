import mongoose from "mongoose";
 const connectDB=async()=>{
   try {
    const response=await mongoose.connect(`${process.env.MONGODB_URL}/chat-app-project-4`)
    if(response){
        console.log("DB connected 🥹")
    }
   } catch (error) {
       console.log(error)
   }
}
export default connectDB;