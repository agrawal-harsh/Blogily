const  mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
  username :{
    type:String,
    required:true,
    unique:true
},
  email :{
    type:String,
    required:true,
    unique:true
},
  password_hash :{
    type:String,
    required:true
  },
  full_name:{
    type:String,
    required:true
  },
  bio :{
    type:String,
  },
  profile_picture :{
    type:String,
  },
  is_active :{
    type:Boolean,
    default:false,
}
})

module.exports = mongoose.model('user',userSchema);