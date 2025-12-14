import express from "express"
import User from "../models/user.js";
export const protectRoute=async(req,res,next)=>{
   try {
      const token=req.header.token;
      const decode=jwt.verify(token,process.env.JWT_KEY)
      const user=await User.findId(decode._id).select("-password");
     if(!user){
        return res.json({success:false,message:"User not found"});
     }
     req.user=user;
     next();
   } catch (error) {
     return res.json({success:false,message:"Token || Controller problem"});
   }
}
