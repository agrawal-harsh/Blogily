const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('../services/asyncHandler');
const {User} = require('../models');
const bcrypt = require('bcrypt');
const {getToken,getRefreshToken} = require('../services/auth');
const { default: mongoose } = require('mongoose');
const saltRounds = 9;

const handleRegisterUser = asyncHandler(async(req,res)=>{
    if(!req.body.username||!req.body.email||!req.body.password||!req.body.full_name){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Please gave all the required fields"})
    }
    const {username,email,password,full_name,bio,profile_picture} = req.body;
    let password_hash;
    await bcrypt.hash(password,saltRounds).then(pass => password_hash = pass);

    const user = await User.create({
        username,email,password_hash,full_name,bio,profile_picture
    })
    const token = getToken(user);
    res.status(StatusCodes.CREATED).json({message:"User successfully created",token,user:{...user._doc,password_hash:null}});
})

const handleLoginUser = asyncHandler(async(req,res)=>{
    const {email,username,password} = req.body;
    if(!password || (!email&&!username)){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Required email/username and password"});
    }
    let user;
    if(email){
        user = await User.findOne({email});
    }else{
        user = await User.findOne({username});
    }
    if(!user) return res.status(StatusCodes.NOT_FOUND).json({error:"User not found"});

    const result = await bcrypt.compare(password, user.password_hash);
    if(result){
        const token = getToken(user);
        user.password_hash = undefined; // Remove password hash from user object
        return res.status(StatusCodes.ACCEPTED).json({message:"Logged in successfully",token,user});
    } else {
        return res.status(StatusCodes.FAILED_DEPENDENCY).json({error:"Password does not match"});
    }
});
const handleGetUserData = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const user = await User.aggregate([
        {
            $match:{_id:new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup:{
                from:"blogs",
                localField:"_id",
                foreignField:"author_id",
                as:"blogs"
            }
        }
    ])
    if(user.length == 0){
        return res.status(StatusCodes.NOT_FOUND).json({error:"The user does not exist"});
    }
    res.status(StatusCodes.ACCEPTED).json({message:"Your request has been fullfilled",user})
})





module.exports = {handleRegisterUser,handleLoginUser,handleGetUserData};










