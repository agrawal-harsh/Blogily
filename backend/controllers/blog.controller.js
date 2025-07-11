const { StatusCodes } = require('http-status-codes');
const {Blog,Blog_tag, Tag, User,Comment, Like} = require('../models')
const asyncHandler = require('../services/asyncHandler');
const { default: mongoose } = require('mongoose');

const handleGetAllBlogs = asyncHandler(async(req,res)=>{
    const blogs = await Blog.aggregate([
        {      
            $lookup: {
                from: 'blog-tags',
                localField: '_id',
                foreignField: 'blog_id',
                as: 'blog_tags'
            }
        },
        { $unwind: { path: '$blog_tags', preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'tags',
                localField: 'blog_tags.tag_id',
                foreignField: '_id',
                as: 'tag_details'
            }
        },
        {
            $group: {
                _id: '$_id',
                title: { $first: '$title' },
                content: { $first: '$content' },
                author_id: { $first: '$author_id' },
                status: { $first: '$status' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                views_count:{$first:'$views_count'},
                tags: { $addToSet:{$first: '$tag_details'}}
            }
        },{
            $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author'
            }
        },{
            $sort:{createdAt:1}
        }
    ]);
    res.status(StatusCodes.ACCEPTED).json({message:"The request is fullfilled" , blogs})
})

const addTags = (tags,blog_id)=>{
        tags.map(async(tag)=>{
            const tag_id = (await Tag.findOne({name:tag}))._id;
            await Blog_tag.create({tag_id,blog_id});
        })
}

const handleCreateBlog = asyncHandler(async(req,res)=>{
    const email = req.user.email;
    console.log(email);
    const author_id = (await User.findOne({email}))._id;
    const {title,content,status,tags} = req.body;
    if(!title || !content){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Title and content are required fields"})
    }
    const blog = await Blog.create({author_id,title,content,status});
    if(tags){
        addTags(tags,blog._id);
    }
    res.status(StatusCodes.CREATED).json({message:"Blog is successfully created" ,blog});
})

const handleUpdateBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const user = req.user;
    if(!id){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Id is required to get the blog"})
    }
    const blog = Blog.find({_id:id});
    console.log(blog);
    const {title,content,tags} = req.body;
    if(!blog){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"User does not exist"});
    }
    if(blog.author_id != user.user_id){
        return res.status(StatusCodes.UNAUTHORIZED).json({error:"You are not authorised to perform this task"})
    }
    const newBlog = await Blog.findOneAndUpdate({_id:id},{title,content},{runValidation:true,new:true});
    await Blog_tag.deleteMany({blog_id:id});
    console.log(newBlog);
    addTags(tags,newBlog._id);
    res.status(StatusCodes.ACCEPTED).json({message:"The update request is fullfilled",blog:newBlog});
})

const handleDeleteBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const blog = await Blog.findOne({_id:id});
    if(!id || !blog){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"A valid blog id is required to perform given action"});
    }
    console.log(blog.author_id,req.user)
    if(blog.author_id != req.user._id){
        return res.status(StatusCodes.UNAUTHORIZED).json({error:"You are not authorized to perform the action"});
    }
    await Blog.findOneAndDelete({_id:id});
    await Blog_tag.deleteMany({blog_id:id});
    res.status(StatusCodes.ACCEPTED).json({message:"The blog is delete successfully"});
})

const handleGetBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const blog = await Blog.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(id)}},
        {$lookup:{
            from:'blog-tags',
            localField:'_id',
            foreignField:'blog_id',
            as:'blog_tags'
        }},
        {
            $unwind:{path:'$blog_tags',preserveNullAndEmptyArrays:true},
        },
        {
            $lookup:{
                from:'tags',
                localField:'blog_tags.tag_id',
                foreignField:'_id',
                as:'tag_details'
            }
        },
        {
            $group:{
                _id:'$_id',
                title: { $first: '$title' },
                views_count:{$first:'$views_count'},
                content: { $first: '$content' },
                author_id: { $first: '$author_id' },
                status: { $first: '$status' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                tags: { $push:{$first: '$tag_details'}},
                comments:{$push:'$comments'}
            }
        },
        {$lookup:{
            from:'comments',
            localField:'_id',
            foreignField:'blog_id',
            as:'comments'
        }},
        {
            $unwind:{path:'$comments',preserveNullAndEmptyArrays:true},
        },
        {
            $lookup:{
                from:'users',
                localField:'comments.user_id',
                foreignField:'_id',
                as:'comments.user'
            }
        },{
            $group:{
                _id:'$_id',
                title: { $first: '$title' },
                views_count:{$first:'$views_count'},
                content: { $first: '$content' },
                author_id: { $first: '$author_id' },
                status: { $first: '$status' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                tags: { $first: '$tags'},
                comments:{$push:'$comments'},
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'author_id',
                foreignField:'_id',
                as:'author'
            }
        }
    ]);
    const like = await Like.find({blog_id:id,user_id:req.user._id});
    if(like[0]){
        blog[0].isLiked = true;
    }else {
        blog[0].isLiked = false;
    }
    const like_count = await Like.find({blog_id:id});
    blog[0].like_count = like_count.length;
    console.log(blog);
    if(!blog[0]){
        return res.status(StatusCodes.NOT_FOUND).json({error:"The blog you are looking for does not exist"});
    }
    // console.log(blog[0].views_count)
    await Blog.findOneAndUpdate({_id:id},{views_count:Number(blog[0].views_count)+1})
    // console.log(id,blog)
    if(!id || !blog){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Require a valid blog id"});
    }
    res.status(StatusCodes.ACCEPTED).json({message:"Request is fullfilled",blog:blog[0]});
})



module.exports = {handleCreateBlog,handleGetAllBlogs,handleUpdateBlog,handleDeleteBlog,handleGetBlog} ;