const { Router } = require("express");
const {handleGetAllBlogs,handleUpdateBlog,handleDeleteBlog,handleGetBlog, handleCreateBlog} = require('../controllers/blog.controller');
const {upload} = require('../middlewares/multer.middleware')
const router = Router();


router.route('/')
.get(handleGetAllBlogs) //Get all the blogs
.post(
    upload.fields([
        {
            name:"image",
            maxCount:1
        }
    ]),handleCreateBlog) //create a new blog

router.route('/:id')
.get(handleGetBlog) //get a perticular blog of user
.patch(handleUpdateBlog) //if a user want to edit his/her blog
.delete(handleDeleteBlog) //if a user want to delete its blog


module.exports = router;
