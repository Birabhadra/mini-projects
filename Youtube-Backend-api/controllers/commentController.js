import Comment from "../models/comment.model.js";


const newComment = async (req, res) => {
    try {
        const { VideoId, commenttext } = req.body
        if (!VideoId || !commenttext) {
            return res.status(400).json({
                message: "VideoId and comment text are required"
            })
        }

        const newcomment = await Comment.insertOne({
            video_id: VideoId,
            commentText: commenttext,
            user_id: req.User._id
        })


    } catch (error) {
        return res.status(400).json({
            message: `Some unexpected error occured ${err.message}`

        })
    }
}
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user_id.toString() !== req.user._id) {
            return res.status(403).json({ error: "Unauthorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user_id.toString() !== req.user._id) {
            return res.status(403).json({ error: "Unauthorized to edit this comment" });
        }

        comment.commentText = commentText;
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getComments = async (req, res) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ video_id: videoId })
            .populate("user_id", "channelName logoUrl") // Populate user details
            .sort({ createdAt: -1 }); // Sort by newest comments first

        res.status(200).json({ comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default {
    newComment,
    updateComment,
    deleteComment,
    getComments
}