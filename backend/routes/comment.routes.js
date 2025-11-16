const { Router } = require("express");
const { handleGetAllComments, handleDeleteComment, handleAddComment } = require('../controllers/comment.controller');
const protect = require("../middlewares/auth.middleware");
const router = Router();


router.route('/:id')
    .get(handleGetAllComments) //get all the comments for a blog
    .post(protect, handleAddComment) //add a comment for a given user
    .delete(protect, handleDeleteComment) //if a user want to delete its comment

module.exports = router;
