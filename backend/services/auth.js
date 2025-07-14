const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');

const getToken = ((user)=>{
    const {username,email,full_name,_id} = user;
    const token = jwt.sign({username,email,full_name,_id},process.env.ACCESS_TOKEN);
    return token;
})

module.exports = {getToken};