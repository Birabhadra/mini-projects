import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import {connectDB} from "./config/db.config.js"
import userRoutes from "./routes/user.router.js"
dotenv.config()
const PORT=process.env.PORT  
const app=express()
app.use(bodyParser.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


app.listen(PORT,()=>{
    console.log(`server is running at port http://localhost:${PORT}`)
    connectDB()
})