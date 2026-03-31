import express from "express"
import {checkAuth} from "../middlewares/auth.middleware.js"
import videoController from "../controllers/videoController.js"
const router=express.Router()

router.post('/upload',checkAuth,videoController.uploadVideo)

router.post('/update/:id',checkAuth,videoController.updateVideo)

router.delete('/id/:id',checkAuth,videoController.deleteVideo)

router.get('/',videoController.getallVideos)

router.get('/myvideos',checkAuth,videoController.getmyVideos)

router.get('/watch/:id',checkAuth,videoController.videobyId)

router.get('/category/:category',videoController.videoBycategory)

router.get('/tags/:tag',videoController.videoByTag)

router.post('/like',checkAuth,videoController.likeVideo)
router.post('/dislike',checkAuth,videoController.dislikeVideo)


export default router;