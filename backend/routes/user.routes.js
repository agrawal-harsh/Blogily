const {handleGetUserData} = require('../controllers/auth.controller');
const router = require('express').Router();

router.get('/:id',handleGetUserData);

module.exports = router;