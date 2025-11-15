const express = require('express');
const connect = require('./connectdb');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
// const populate = require('./services/populate');
const {commentRouter, blogRouter, likeRouter, uploadRouter,tagRouter,userRouter,authRouter} = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cors())
app.use('/api/comments', commentRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/likes', likeRouter);
app.use('/api/tags',tagRouter);
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
// app.use('/api/uploads', uploadRouter);

app.get('/',(req,res)=>{
    res.send("Welcome to the Blog API");
});

const start = async()=>{
    try {
        await connect(process.env.MONGO_URI);
        // populate();
        app.listen(PORT,(err)=>{
            if(err)console.log('their is an error',err);
            else
            console.log("server is listening on port - ",PORT);
        })
    } catch (error) {
        console.log("Their is an error starting the app");
    }
}

start();