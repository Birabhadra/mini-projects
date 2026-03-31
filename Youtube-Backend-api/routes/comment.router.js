import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import commentController from "../controllers/commentController.js";
const router=express.Router()

router.post('/new',checkAuth,commentController.newComment);

router.delete('/:commentId',checkAuth,commentController.deleteComment);

router.put('/:commentId',checkAuth,commentController.updateComment);

router.get('/:videoId',commentController.getComments)

export default router