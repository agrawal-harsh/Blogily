const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const protect = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const user = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.FAILED_DEPENDENCY).json({message:"Your token has created an error",error})
    }
}
module.exports = protect;