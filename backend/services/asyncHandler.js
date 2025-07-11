const { StatusCodes } = require("http-status-codes");

const asyncHandler = (fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Their is some internal error"});
        }
    }
}

module.exports = asyncHandler