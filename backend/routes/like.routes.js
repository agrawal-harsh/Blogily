const { Router } = require("express");
const { handleGetAllLikes, handleToggleLike } = require('../controllers/like.controller');
const protect = require("../middlewares/auth.middleware");
const router = Router();


router.route('/:id')
    .get(handleGetAllLikes) //get all the likes for a blog
    .patch(protect, handleToggleLike) //if a user want to give a like

module.exports = router;
