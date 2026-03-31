import "dotenv/config"
import cloudinary from '../config/cloudinary.config.js'
import User from '../models/user.model.js'
import jwt from "jsonwebtoken"
async function signUp(req,res) {
    try{
        const {channelname,email,password,phone}=req.body
        if(!channelname||!email||!password||!phone){
            return res.status(400).json({
                message:"channelname,phone,email and password are required"
            })
        }
        const findUser=await User.findOne({
            email:email
        })
        console.log(findUser)
        if (findUser){
            return res.status(400).json({
                message:"User already exists, please login"
            })
        }
        const uploadImage=await cloudinary.uploader.upload(
            req.files.logo.tempFilePath
        )
        const newUser=new User({
            channelname:channelname,
            email:email,
            password:password,
            phone:phone,
            logoUrl:uploadImage.secure_url,
            logoId:uploadImage.public_id
        })

        const user=await newUser.save()
        res.status(200).json({
            message:"User signed up successfully",
            user:user
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:`Some unexpected error occured ${err.message}`

        })
    }
}
async function login(req,res){
    try{
        const {email,password}=req.body;
        if (!email||!password){
            return res.status(400).json({
                message:"Please enter email and password"
            })
        }
        const checkUser=await User.findOne({
            email:email
        })
        if (!checkUser){
            return res.status(400).json({
                message:"User doesn't exist please signup"
            })
        }
        const isvalidPass=await checkUser.comparePassword(password)
        if (!isvalidPass){
            return res.status(400).json({
                message:"please enter correct password"
            })
        }
        const token=await jwt.sign({
            _id:checkUser._id,
            channelname:checkUser.channelname,
            email:checkUser.email,
            phone:checkUser.phone,
            logoId:checkUser.logoId
            
        },process.env.JWT_SECRET,{expiresIn:"3d"})
        res.status(200).json({
            _id:checkUser._id,
            channelname:checkUser.channelname,
            email:checkUser.email,
            phone:checkUser.phone,
            logoId:checkUser.logoId,
            logoUrl:checkUser.logoUrl,
            subscribers:checkUser.subscribers,
            subscribedChannels:checkUser.subscribedChannels,
            token:token

        })
    }catch(error){
        return res.status(400).json({
            message:`Unexpected error occured ${error.message}`
        })
    }
}


export default{
    signUp,
    login
}