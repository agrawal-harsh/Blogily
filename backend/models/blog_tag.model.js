const { default: mongoose } = require("mongoose");

const blogTagSchema = mongoose.Schema({
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'
    },
    tag_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tag'
    }
})

module.exports = mongoose.model('blog-tag',blogTagSchema)