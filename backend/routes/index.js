const blogRouter = require('./blog.routes');
const commentRouter = require('./comment.routes');
const likeRouter = require('./like.routes');
const uploadRouter = require('./upload.routes');
const tagRouter = require('./tags.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes')

module.exports = {
    blogRouter,
    commentRouter,
    likeRouter,
    uploadRouter,
    tagRouter,
    authRouter,
    userRouter
}