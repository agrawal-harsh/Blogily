const { default: mongoose } = require("mongoose");


const likeSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'},
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})


module.exports = mongoose.model('like',likeSchema);