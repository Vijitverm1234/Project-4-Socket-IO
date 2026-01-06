import Message from "../models/message.js";
import User from "../models/user.js";

import cloudinary from "../lib/cloudinary.js";
import {io,userSocketMap} from "../server.js"
export const getUserForSideBar=async(req,res)=>{
  try {
     const userId=req.user._id;
     const filteredUsers=await User.find({_id:{$ne:userId}}).select("-password")
     
     const unseenMessages={}
     const promises=filteredUsers.map(async(user)=>{
        const message=await Message.find({senderId:user._id,receiverId:userId,seen:false})
        if(message.length>0){
          unseenMessages[user._id]=message.length;
        }
     })
     await Promise.all(promises)
     res.json({success:true,users:filteredUsers,unseenMessages})

  } catch (error) {
    console.log("Error in getAllUser")
    res.json({message:"Error in getAllusers"})
  }
}


export const getMessages=async(req,res)=>{
    try {
        const {id:selectedUserId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({$or:[
            {senderId:myId,receiverId:selectedUserId},
            {senderId:selectedUserId,receiverId:myId}
        ]})
        await Message.updateMany({sendId:selectedUserId,receiverId:myId},{seen:true})
        res.json({success:true,messages})

    } catch (error) {
         console.log("Error in getAllUser")
    res.json({message:"Error in getAllusers"})
    }
}

export const markMessageAsSeen=async(req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}

export const sendMessages=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const receiverId=req.params.id;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
              const uploadResponse=await cloudinary.uploader.upload(image)
              imageUrl=uploadResponse.secure_url
        }
        const newMessage=await Message.create({
            senderId,receiverId,text,image:imageUrl
        })
         const receiverSocketId=userSocketMap[receiverId]
         if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
         }
        res.json({success:true,newMessage})
    } catch (error) {
        
    }
}