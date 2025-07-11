const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('comment',commentSchema);