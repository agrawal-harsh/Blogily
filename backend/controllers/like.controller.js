const { StatusCodes } = require('http-status-codes');
const { Like, Blog, User } = require('../models');
const { default: mongoose } = require('mongoose');
const asyncHandler = require('../services/asyncHandler');

const handleGetAllLikes = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.find({ _id: id });
    if (!id || !blog) {
        return req.status(StatusCodes.BAD_REQUEST).json({ error: "A Valid blog id is required" });
    }
    const likes = await Like.aggregate([
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
        },]);
    res.status(StatusCodes.ACCEPTED).json({ message: "Request is fullfilled", likes })
})
const handleToggleLike = asyncHandler(async (req, res) => {
    const start = Date.now();
    const user_id = req.user._id;
    const blog_id = req.params.id;
    const blog = await Blog.findById(blog_id);
    if (!blog_id || !blog) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Require a valid blog_id" })
    }
    const oldLike = await Like.findOne({ user_id, blog_id })
    if (!oldLike) {
        const like = await Like.create({
            user_id,
            blog_id
        })
        res.status(StatusCodes.CREATED).json({ message: "Like successfully created", like });
    } else {
        await Like.findOneAndDelete({ _id: oldLike._id });
        res.status(StatusCodes.ACCEPTED).json({ message: "Like is removed" });
    }
})

module.exports = { handleGetAllLikes, handleToggleLike };