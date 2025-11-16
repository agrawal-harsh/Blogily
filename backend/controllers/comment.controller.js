const { Comment } = require('../models')
const { Blog, User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('../services/asyncHandler');
const { default: mongoose } = require('mongoose');


const handleGetAllComments = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Blog id is required to get the comments' });
    }

    const comments = await Comment.aggregate([
        {
            $match: { 'blog_id': new mongoose.Types.ObjectId(id) }
        }
        , {
            $lookup: {
                from: 'users',
                localField: "user_id",
                foreignField: '_id',
                as: 'user',
                pipeline: [{ $project: { password_hash: 0 } }]
            }
        },
        { $sort: { createdAt: 1 } }
    ]);
    // const comments = await Comment.find({blog_id:id});
    res.status(StatusCodes.OK).json({ comments });
})

const handleDeleteComment = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Comment id is required to delete the comment' });
    }

    const comment = Comment.findOne({ _id: id });
    if (!comment) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error is generated while finding your comment' });
    }

    if (comment.user_id != user.user_id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "You are not authorised to perform this task" })
    }

    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ deletedComment });
})

const handleAddComment = asyncHandler(async (req, res) => {
    const blog_id = req.params.id;
    const { content } = req.body;
    const user_id = req.user._id;
    if (!content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Comment should have some content" })
    }
    const blog = await Blog.findOne({ _id: blog_id });
    if (!blog) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Comment should be on a valid blog id" })
    }

    const comment = await Comment.create({
        blog_id,
        user_id,
        content
    })
    res.status(StatusCodes.CREATED).json({ message: "The comment is added to the blog", comment: { content: comment.content, user_id: comment.user_id, createdAt: comment.createdAt, user: [req.user] } });
}
)

module.exports = {
    handleGetAllComments,
    handleDeleteComment,
    handleAddComment
}