import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    channelname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    logoId:{
        type:String,
        required:true
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedChannels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},
{timestamps:true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const userModel=mongoose.Model("User",userSchema)
export default userModel