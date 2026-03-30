import cloudinary from '../config/cloudinary.config.js'
import User from '../models/user.model.js'
async function signUp(req,res) {
    const uploadImage=await cloudinary.uploader.upload(
        req.file.logo.tempFilePath
    )
    const newUser=new User({
        cha
    })
    
}