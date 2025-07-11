const { Router } = require("express");
const {handleGetAllComments,handleUpdateComment,handleDeleteComment, handleAddComment} = require('../controllers/comment.controller')
const router = Router();


router.route('/:id')
.get(handleGetAllComments) //get all the comments for a blog
.post(handleAddComment) //add a comment for a given user
.patch(handleUpdateComment) //if a user want to edit his/her comment
.delete(handleDeleteComment) //if a user want to delete its comment

module.exports = router;
