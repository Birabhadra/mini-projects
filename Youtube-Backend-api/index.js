import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import {connectDB} from "./config/db.config.js"
import userRoutes from "./routes/user.router.js"
import videoRoutes from "./routes/video.router.js"
import CommentRoutes from "./routes/comment.router.js"
dotenv.config()
const PORT=process.env.PORT  
const app=express()
app.use(bodyParser.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

app.use('/auth',userRoutes)
app.use('/video',videoRoutes)
app.use('/comment',CommentRoutes)
app.listen(PORT,()=>{
    console.log(`server is running at port http://localhost:${PORT}`)
    connectDB()
})
app.timeout = 600000; 