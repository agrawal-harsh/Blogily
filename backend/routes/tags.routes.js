const { Router } = require("express");
const { handleFindAllPost, handleGetAllTags } = require("../controllers/tag.controller");
const router = Router();

router.get('/',handleFindAllPost);
router.get('/static',handleGetAllTags)

module.exports = router;