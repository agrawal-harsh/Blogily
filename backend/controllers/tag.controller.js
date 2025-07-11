const { StatusCodes } = require('http-status-codes');
const {Tag, Blog, Blog_tag} = require('../models');
const asyncHandler = require('../services/asyncHandler');


const handleFindAllPost = asyncHandler(async(req,res)=>{
    let tag = req.query.tags;
    console.log(req.query)
    if(!tag){
        const allBlogs = await Blog.find({})
        return res.status(StatusCodes.ACCEPTED).json({error:"Atleast one valid tag is required" ,blogs:allBlogs})
    }
    tag = tag.split(',');
    console.log(tag);
    const tag_ids = await Tag.aggregate([
        {$match:{name:{$in:tag}}},
        {$group:{_id:{$type:'$_id'},
        ids:{$push:'$_id'}
    }}
    ]);
    console.log(tag_ids[0].ids);
    const blogs = await Blog_tag.aggregate([
        {$match:{tag_id:{$in:tag_ids[0].ids}}},
        {$lookup:{
            from:'blogs',
            localField:'blog_id',
            foreignField:'_id',
            as:'blog'
        }},{
            $group:{_id:{$type:'$tag_id'},
                blogs:{$push:{$first:'$blog'}}
            }
        }
    ]);
    console.log(blogs[0].blogs)
    res.status(StatusCodes.ACCEPTED).json({message:"Search result is ready",blogs:blogs[0].blogs})

});


const handleGetAllTags = asyncHandler(async(req,res)=>{
    const tags = await Tag.find({});
    res.status(StatusCodes.ACCEPTED).json({message :"Your request is fullfilled" ,tags})
})


module.exports = {handleFindAllPost,handleGetAllTags};