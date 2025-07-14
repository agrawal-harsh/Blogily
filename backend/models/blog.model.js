const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    status:{
        type:String
    },
    views_count:{
        type:Number,
        default:0
    },coverImage:{
        type:String,
        default:''
    }
},{timestamps:true})


module.exports = mongoose.model('blog',blogSchema);