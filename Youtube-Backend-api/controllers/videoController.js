import mongoose from "mongoose"
import User from "../models/user.model.js"
import Video from "../models/video.model.js"
import cloudinary from "../config/cloudinary.config.js"


const uploadVideo=async(req,res)=>{
    try{
        const {title,description,category,tags}=req.body
        if(!title||!description||!category||!tags){
            return res.status(400).json({
                message:"title,description,category and tags are mandatory for uploading"
            })
        }
        if(!req.files||!req.files.Video||!req.files.thumbnail){
            return res.status(400).json({
                message:"Please attach  your video and thumbnail"
            })
        }
        console.log("req recieved")
        const videoUpload=await cloudinary.uploader.upload(req.files.Video.tempFilePath,{
            resource_type:"video",
            folder:"videos"
        })
        console.log("Video uploaded")
        const thumbnailUpload=await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
            folder:"thumbnails"
        })
        console.log("Thumbnail uploaded")
        const newVideo=new Video({
            title:title,
            description:description,
            user_id:req.user._id,
            videoUrl:videoUpload.secure_url,
            thumbnailUrl:thumbnailUpload.secure_url,
            thumbnailId:thumbnailUpload.public_id,
            tags:tags?tags.split(","):[],
            category:category
        })
        const videoupload=await newVideo.save()
        res.status(201).json({
            message:"Video uploaded successfully",
            video:videoupload
        }) 


    }catch(error){
        console.log(error)
        return res.status(400).json(`Unexpected error ${error.message}`)
    }

}

const updateVideo=async(req,res)=>{
    try{
        const {title,description,category,tags}=req.body
        const videoId=req.params.id
        const video=await Video.findOne({
            _id:videoId
        })
        if (!video){
            return res.status(400).json({
                message:"Video not found"
            })
        }
        if (video.user_id.toString()!==req.user._id){
            return res.status(403).json({
                message:"You are not authorized to update this video"
            })
        }
        if (req.files && req.files.thumbnail){
            await cloudinary.uploader.destroy(video.thumbnailId)
            const thumbnailUpload=await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
                folder:"thumbnail"
            })
            video.thumbnailUrl=thumbnailUpload.secure_url,
            video.thumbnailId=thumbnailUpload.public_id
        }
        video.title=title||video.title;
        video.description=description||video.description,
        video.category=category||video.category,
        video.tags=tags?tags.split(','):video.tags
        await video.save()
        return res.status(200).json({
            message:"Video updated successfully"
        })
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)
    }
    
}
const deleteVideo=async(req,res)=>{
    try{
        const videoId=req.params.id
        const video=await Video.findOne({
            _id:videoId
        })
        if (!video){
            return res.status(400).json({
                message:"Video not found"
            })
        }
        if (video.user_id.toString()!==req.user._id){
            return res.status(403).json({
                message:"You are not authorized to delete this video"
            })
        }
        await cloudinary.uploader.destroy(video.thumbnailId)
        await cloudinary.uploader.destroy(video.videoUrl,{resource_type:"video"})
        await Video.findByIdAndDelete(videoId)
        return res.status(200).json({
            message:"Video deleted successfully"
        })
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)
    }
}

const getallVideos=async(req,res)=>{
    try{
        const videos=await Video.find().sort({createdAt:-1})
        return res.status(200).json({
            message:"Videos fetched successfully",
            videos:videos
        })
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)
    }

}

const getmyVideos=async(req,res)=>{
    try{
        const videos=await Video.find({user_id:req.user._id})
        return res.status(200).json({
            message:"Videos fetched successfully",
            videos:videos
        })
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)        
    }
}

const videobyId=async(req,res)=>{
    try{
        const videoId=req.params.id
        const userId=req.user._id
        const video=await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet:{viewedBy:userId},
            },
            {new:true}
        );
        if (!video){
            return res.status(400).json({
                message:"Video not found"
            })
        }
        return res.status(200).json({
            message:"Video fetched successfully",
            video:video
        })

    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)        
    }

}
const videoBycategory=async(req,res)=>{
    try{
        const videos=await Video.find({category:req.params.category}).sort({createdAt:-1})
        res.status(200).json({
            videos:videos
        })
        
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)

    }
}

const videoByTag=async(req,res)=>{
    try{
        const tag=req.params.tag
        const videos=await Video.find({tags:tag}).sort({createdAt:-1})
        res.status(200).json({
            message:"Videos fetched successfully",
            videos
        })
    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)        
    }
}
const likeVideo=async(req,res)=>{
    try{
        const {videoId}=req.body
        if (!videoId){
            return res.status(400).json({
                message:"Video id is required"
            })
        }
        await Video.findByIdAndUpdate(videoId,{
            $addtoset:{likedBy:req.user._id},
            $pull:{dislikedBy:req.user._id}
        });
        res.status(200).json({
            message:"Liked the video"
        })

    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)        
    }
}
const dislikeVideo=async(req,res)=>{
    try{
        const {videoId}=req.body
        if (!videoId){
            return res.status(400).json({
                message:"Video id is required"
            })
        }
        await Video.findByIdAndUpdate(videoId,{
            $addtoset:{dislikedBy:req.user._id},
            $pull:{likedBy:req.user._id}
        });
        res.status(200).json({
            message:"disliked the video"
        })

    }catch(error){
        return res.status(400).json(`Unexpected error ${error.message}`)        
    }
}
export default {
    uploadVideo,
    updateVideo,
    deleteVideo,
    getallVideos,
    getmyVideos,
    videobyId,
    videoBycategory,
    videoByTag,
    likeVideo,
    dislikeVideo
}