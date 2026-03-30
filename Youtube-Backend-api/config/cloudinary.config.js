import {v2 as cloudinary} from "cloudinary";
import 'dotenv/config';
try{ 
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET

    })
}catch(err){
    console.log(`error occured ${err}`)
}

export default cloudinary