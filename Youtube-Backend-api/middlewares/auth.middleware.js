import jwt from "jsonwebtoken"

export const checkAuth=async (req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({error:"No token is provided"})
        }
        const decodedUser=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decodedUser
        next()
    }catch(error){
        return res.status(400).json({
            message:`Some unexpected error occured ${error.message}`
        })
    }
}